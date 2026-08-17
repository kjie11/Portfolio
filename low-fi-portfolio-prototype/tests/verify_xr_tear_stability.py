import os

from playwright.sync_api import sync_playwright


URL = os.environ.get("PORTFOLIO_URL", "http://127.0.0.1:4322/index.html")


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(URL, wait_until="networkidle")
        frame = page.frame_locator('iframe[title="Portfolio Wireframe"]')
        xr_section = frame.locator("[data-rq-xr-section]")
        xr_stage = frame.locator("[data-rq-xr-stage]")
        xr_section.evaluate("node => node.scrollIntoView({ block: 'start' })")
        state = {}
        for _ in range(8):
            page.wait_for_timeout(300)
            state = xr_stage.evaluate(
                "node => ({"
                "autoTear: node.dataset.rqXrAutoTear, "
                "target: Number(node.dataset.rqXrSequenceTarget), "
                "paperFade: Number(node.style.getPropertyValue('--rq-xr-paper-fade')), "
                "dome: Boolean(document.querySelector('.xr-dome')), "
                "smoke: Boolean(document.querySelector('[data-rq-xr-smoke]'))"
                "})"
            )
            if state["autoTear"] == "triggered":
                break
        assert state["autoTear"] == "triggered"
        assert state["target"] == 1
        assert state["paperFade"] < 1
        assert state["dome"] and state["smoke"]

        box = xr_stage.bounding_box()
        assert box
        page.mouse.move(box["x"] + box["width"] * 0.7, box["y"] + box["height"] * 0.6)
        page.wait_for_timeout(1800)
        assert frame.locator("[data-rq-xr-smoke]").get_attribute("data-open") == "true"
        browser.close()


if __name__ == "__main__":
    main()
