from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "flowcharts" / "ai-usage-reminders"
NAMES = (
    "general-ai-usage",
    "claw-machine-ai-usage",
    "four-way-kitchen-ai-usage",
    "cat-teaser-ai-usage",
)


def inspect_layout(page):
    return page.evaluate(
        """
        () => {
          const nodes = [...document.querySelectorAll('.node')];
          const boxes = nodes.map((node) => ({
            id: node.id,
            left: node.offsetLeft,
            top: node.offsetTop,
            right: node.offsetLeft + node.offsetWidth,
            bottom: node.offsetTop + node.offsetHeight,
          }));
          const overlaps = [];
          for (let i = 0; i < boxes.length; i++) {
            for (let j = i + 1; j < boxes.length; j++) {
              const a = boxes[i], b = boxes[j];
              if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) {
                overlaps.push(`${a.id}/${b.id}`);
              }
            }
          }
          // contenteditable adds a few pixels of vertical editing overflow in Chromium.
          // Nodes use intrinsic height, so horizontal overflow is the clipping signal here.
          const clipped = [...document.querySelectorAll('[contenteditable="true"]')]
            .filter((el) => el.scrollWidth > el.clientWidth + 1)
            .map((el) => `${el.closest('.node')?.id || el.id}:${el.textContent.trim()}`);
          return { overlaps, clipped, nodeCount: nodes.length };
        }
        """
    )


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    desktop = browser.new_page(viewport={"width": 1920, "height": 1056}, device_scale_factor=1)

    for name in NAMES:
        html = OUTPUT / f"{name}.html"
        desktop.goto(html.as_uri(), wait_until="load")
        desktop.wait_for_timeout(250)
        result = inspect_layout(desktop)
        if result["overlaps"] or result["clipped"]:
            raise AssertionError(f"{name}: {result}")

        first_heading = desktop.locator('.node h2[contenteditable="true"]').first
        original = first_heading.inner_text()
        first_heading.fill(original + " 测试")
        desktop.locator("#saveBtn").click()
        desktop.reload(wait_until="load")
        assert desktop.locator('.node h2[contenteditable="true"]').first.inner_text() == original + " 测试"
        desktop.locator("#resetBtn").click()
        desktop.wait_for_load_state("load")
        assert desktop.locator('.node h2[contenteditable="true"]').first.inner_text() == original

        with desktop.expect_download() as download_info:
            desktop.locator("#exportPngBtn").click()
        download_info.value.save_as(OUTPUT / f"{name}.png")

        desktop.locator("#canvas").screenshot(path=OUTPUT / f"{name}-desktop-qa.png")
        print(f"PASS {name}: {result['nodeCount']} nodes, no overlap or clipping")

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
    for name in NAMES:
        mobile.goto((OUTPUT / f"{name}.html").as_uri(), wait_until="load")
        mobile.wait_for_timeout(150)
        assert mobile.locator("#canvas").is_visible()
        assert mobile.locator(".toolbar").is_visible()
        mobile.screenshot(path=OUTPUT / f"{name}-mobile-qa.png")
        print(f"PASS {name}: mobile canvas and toolbar visible")

    browser.close()
