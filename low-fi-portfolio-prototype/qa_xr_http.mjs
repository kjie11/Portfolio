import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const output = path.join(process.cwd(), 'qa-xr-tear', 'desktop-webxr-http.png');
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
page.on('console', message => {
  if (message.type() === 'error' && !message.text().includes('self.jpg') && !message.text().includes('404')) errors.push(message.text());
});
await page.goto('http://127.0.0.1:8766/index.html', { waitUntil: 'networkidle' });
const frame = page.frames().find(candidate => candidate !== page.mainFrame());
if (!frame) throw new Error('Portfolio iframe not found');
await frame.waitForSelector('[data-rq-xr-section]');
await frame.evaluate(() => {
  const section = document.querySelector('[data-rq-xr-section]');
  const travel = Math.max(1, section.offsetHeight - innerHeight);
  scrollTo(0, section.offsetTop + travel * .72);
});
await page.waitForTimeout(2500);
const stageBox = await frame.locator('[data-rq-xr-stage]').boundingBox();
await page.mouse.move(stageBox.x + stageBox.width * .76, stageBox.y + stageBox.height * .38);
await page.waitForTimeout(900);
const state = await frame.evaluate(() => {
  const canvas = document.querySelector('[data-rq-xr-skybox]');
  return {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    cssTransform: getComputedStyle(canvas).transform,
    release: getComputedStyle(document.querySelector('[data-rq-xr-stage]')).getPropertyValue('--rq-xr-release')
  };
});
await page.screenshot({ path: output });
await browser.close();

if (errors.length) throw new Error(errors.join('\n'));
if (state.canvasWidth < 300 || state.canvasHeight < 300) throw new Error(`WebGL skybox did not size correctly: ${JSON.stringify(state)}`);
console.log(JSON.stringify(state, null, 2));
