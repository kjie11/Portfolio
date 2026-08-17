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
const source = await fs.readFile(path.join(here, 'index.html'), 'utf8');
const requiredScreenPaintSource = [
  'getXrTrailRadiusCss = () =&gt; Math.max(24, window.innerWidth / 32)',
  '* .1633', '* .1531', '* .12245', '* .0918', '* .051',
  '2 / xrSmoke.smokeWidth', '2 / xrSmoke.smokeHeight',
  'assets/xr-lusion-blue-noise.png', 'uBlueNoiseCoordOffset',
  'assets/xr-lusion-smaa-area.png', 'assets/xr-lusion-smaa-search.png',
  'Math.min((time - xrSmoke.feedbackLastTime) / 1000, .05)',
  '(x1 - x0) * deltaTime * .8',
  'gl.getUniformLocation(xrSmoke.updateProgram, &#x27;uMinDecay&#x27;), .004'
];
if (requiredScreenPaintSource.some(token => !source.includes(token))) throw new Error('XR ScreenPaint source fidelity constants or assets are missing');
if (source.includes('segment?.travel') || source.includes('xrSmoke.travel')) throw new Error('XR ScreenPaint radius still depends on cumulative pointer travel');
const smaaPassOrder = [
  'bindXrSmokeProgram(xrSmoke.displayProgram, xrSmoke.distortionTarget',
  'bindXrSmokeProgram(xrSmoke.smaaEdgesProgram, xrSmoke.smaaEdgesTarget',
  'bindXrSmokeProgram(xrSmoke.smaaWeightsProgram, xrSmoke.smaaWeightsTarget',
  'bindXrSmokeProgram(xrSmoke.smaaBlendProgram, null'
].map(token => source.indexOf(token));
if (smaaPassOrder.some(index => index < 0) || smaaPassOrder.some((index, position) => position > 0 && index <= smaaPassOrder[position - 1])) throw new Error('XR distortion and SMAA pass order does not match Lusion');

async function setupPage(browser, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1, hasTouch: viewport.width <= 480 });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', msg => {
    const text = msg.text();
    const knownFontCspWarning = text.includes('violates the following Content Security Policy directive') && text.includes("font-src");
    if (msg.type() === 'error' && !knownFontCspWarning) errors.push(text);
  });
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  const frame = page.frames().find(candidate => candidate !== page.mainFrame());
  if (!frame) throw new Error('Portfolio iframe not found');
  await frame.waitForSelector('[data-rq-xr-section]');
  return { page, frame, errors };
}

async function capture(state, name) {
  const { page, frame } = state;
  await page.screenshot({ path: path.join(out, `${name}.png`) });
  return frame.evaluate(() => {
    const stage = document.querySelector('[data-rq-xr-stage]');
    const sticky = document.querySelector('.rq-xr-sticky');
    const paper = document.querySelector('[data-rq-xr-paper-left]');
    const root = document.querySelector('#ruyan-portfolio-wireframe');
    const smoke = document.querySelector('[data-rq-xr-smoke]');
    const cards = [...document.querySelectorAll('[data-rq-xr-cards] .rq-vr-item')];
    const smokeGl = smoke?.getContext('webgl');
    const smokePixels = smokeGl ? new Uint8Array(smoke.width * smoke.height * 4) : [];
    if (smokeGl) smokeGl.readPixels(0, 0, smoke.width, smoke.height, smokeGl.RGBA, smokeGl.UNSIGNED_BYTE, smokePixels);
    let smokeAlphaCount = 0;
    for (let index = 3; index < smokePixels.length; index += 4) {
      if (smokePixels[index] > 2) smokeAlphaCount += 1;
    }
    return {
      release: Number(getComputedStyle(stage).getPropertyValue('--rq-xr-release')),
      sceneReveal: Number(getComputedStyle(stage).getPropertyValue('--rq-xr-scene-reveal')),
      peel: Number(getComputedStyle(stage).getPropertyValue('--rq-xr-peel')),
      paperFade: Number(getComputedStyle(stage).getPropertyValue('--rq-xr-paper-fade')),
      openingRatio: Number(stage.dataset.rqXrOpening || 0),
      gapError: Number(stage.dataset.rqXrGapError || 0),
      verticalProgress: Number(stage.dataset.rqXrVerticalProgress || 0),
      horizontalProgress: Number(stage.dataset.rqXrHorizontalProgress || 0),
      axisSpeedRatio: Number(stage.dataset.rqXrAxisSpeedRatio || 0),
      autoTearState: stage.dataset.rqXrAutoTear || '',
      autoTearDelay: Number(stage.dataset.rqXrAutoTearDelay || 0),
      leftClip: getComputedStyle(stage).getPropertyValue('--rq-xr-clip-left'),
      paperOpacity: Number(getComputedStyle(paper).opacity),
      paperBackground: getComputedStyle(paper).backgroundColor,
      pageBackground: getComputedStyle(root).backgroundColor,
      stickyRect: (() => {
        const rect = sticky.getBoundingClientRect();
        return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      })(),
      viewport: { width: innerWidth, height: innerHeight },
      cardOpacity: cards.map(card => Number(getComputedStyle(card).opacity)),
      smokeAlphaCount,
      smokeEnergy: Number(smoke?.dataset.energy || 0),
      smokeOpen: smoke?.dataset.open === 'true',
      smokeRenderer: smoke?.dataset.renderer || '',
      smokeSceneCards: Number(smoke?.dataset.sceneCards || 0),
      smokePointerEvents: smoke ? getComputedStyle(smoke).pointerEvents : '',
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1
    };
  });
}

async function runAutoSequence(state, prefix) {
  const { page, frame } = state;
  await frame.evaluate(() => {
    const section = document.querySelector('[data-rq-xr-section]');
    scrollTo(0, section.offsetTop);
  });
  await page.waitForTimeout(420);
  const title = await capture(state, `${prefix}-title`);
  await page.waitForTimeout(700);
  const waiting = await capture(state, `${prefix}-title-waiting`);
  await frame.evaluate(() => {
    const section = document.querySelector('[data-rq-xr-section]');
    const sticky = section.querySelector('.rq-xr-sticky');
    const travel = Math.max(1, section.offsetHeight - sticky.offsetHeight);
    scrollTo(0, section.offsetTop + Math.min(80, travel * .15));
  });
  const iframeBox = await page.locator('iframe').boundingBox();
  if (!iframeBox) throw new Error('Portfolio iframe geometry unavailable');
  await page.mouse.move(iframeBox.x + iframeBox.width / 2, iframeBox.y + iframeBox.height / 2);
  const scrollLockStart = await frame.evaluate(() => scrollY);
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(420);
  const scrollLockEnd = await frame.evaluate(() => scrollY);
  const tearing = await capture(state, `${prefix}-tearing`);
  await frame.waitForFunction(() => {
    const stage = document.querySelector('[data-rq-xr-stage]');
    return Number(getComputedStyle(stage).getPropertyValue('--rq-xr-peel')) >= .6;
  });
  const settled = await capture(state, `${prefix}-settled`);
  await frame.waitForFunction(() => {
    const stage = document.querySelector('[data-rq-xr-stage]');
    return Number(getComputedStyle(stage).getPropertyValue('--rq-xr-peel')) >= .999;
  });
  const torn = await capture(state, `${prefix}-torn`);
  const scrollReleaseStart = await frame.evaluate(() => scrollY);
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(80);
  const scrollReleaseEnd = await frame.evaluate(() => scrollY);
  await page.waitForTimeout(1450);
  const cards = await capture(state, `${prefix}-cards`);
  return {
    title,
    waiting,
    tearing,
    settled,
    torn,
    cards,
    scrollLock: { start: scrollLockStart, end: scrollLockEnd },
    scrollRelease: { start: scrollReleaseStart, end: scrollReleaseEnd }
  };
}

async function readPinState(state, runwayProgress) {
  const { page, frame } = state;
  await frame.evaluate(progress => {
    const section = document.querySelector('[data-rq-xr-section]');
    const sticky = section.querySelector('.rq-xr-sticky');
    const travel = Math.max(0, section.offsetHeight - sticky.offsetHeight);
    scrollTo(0, section.offsetTop + travel * progress);
  }, runwayProgress);
  await page.waitForTimeout(180);
  return frame.evaluate(() => {
    const section = document.querySelector('[data-rq-xr-section]');
    const sticky = section.querySelector('.rq-xr-sticky');
    const stage = document.querySelector('[data-rq-xr-stage]');
    const cards = [...document.querySelectorAll('[data-rq-xr-cards] .rq-vr-item')];
    const stickyRect = sticky.getBoundingClientRect();
    return {
      top: stickyRect.top,
      left: stickyRect.left,
      width: stickyRect.width,
      height: stickyRect.height,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
      runwayRatio: section.offsetHeight / innerHeight,
      release: Number(getComputedStyle(stage).getPropertyValue('--rq-xr-release')),
      cardOpacity: cards.map(card => Number(getComputedStyle(card).opacity))
    };
  });
}

async function leaveSection(state, direction, name) {
  const { page, frame } = state;
  await frame.evaluate(exitDirection => {
    const section = document.querySelector('[data-rq-xr-section]');
    const target = exitDirection === 'down'
      ? section.offsetTop + section.offsetHeight
      : Math.max(0, section.offsetTop - innerHeight);
    scrollTo(0, target);
  }, direction);
  await page.waitForTimeout(2450);
  return capture(state, name);
}

async function movePointerInStage(state, xRatio, yRatio, steps = 1) {
  const { page, frame } = state;
  const iframeBox = await page.locator('iframe').boundingBox();
  const stageBox = await frame.evaluate(() => {
    const rect = document.querySelector('[data-rq-xr-stage]').getBoundingClientRect();
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  });
  if (!iframeBox || !stageBox) throw new Error('XR stage geometry unavailable');
  await page.mouse.move(
    iframeBox.x + stageBox.left + stageBox.width * xRatio,
    iframeBox.y + stageBox.top + stageBox.height * yRatio,
    { steps }
  );
}

const readSmokeState = state => state.frame.evaluate(() => {
  const smoke = document.querySelector('[data-rq-xr-smoke]');
  const cards = [...document.querySelectorAll('[data-rq-xr-cards] .rq-vr-item')];
  const gl = smoke.getContext('webgl');
  const pixels = gl ? new Uint8Array(smoke.width * smoke.height * 4) : [];
  if (gl) gl.readPixels(0, 0, smoke.width, smoke.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  let alphaCount = 0;
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] > 2) alphaCount += 1;
  }
  return {
    alphaCount,
    energy: Number(smoke.dataset.energy || 0),
    running: smoke.dataset.running === 'true',
    open: smoke.dataset.open === 'true',
    renderer: smoke.dataset.renderer || '',
    sceneCards: Number(smoke.dataset.sceneCards || 0),
    safeCardImages: Number(smoke.dataset.safeCardImages || 0),
    sceneMode: smoke.dataset.sceneMode || '',
    sceneBackground: smoke.dataset.sceneBackground || '',
    sphereReady: document.querySelector('[data-rq-xr-stage]')?.classList.contains('rq-xr-webgl-ready') || false,
    fieldWidth: Number(smoke.dataset.fieldWidth || 0),
    fieldHeight: Number(smoke.dataset.fieldHeight || 0),
    smokeWidth: Number(smoke.dataset.smokeWidth || 0),
    smokeHeight: Number(smoke.dataset.smokeHeight || 0),
    mistWidth: Number(smoke.dataset.mistWidth || 0),
    mistHeight: Number(smoke.dataset.mistHeight || 0),
    smokeLayers: Number(smoke.dataset.smokeLayers || 0),
    material: smoke.dataset.material || '',
    colorTransport: smoke.dataset.colorTransport || '',
    sceneSync: smoke.dataset.sceneSync || '',
    trailRadius: Number(smoke.dataset.trailRadius || 0),
    pathSampler: smoke.dataset.pathSampler || '',
    sampleSpacing: Number(smoke.dataset.sampleSpacing || 0),
    solver: smoke.dataset.solver || '',
    pressureIterations: Number(smoke.dataset.pressureIterations || 0),
    postprocess: smoke.dataset.postprocess || '',
    trailProfile: smoke.dataset.trailProfile || '',
    blueNoise: smoke.dataset.blueNoise || '',
    smaa: smoke.dataset.smaa || '',
    viewportWidth: innerWidth,
    opacity: Number(getComputedStyle(smoke).opacity),
    pointerEvents: getComputedStyle(smoke).pointerEvents,
    cardInfluence: cards.map(card => Number(card.style.getPropertyValue('--rq-xr-smoke-influence') || 0))
  };
});

const readCardTransforms = state => state.frame.evaluate(() =>
  [...document.querySelectorAll('[data-rq-xr-cards] .rq-vr-item')].map(card => card.style.transform)
);

const readGazeAngles = transforms => transforms.map(transform => {
  const match = transform.match(/rotateX\(([-\d.]+)deg\) rotateY\(([-\d.]+)deg\)/);
  return match ? { x: Number(match[1]), y: Number(match[2]) } : null;
});

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});

const desktop = await setupPage(browser, { width: 1440, height: 900 });
await desktop.frame.waitForFunction(() =>
  [...document.querySelectorAll('[data-rq-xr-cards] .rq-media img')].length === 5 &&
  [...document.querySelectorAll('[data-rq-xr-cards] .rq-media img')].every(image => image.complete && image.naturalWidth > 0)
);
const xrCardMedia = await desktop.frame.evaluate(() =>
  [...document.querySelectorAll('[data-rq-xr-cards] .rq-vr-item')].map(card => ({
    project: card.dataset.rqDetailProject,
    src: card.querySelector('.rq-media img')?.getAttribute('src') || '',
    alt: card.querySelector('.rq-media img')?.alt || ''
  }))
);
const desktopBefore = await capture(desktop, 'desktop-before');
const desktopSequence = await runAutoSequence(desktop, 'desktop');
const results = { xrCardMedia, desktopBefore, ...Object.fromEntries(Object.entries(desktopSequence).map(([key, value]) => [`desktop${key[0].toUpperCase()}${key.slice(1)}`, value])) };
results.desktopPinStart = await readPinState(desktop, 0);
results.desktopPinMiddle = await readPinState(desktop, .55);
await desktop.frame.evaluate(() => document.querySelector('[data-rq-xr-section]').scrollIntoView({ block: 'start' }));
await desktop.page.waitForTimeout(180);
results.cardGazeNeutral = await readCardTransforms(desktop);
await movePointerInStage(desktop, .14, .24);
await desktop.page.waitForTimeout(850);
results.cardGazeLeft = await readCardTransforms(desktop);
const pointerLeft = await desktop.page.screenshot({ path: path.join(out, 'desktop-pointer-left.png') });
await movePointerInStage(desktop, .86, .76);
await desktop.page.waitForTimeout(90);
results.smokeActive = await readSmokeState(desktop);
await desktop.page.waitForTimeout(760);
results.cardGazeRight = await readCardTransforms(desktop);
const pointerRight = await desktop.page.screenshot({ path: path.join(out, 'desktop-pointer-right.png') });
results.pointerBackgroundChanged = !pointerLeft.equals(pointerRight);
await desktop.page.mouse.move(2, 2);
await desktop.frame.dispatchEvent('[data-rq-xr-stage]', 'pointerleave');
await desktop.page.waitForTimeout(2200);
results.smokeDissipated = await readSmokeState(desktop);
results.cardGazeReturned = await readCardTransforms(desktop);
await desktop.frame.focus('[data-rq-detail-project="abyss"]');
await desktop.frame.press('[data-rq-detail-project="abyss"]', 'Enter');
await desktop.page.waitForTimeout(100);
results.cardDetailOpened = await desktop.frame.evaluate(() => ({
  visible: !document.querySelector('[data-rq-panel="detail"]').hidden,
  title: document.querySelector('[data-rq-detail-title]').textContent,
  imageSrc: document.querySelector('[data-rq-detail-visual] img')?.getAttribute('src') || '',
  videoSrc: document.querySelector('[data-rq-detail-video-frame] iframe')?.src || ''
}));
await desktop.frame.click('[data-rq-detail-back]');
await desktop.page.waitForTimeout(180);
results.desktopClosedDown = await leaveSection(desktop, 'down', 'desktop-closed-down');
await runAutoSequence(desktop, 'desktop-reentered');
results.desktopClosedUp = await leaveSection(desktop, 'up', 'desktop-closed-up');
results.polaroidHomeScroll = await desktop.frame.evaluate(() => {
  const section = document.querySelector('#rq-featured');
  scrollTo(0, section.offsetTop);
  return scrollY;
});
results.polaroidWheelBefore = await desktop.frame.evaluate(() =>
  document.querySelector('[data-rq-polaroid-track]').scrollLeft
);
await desktop.frame.evaluate(() => {
  document.querySelector('[data-rq-polaroid-stage]').dispatchEvent(new WheelEvent('wheel', {
    deltaX: 320,
    deltaY: 0,
    bubbles: true,
    cancelable: true
  }));
});
await desktop.page.waitForTimeout(45);
results.polaroidWheelMiddle = await desktop.frame.evaluate(() =>
  document.querySelector('[data-rq-polaroid-track]').scrollLeft
);
await desktop.page.waitForTimeout(800);
results.polaroidWheelSettled = await desktop.frame.evaluate(() => {
  const track = document.querySelector('[data-rq-polaroid-track]');
  const centered = track.querySelector('.rq-polaroid.is-centered');
  const trackRect = track.getBoundingClientRect();
  const cardRect = centered?.getBoundingClientRect();
  return {
    left: track.scrollLeft,
    moving: track.dataset.wheelMoving || '',
    centerError: cardRect ? Math.abs(cardRect.left + cardRect.width / 2 - trackRect.left - trackRect.width / 2) : Infinity
  };
});
await desktop.frame.focus('.rq-polaroid[data-rq-detail-project="cat-teaser"]:not([aria-hidden="true"])');
await desktop.frame.press('.rq-polaroid[data-rq-detail-project="cat-teaser"]:not([aria-hidden="true"])', 'Enter');
await desktop.page.waitForTimeout(100);
results.polaroidDetailOpened = await desktop.frame.evaluate(() => ({
  visible: !document.querySelector('[data-rq-panel="detail"]').hidden,
  title: document.querySelector('[data-rq-detail-title]').textContent
}));
await desktop.frame.evaluate(() => parent.history.back());
await desktop.page.waitForTimeout(180);
results.polaroidBrowserBack = await desktop.frame.evaluate(() => ({
  homeVisible: !document.querySelector('[data-rq-panel="home"]').hidden,
  scrollY,
  focusedProject: document.activeElement?.dataset.rqDetailProject || ''
}));

const mobile = await setupPage(browser, { width: 390, height: 844 });
const mobileSequence = await runAutoSequence(mobile, 'mobile');
Object.assign(results, Object.fromEntries(Object.entries(mobileSequence).map(([key, value]) => [`mobile${key[0].toUpperCase()}${key.slice(1)}`, value])));
results.mobilePinStart = await readPinState(mobile, 0);
results.mobilePinMiddle = await readPinState(mobile, .55);
await mobile.frame.evaluate(() => document.querySelector('[data-rq-xr-section]').scrollIntoView({ block: 'start' }));
await mobile.page.waitForTimeout(180);
results.mobileGazeBefore = await readCardTransforms(mobile);
await movePointerInStage(mobile, .84, .72);
await mobile.page.waitForTimeout(500);
results.mobileGazeAfter = await readCardTransforms(mobile);
results.mobileClosedDown = await leaveSection(mobile, 'down', 'mobile-closed-down');

const errors = [...desktop.errors, ...mobile.errors];
if (errors.length) throw new Error(errors.join('\n'));
if (results.desktopBefore.release > .01) throw new Error('XR sequence started before the section entered the viewport');
if (results.desktopBefore.paperBackground !== results.desktopBefore.pageBackground || results.mobileTitle.paperBackground !== results.mobileTitle.pageBackground) throw new Error('Closed XR paper does not match the page background');
if (results.desktopBefore.smokeAlphaCount || results.desktopTitle.smokeAlphaCount || results.desktopTearing.smokeAlphaCount) throw new Error('XR smoke appeared before the paper released');
if (results.desktopTitle.release > .01 || results.desktopTitle.cardOpacity.some(value => value > .01)) throw new Error('XR paper or cards moved before the title animation completed');
if (results.desktopWaiting.release > .01 || results.desktopWaiting.cardOpacity.some(value => value > .01)) throw new Error('Desktop XR tear started before the title hold finished');
if (results.desktopWaiting.autoTearState !== 'triggered' || results.desktopWaiting.autoTearDelay !== 0) throw new Error('Desktop XR tear did not start immediately after the title');
if (results.desktopTearing.cardOpacity.some(value => value > .01)) throw new Error('Cards appear before the tear completes');
if (Math.abs(results.desktopScrollLock.end - results.desktopScrollLock.start) > 1) throw new Error('Desktop page scrolled downward before the XR paper fully opened');
if (results.desktopScrollRelease.end <= results.desktopScrollRelease.start + 1) throw new Error('Desktop downward scroll remained locked after the XR paper opened');
if (results.desktopSettled.openingRatio < .72 || results.desktopSettled.gapError > 1) throw new Error('Desktop tear did not fully open and settle before peeling');
if (results.desktopSettled.verticalProgress < .999 || results.desktopSettled.horizontalProgress < .999 || results.desktopSettled.axisSpeedRatio <= 0) throw new Error('Desktop tear axes did not complete together using the stage aspect ratio');
if ((results.desktopSettled.paperFade > .01 || results.desktopSettled.paperOpacity < .99) && results.desktopSettled.horizontalProgress < .999) throw new Error('Desktop paper faded before the horizontal tear fully opened');
if (results.desktopTorn.paperOpacity > .02) throw new Error('Paper remains after tear completion');
if (Math.max(...results.desktopCards.cardOpacity) < .9) throw new Error('Cards did not appear after tearing');
if (results.mobileTearing.cardOpacity.some(value => value > .01)) throw new Error('Mobile cards appear before the tear completes');
if (Math.abs(results.mobileScrollLock.end - results.mobileScrollLock.start) > 12) throw new Error('Mobile page scrolled downward before the XR paper fully opened');
if (results.mobileScrollRelease.end <= results.mobileScrollRelease.start + 1) throw new Error('Mobile downward scroll remained locked after the XR paper opened');
if (results.mobileSettled.openingRatio < .72 || results.mobileSettled.gapError > 1) throw new Error('Mobile tear did not fully open and settle before peeling');
if (results.mobileSettled.verticalProgress < .999 || results.mobileSettled.horizontalProgress < .999 || results.mobileSettled.axisSpeedRatio <= 0) throw new Error('Mobile tear axes did not complete together using the stage aspect ratio');
if ((results.mobileSettled.paperFade > .01 || results.mobileSettled.paperOpacity < .99) && results.mobileSettled.horizontalProgress < .999) throw new Error('Mobile paper faded before the horizontal tear fully opened');
if (results.mobileTitle.release > .01 || results.mobileTitle.cardOpacity.some(value => value > .01)) throw new Error('Mobile XR paper or cards moved before the title animation completed');
if (results.mobileWaiting.release > .01 || results.mobileWaiting.cardOpacity.some(value => value > .01)) throw new Error('Mobile XR tear started before the title hold finished');
if (results.mobileWaiting.autoTearState !== 'triggered' || results.mobileWaiting.autoTearDelay !== 0) throw new Error('Mobile XR tear did not start immediately after the title');
if (Math.max(...results.mobileCards.cardOpacity) < .9) throw new Error('Mobile cards did not appear');
if (Math.abs(results.desktopPinStart.top) > 2 || Math.abs(results.desktopPinMiddle.top) > 2 || Math.abs(results.desktopPinStart.left) > 2 || Math.abs(results.desktopPinMiddle.left) > 2) throw new Error('Desktop XR stage did not remain pinned to the viewport');
if (Math.abs(results.desktopPinMiddle.width - results.desktopPinMiddle.viewportWidth) > 2) throw new Error('Desktop XR stage is not full viewport width');
if (Math.abs(results.desktopPinMiddle.height - results.desktopPinMiddle.viewportHeight) > 2) throw new Error('Desktop XR stage is not one viewport tall');
if (Math.abs(results.desktopPinMiddle.runwayRatio - 2.2) > .03) throw new Error('Desktop XR runway is not 2.2 viewports tall');
if (Math.min(...results.desktopPinMiddle.cardOpacity) < .9 || results.desktopPinMiddle.release < .99) throw new Error('Desktop XR did not remain open through the pinned interval');
if (Math.abs(results.mobilePinStart.top) > 2 || Math.abs(results.mobilePinMiddle.top) > 2 || Math.abs(results.mobilePinStart.left) > 2 || Math.abs(results.mobilePinMiddle.left) > 2) throw new Error('Mobile XR stage did not remain pinned to the viewport');
if (Math.abs(results.mobilePinMiddle.width - results.mobilePinMiddle.viewportWidth) > 2) throw new Error('Mobile XR stage is not full viewport width');
if (Math.abs(results.mobilePinMiddle.height - results.mobilePinMiddle.viewportHeight) > 2) throw new Error('Mobile XR stage is not one viewport tall');
if (Math.abs(results.mobilePinMiddle.runwayRatio - 1.65) > .03) throw new Error('Mobile XR runway is not 1.65 viewports tall');
if (Math.min(...results.mobilePinMiddle.cardOpacity) < .9 || results.mobilePinMiddle.release < .99) throw new Error('Mobile XR did not remain open through the pinned interval');
if (results.desktopClosedDown.release > .01 || results.desktopClosedDown.cardOpacity.some(value => value > .01)) throw new Error('Desktop XR did not reverse after leaving downward');
if (results.desktopClosedUp.release > .01 || results.desktopClosedUp.cardOpacity.some(value => value > .01)) throw new Error('Desktop XR did not reverse after leaving upward');
if (results.mobileClosedDown.release > .01 || results.mobileClosedDown.cardOpacity.some(value => value > .01)) throw new Error('Mobile XR did not reverse after leaving');
if (Object.values(results).some(value => value.horizontalOverflow)) throw new Error('Horizontal overflow detected');
if (!results.pointerBackgroundChanged) throw new Error('XR background did not react to pointer movement');
if (!results.smokeActive.open || results.smokeActive.alphaCount < 20 || results.smokeActive.energy <= .05 || results.smokeActive.opacity <= .02) throw new Error('XR smoke trail did not render after release');
if (results.smokeActive.renderer !== 'webgl-screen-paint' || results.smokeActive.fieldWidth < 48 || results.smokeActive.fieldHeight < 48) throw new Error('XR trail did not use the bounded WebGL screen-paint field');
if (results.smokeActive.solver !== 'rgba-feedback') throw new Error('XR trail did not use the RGBA velocity and dual-weight feedback solver');
if (results.smokeActive.smokeLayers !== 2 || results.smokeActive.smokeWidth < 32 || results.smokeActive.smokeHeight < 32) throw new Error('XR trail did not create its primary and low-frequency feedback fields');
if (results.smokeActive.material !== 'lusion-screen-paint-distortion') throw new Error('XR trail did not use the Lusion-style screen-paint composite');
if (results.smokeActive.colorTransport !== 'late-full-scene-distortion') throw new Error('XR trail did not distort the complete scene framebuffer');
if (results.smokeActive.pathSampler !== 'continuous-segment-sdf' || results.smokeActive.sampleSpacing !== 0) throw new Error('XR trail did not use continuous segment-distance drawing');
if (results.smokeActive.sceneCards !== 5) throw new Error('XR fluid scene texture did not include all five cards');
if (results.smokeActive.safeCardImages !== 5 || results.smokeActive.sceneMode !== 'full-framebuffer') throw new Error('XR refraction did not use five safe card images in the full scene framebuffer');
if (results.smokeActive.sceneBackground !== 'interactive-sphere-canvas') throw new Error('XR fluid scene did not preserve the interactive sphere background');
if (!results.smokeActive.sphereReady) throw new Error('XR interactive sphere shader was not available to the fluid scene');
if (results.smokeActive.sceneSync !== 'same-frame-sphere') throw new Error('XR fluid scene did not synchronously refresh the interactive sphere');
const expectedTrailRadius = Math.max(24, results.smokeActive.viewportWidth / 32);
if (Math.abs(results.smokeActive.trailRadius - expectedTrailRadius) > 1) throw new Error('XR screen-paint radius did not reach the extracted responsive maximum');
if (results.smokeActive.trailProfile !== 'choo-choo-fine-625') throw new Error('XR screen-paint did not use the Choo Choo fine trail profile');
if (results.smokeActive.blueNoise !== 'lusion-128-nearest-repeat') throw new Error('XR distortion did not load the extracted animated blue-noise texture');
if (results.smokeActive.smaa !== 'lusion-smaa-1x' || results.smokeActive.postprocess !== 'distortion-smaa-edges-weights-neighborhood') throw new Error('XR distortion did not complete the extracted SMAA pipeline');
if (results.smokeActive.pointerEvents !== 'none') throw new Error('XR smoke canvas blocks pointer interaction');
if (Math.max(...results.smokeActive.cardInfluence) <= Math.min(...results.smokeActive.cardInfluence) + .01) throw new Error('XR smoke did not affect nearby cards more than distant cards');
if (results.smokeDissipated.alphaCount || results.smokeDissipated.energy > .006 || results.smokeDissipated.running) throw new Error('XR smoke did not dissipate and stop its animation frame');
if (results.cardGazeLeft.every((value, index) => value === results.cardGazeRight[index])) throw new Error('XR cards did not follow the pointer');
if (readGazeAngles(results.cardGazeReturned).some(angle => !angle || Math.abs(angle.x) > .02 || Math.abs(angle.y) > .02)) throw new Error('XR cards did not return to their neutral gaze');
if (readGazeAngles([...results.cardGazeLeft, ...results.cardGazeRight]).some(angle => !angle || Math.abs(angle.x) > 5.55 || Math.abs(angle.y) > 7.05)) throw new Error('XR card gaze exceeded its angle limits');
if (results.mobileGazeAfter.some((value, index) => value !== results.mobileGazeBefore[index])) throw new Error('Touch layout unexpectedly enabled card gaze');
if (results.mobileCards.smokeAlphaCount || results.mobileCards.smokeEnergy || results.mobileCards.smokeOpen) throw new Error('Touch layout unexpectedly enabled XR smoke');
if (results.xrCardMedia.length !== 5 || results.xrCardMedia.some(media => !media.src.startsWith('assets/xr-') || !media.alt)) throw new Error('XR cards did not load all five real project previews');
if (!results.cardDetailOpened.visible || !results.cardDetailOpened.title.includes('Abyss')) throw new Error('XR card keyboard navigation did not open its project detail');
if (!results.cardDetailOpened.imageSrc.endsWith('assets/xr-abyss.jpg') || !results.cardDetailOpened.videoSrc.includes('/embed/Jfq4dHgv87M')) throw new Error('XR detail did not expose the project preview and full video');
if (!results.polaroidDetailOpened.visible || results.polaroidDetailOpened.title !== 'Cat Teaser 2D') throw new Error('Polaroid keyboard navigation did not open its project detail');
if (results.polaroidWheelMiddle <= results.polaroidWheelBefore + 1 || results.polaroidWheelMiddle >= results.polaroidWheelSettled.left - 1) throw new Error('Polaroid wheel motion did not animate through an intermediate position');
if (results.polaroidWheelSettled.moving || results.polaroidWheelSettled.centerError > 2) throw new Error('Polaroid wheel motion did not settle on the centered card');
if (!results.polaroidBrowserBack.homeVisible || Math.abs(results.polaroidBrowserBack.scrollY - results.polaroidHomeScroll) > 2) throw new Error('Browser back did not restore the previous home scroll position');
if (results.polaroidBrowserBack.focusedProject !== 'cat-teaser') throw new Error('Browser back did not restore focus to the originating polaroid');

console.log(JSON.stringify(results, null, 2));
await browser.close();
