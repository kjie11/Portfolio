import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'qa-tear-vr');
const targetUrl = pathToFileURL(path.join(here, 'tear-vr.html')).href;
await fs.mkdir(out, { recursive: true });

async function capture(page, name, progress) {
  await page.evaluate(p => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * p), progress);
  await page.waitForTimeout(950);
  await page.screenshot({ path: path.join(out, `${name}.png`) });
  return page.evaluate(() => ({
    scrollY,
    tear: getComputedStyle(document.documentElement).getPropertyValue('--tear').trim(),
    reveal: getComputedStyle(document.documentElement).getPropertyValue('--reveal').trim(),
    leftClip: getComputedStyle(document.querySelector('.paper.left')).clipPath,
    titleOpacity: getComputedStyle(document.querySelector('.world-copy')).opacity,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: innerWidth
  }));
}

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const errors = [];
const results = {};

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
desktop.on('console', msg => { if (msg.type() === 'error') errors.push(`console:${msg.text()}`); });
desktop.on('pageerror', error => errors.push(`page:${error}`));
await desktop.goto(targetUrl, { waitUntil: 'networkidle' });
results['desktop-start'] = await capture(desktop, 'desktop-start', 0);
results['desktop-tear'] = await capture(desktop, 'desktop-tear', .34);
results['desktop-inside'] = await capture(desktop, 'desktop-inside', .78);

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
mobile.on('pageerror', error => errors.push(`mobile:${error}`));
await mobile.goto(targetUrl, { waitUntil: 'networkidle' });
results['mobile-tear'] = await capture(mobile, 'mobile-tear', .38);

if (errors.length) throw new Error(errors.join('\n'));
if (results['desktop-start'].tear !== '0.0000') throw new Error('Initial tear state is incorrect');
if (Number(results['desktop-tear'].tear) <= .25) throw new Error('Tear did not advance');
if (Number(results['desktop-inside'].reveal) <= .9) throw new Error('VR world did not fully reveal');
if (!Object.values(results).every(value => value.bodyWidth === value.viewportWidth)) throw new Error('Horizontal overflow detected');

console.log(JSON.stringify(results, null, 2));
await browser.close();
