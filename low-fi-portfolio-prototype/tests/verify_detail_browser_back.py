import os

from playwright.sync_api import sync_playwright


URL = os.environ.get(
    "PORTFOLIO_URL",
    "file:///D:/Portfolio/low-fi-portfolio-prototype/index.html",
)


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(URL, wait_until="domcontentloaded")
        frame = page.frame_locator('iframe[title="Portfolio Wireframe"]')
        frame.locator(
            '#ruyan-portfolio-wireframe[data-rq-creative-detail-installed="true"]'
        ).wait_for()

        trigger = frame.locator(
            '[data-rq-detail-project="abyss"]:not([aria-hidden="true"])'
        ).first
        trigger.scroll_into_view_if_needed()
        home_scroll_y = frame.locator("body").evaluate("() => window.scrollY")
        assert home_scroll_y > 0

        trigger.dispatch_event("click")
        frame.locator('[data-rq-panel="creative-detail"]').wait_for(state="visible")
        assert page.evaluate("history.state.rqCreativeDetailProject") == "abyss"

        page.evaluate("history.back()")
        frame.locator('[data-rq-panel="home"]').wait_for(state="visible")
        page.wait_for_timeout(100)
        restored_scroll_y = frame.locator("body").evaluate("() => window.scrollY")
        assert abs(restored_scroll_y - home_scroll_y) <= 1

        browser.close()


if __name__ == "__main__":
    main()
