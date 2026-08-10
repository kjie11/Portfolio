import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'qa-xr-tear');
const targetUrl = pathToFileURL(path.join(here, 'index.html')).href;
await fs.mkdir(out, { recursive: true });

async function setupPage(browser, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  const frame = page.frames().find(candidate => candidate !== page.mainFrame());
  if (!frame) throw new Error('Portfolio iframe not found');
  await frame.waitForSelector('[data-rq-xr-section]');
  return { page, frame, errors };
}

async function capture(state, name, progress) {
  const { page, frame } = state;
  await frame.evaluate(p => {
    const section = document.querySelector('[data-rq-xr-section]');
    const travel = Math.max(1, section.offsetHeight - innerHeight);
    scrollTo(0, section.offsetTop + travel * p);
  }, progress);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: path.join(out, `${name}.png`) });
  return frame.evaluate(() => {
    const stage = document.querySelector('[data-rq-xr-stage]');
    const paper = document.querySelector('[data-rq-xr-paper-left]');
    const cards = [...document.querySelectorAll('[data-rq-xr-cards] .rq-vr-item')];
    return {
      release: Number(getComputedStyle(stage).getPropertyValue('--rq-xr-release')),
      leftClip: getComputedStyle(stage).getPropertyValue('--rq-xr-clip-left'),
      paperOpacity: Number(getComputedStyle(paper).opacity),
      cardOpacity: cards.map(card => Number(getComputedStyle(card).opacity)),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1
    };
  });
}

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});

const desktop = await setupPage(browser, { width: 1440, height: 900 });
const results = {
  desktopTearing: await capture(desktop, 'desktop-tearing', .38),
  desktopTorn: await capture(desktop, 'desktop-torn', .70),
  desktopCards: await capture(desktop, 'desktop-cards', .97)
};
await desktop.page.mouse.move(120, 180);
await desktop.page.waitForTimeout(850);
const pointerLeft = await desktop.page.screenshot({ path: path.join(out, 'desktop-pointer-left.png') });
await desktop.page.mouse.move(1160, 680);
await desktop.page.waitForTimeout(850);
const pointerRight = await desktop.page.screenshot({ path: path.join(out, 'desktop-pointer-right.png') });
results.pointerBackgroundChanged = !pointerLeft.equals(pointerRight);

const mobile = await setupPage(browser, { width: 390, height: 844 });
results.mobileTearing = await capture(mobile, 'mobile-tearing', .38);
results.mobileCards = await capture(mobile, 'mobile-cards', .97);

const errors = [...desktop.errors, ...mobile.errors];
if (errors.length) throw new Error(errors.join('\n'));
if (results.desktopTearing.cardOpacity.some(value => value > .01)) throw new Error('Cards appear before the tear completes');
if (results.desktopTorn.paperOpacity > .02) throw new Error('Paper remains after tear completion');
if (Math.max(...results.desktopCards.cardOpacity) < .9) throw new Error('Cards did not appear after tearing');
if (results.mobileTearing.cardOpacity.some(value => value > .01)) throw new Error('Mobile cards appear before the tear completes');
if (Math.max(...results.mobileCards.cardOpacity) < .9) throw new Error('Mobile cards did not appear');
if (Object.values(results).some(value => value.horizontalOverflow)) throw new Error('Horizontal overflow detected');
if (!results.pointerBackgroundChanged) throw new Error('XR background did not react to pointer movement');

console.log(JSON.stringify(results, null, 2));
await browser.close();
