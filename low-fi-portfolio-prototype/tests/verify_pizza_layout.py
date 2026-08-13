import os
from pathlib import Path

from playwright.sync_api import sync_playwright


OUTPUT = Path(__file__).parent / "output"
OUTPUT.mkdir(exist_ok=True)
PORT = os.environ.get("PIZZA_TEST_PORT", "4387")
TARGET_URL = os.environ.get("PIZZA_TEST_URL", f"http://127.0.0.1:{PORT}/index.html")


def inspect(page, name, width, height):
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.set_viewport_size({"width": width, "height": height})
    page.goto(TARGET_URL, wait_until="networkidle")
    frame = page.locator("iframe").content_frame
    section = frame.locator("section[data-rq-pizza-section]")
    section.wait_for(state="attached", timeout=10000)
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    result = section.evaluate(
        """section => {
          const box = element => {
            const rect = element.getBoundingClientRect();
            return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
          };
          const header = section.querySelector('.rq-pizza-header');
          const copy = section.querySelector('.rq-pizza-copy');
          const media = section.querySelector('.rq-pizza-media-column');
          const mediaFrame = section.querySelector('.rq-media');
          return {
            viewport: { width: innerWidth, height: innerHeight },
            section: box(section),
            header: box(header),
            copy: box(copy),
            media: box(media),
            mediaFrame: box(mediaFrame),
            horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
            title: section.querySelector('.rq-pizza-title').textContent.trim(),
            project: section.querySelector('.rq-pizza-name').textContent.trim()
            ,sectionDisplay: getComputedStyle(section).display
            ,sectionGrid: getComputedStyle(section).gridTemplateColumns
            ,projectDisplay: getComputedStyle(section.querySelector('.rq-pizza-project')).display
            ,rulePresent: [...document.querySelectorAll('style')].some(style => style.textContent.includes('section[data-rq-pizza-section] .rq-pizza-project'))
          };
        }"""
    )
    page.screenshot(path=str(OUTPUT / f"pizza-{name}.png"))
    print(name, result)
    assert not result["horizontalOverflow"]
    assert abs(result["mediaFrame"]["width"] / result["mediaFrame"]["height"] - 16 / 9) < 0.03
    if width > 720:
        assert result["header"]["width"] > result["copy"]["width"]
        assert result["copy"]["x"] < result["media"]["x"]
        assert result["section"]["y"] <= result["media"]["y"] < result["section"]["y"] + result["section"]["height"]
        assert result["section"]["height"] >= height
    else:
        assert result["header"]["y"] < result["copy"]["y"] < result["media"]["y"]
    assert not errors, errors


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    inspect(page, "desktop", 1440, 900)
    inspect(page, "mobile", 390, 844)
    browser.close()
