import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(pathToFileURL(path.resolve('index.html')).href);
await page.waitForLoadState('networkidle');

const frame = page.frameLocator('iframe');
const cards = frame.locator('#rq-polaroid-track > .rq-polaroid:not([aria-hidden=true])');
if (await cards.nth(0).getAttribute('data-rq-detail-project') !== 'four-way-kitchen') throw new Error('Four-Way Kitchen is not first');
if (await cards.nth(1).getAttribute('data-rq-detail-project') !== 'emg-ninja') throw new Error('EMG Gesture Ninja is not after Four-Way Kitchen');

const ninja = cards.nth(1);
if (!(await ninja.locator('img').getAttribute('src')).endsWith('/images/emg-ninja-cover.jpg')) throw new Error('Ninja cover is missing');
await ninja.hover();
await ninja.locator('video').waitFor({ state: 'attached' });
if (!(await ninja.locator('video').getAttribute('src')).endsWith('/videos/emg-ninja-preview.mp4')) throw new Error('Ninja preview is missing');

await ninja.click();
const detail = frame.locator('[data-rq-panel=creative-detail]');
await detail.waitFor({ state: 'visible' });
if (await detail.locator('[data-creative-detail-title]').innerText() !== 'EMG Gesture Ninja') throw new Error('Ninja detail title is missing');
if (!(await detail.locator('[data-creative-detail-summary]').innerText()).includes('created at BrainCo')) throw new Error('Ninja detail copy is missing');
if (!(await detail.locator('[data-creative-detail-hero] video source').getAttribute('src')).endsWith('/videos/emg-ninja-preview.mp4')) throw new Error('Ninja detail video is missing');

await browser.close();
