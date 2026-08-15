import fs from "node:fs";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../css/style.css", import.meta.url), "utf8");
const section = html.match(/<section class="side-work brainco-work"[\s\S]*?<\/section>/)?.[0] || "";
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] || "";

new Function(script);

const checks = [
  ["titleless collection rail", !section.includes("<h3>")],
  ["side-aligned rail controls", section.includes("brainco-rail-control--previous") && section.includes("brainco-rail-control--next") && css.includes("top: calc(50% + 8px)")],
  ["proportional gallery controls", css.includes("width: 56px") && css.includes("width: 48px") && css.includes("touch-action: manipulation")],
  ["no native arrow tooltips", !section.includes('title="Previous project"') && !section.includes('title="Next projects"')],
  ["no featured label", !section.includes("Featured Prototype")],
  ["featured autoplay only", (section.match(/\bautoplay\b/g) || []).length === 1],
  ["lazy preview source", section.includes('data-src="videos/emg-ninja-preview.mp4"')],
  ["preview button", section.includes("brainco-preview-toggle")],
  ["seven-item collection", (section.match(/brainco-rail-card/g) || []).length === 7],
  ["rail controls", (section.match(/class="brainco-rail-control(?:\s[^"]*)?"/g) || []).length === 2],
  ["44px target", css.includes("min-width: 44px") && css.includes("min-height: 44px")],
  ["44px rail controls", css.includes("width: 44px") && css.includes("height: 44px")],
  ["balanced desktop shell", css.includes("width: min(100%, 1800px)") && css.includes("flex: 0 0 320px")],
  ["four-card collection page", css.includes("grid-auto-columns: calc((100% - 60px) / 4)") && css.includes("overflow: hidden")],
  ["page-sized rail navigation", script.includes("rail.clientWidth")],
  ["compact featured media", css.includes(".brainco-feature .img-wrapper") && css.includes("aspect-ratio: 11 / 4")],
  ["single-line desktop title", css.includes(".brainco-work .side-work-header h2") && css.includes("white-space: nowrap")],
  ["two-column BrainCo header", css.includes("grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.85fr)")],
  ["featured project controls", (section.match(/brainco-feature-nav/g) || []).length >= 2],
  ["selected collection state", section.includes("is-selected") && script.includes("selectBraincoProject")],
  ["feature direct preview", script.includes("playFeaturePreview") && script.includes("preview-card:not(.brainco-feature)")],
  ["reduced motion guard", script.includes("reducedMotion.matches") && css.includes("prefers-reduced-motion")],
];

console.log(checks.map(([name, ok]) => `${ok ? "PASS" : "FAIL"} ${name}`).join("\n"));
if (checks.some(([, ok]) => !ok)) process.exit(1);
