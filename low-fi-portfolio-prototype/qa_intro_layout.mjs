import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const targetUrl = pathToFileURL(path.join(here, 'index.html')).href;
const out = path.join(here, 'qa-intro-layout');
await fs.mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const results = {};

for (const [name, viewport] of Object.entries({ desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } })) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  const frame = page.frames().find(candidate => candidate !== page.mainFrame());
  await frame.waitForSelector('.rq-hero-photo img');
  results[name] = await frame.evaluate(() => {
    const hero = document.querySelector('.rq-hero');
    const nameLine = document.querySelector('.rq-intro-name');
    const role = document.querySelector('.rq-role-window');
    const image = document.querySelector('.rq-hero-photo img');
    const heroStyle = getComputedStyle(hero);
    const nameRect = nameLine.getBoundingClientRect();
    const roleRect = role.getBoundingClientRect();
    return {
      columns: heroStyle.gridTemplateColumns,
      photoLoaded: image.complete && image.naturalWidth > 0,
      photoWidth: image.naturalWidth,
      roleOnSecondRow: roleRect.top > nameRect.bottom,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1
    };
  });
  results[name].errors = errors;
  await page.screenshot({ path: path.join(out, `${name}.png`) });
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
if (!results.desktop.photoLoaded || !results.mobile.photoLoaded) throw new Error('Portrait failed to load');
if (!results.desktop.roleOnSecondRow || !results.mobile.roleOnSecondRow) throw new Error('Role is not on the second row');
if (results.desktop.horizontalOverflow || results.mobile.horizontalOverflow) throw new Error('Horizontal overflow detected');
if (results.desktop.errors.length || results.mobile.errors.length) throw new Error([...results.desktop.errors, ...results.mobile.errors].join('\n'));
await browser.close();
