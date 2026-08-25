import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium, firefox, webkit } = require('playwright');

const targetUrl = pathToFileURL(path.resolve('index.html')).href;
const viewports = [
  { width: 1536, height: 816 },
  { width: 1440, height: 900 },
  { width: 1280, height: 650 },
];

const failures = [];

const browsers = {
  chromium: [chromium, 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'],
  firefox: [firefox, firefox.executablePath()],
  webkit: [webkit, webkit.executablePath()],
};

for (const [browserName, [browserType, executablePath]] of Object.entries(browsers)) {
  if (!fs.existsSync(executablePath)) {
    console.log(browserName, 'skipped: browser executable is not installed');
    continue;
  }
  const browser = await browserType.launch({ headless: true, executablePath });

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    const frame = page.frames().find((candidate) => candidate !== page.mainFrame());
    await frame.waitForSelector('#rq-featured .rq-page-step-nav--bottom');
    const result = await frame.evaluate(() => {
      const section = document.querySelector('#rq-featured');
      const arrow = section.querySelector('.rq-page-step-nav--bottom');
      const stage = section.querySelector('.rq-polaroid-stage');
      const card = section.querySelector('.rq-polaroid');
      const activeLabel = section.querySelector('.rq-polaroid-active');
      section.scrollIntoView({ block: 'start' });
      const sectionRect = section.getBoundingClientRect();
      const arrowRect = arrow.getBoundingClientRect();
      return {
        sectionHeight: Math.round(sectionRect.height),
        stageHeight: Math.round(stage.getBoundingClientRect().height),
        cardHeight: Math.round(card.getBoundingClientRect().height),
        activeLabelBottom: Math.round(activeLabel.getBoundingClientRect().bottom),
        arrowTop: Math.round(arrowRect.top),
        arrowBottom: Math.round(arrowRect.bottom),
        viewportHeight: innerHeight,
      };
    });
    console.log(browserName, `${viewport.width}x${viewport.height}`, result);
    if (result.arrowBottom > result.viewportHeight + 1) {
      failures.push(`${browserName} ${viewport.width}x${viewport.height}: bottom arrow is outside the viewport`);
    }
    await page.close();
  }

  await browser.close();
}

if (failures.length) throw new Error(failures.join('\n'));
