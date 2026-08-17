import os

from playwright.sync_api import sync_playwright


URL = os.environ.get("PORTFOLIO_URL", "http://127.0.0.1:4322/index.html")


def verify(browser, width: int, height: int):
    page = browser.new_page(viewport={"width": width, "height": height})
    page.goto(URL, wait_until="networkidle")
    frame = page.frame_locator('iframe[title="Portfolio Wireframe"]')
    sections = frame.locator('[data-rq-panel="home"] .rq-section[data-rq-page-step]')
    navigable_sections = frame.locator(
        '[data-rq-panel="home"] .rq-section[data-rq-page-step]:not(.rq-case-feature)'
    )
    assert sections.count() >= 2
    assert frame.locator(".rq-page-step-nav--top").count() == navigable_sections.count() - 1
    assert frame.locator(".rq-page-step-nav--bottom").count() == navigable_sections.count()
    assert frame.locator(".rq-case-feature .rq-page-step-nav").count() == 0

    first_bottom = sections.first.locator(".rq-page-step-nav--bottom button")
    assert sections.first.locator(".rq-page-step-nav--top button").count() == 0
    assert first_bottom.get_attribute("aria-label").startswith("Next section:")
    assert first_bottom.evaluate("node => [getComputedStyle(node).width, getComputedStyle(node).height]") == ["48px", "48px"]

    first_bottom.focus()
    assert first_bottom.evaluate("node => document.activeElement === node")
    first_bottom.click()
    page.wait_for_timeout(700)
    assert sections.nth(1).evaluate("node => window.scrollY") > 0
    xr_bottom = frame.locator("[data-rq-xr-section] .rq-page-step-nav--bottom button")
    assert xr_bottom.count() == 1
    xr_bottom.scroll_into_view_if_needed()
    assert xr_bottom.is_visible()
    page.close()


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        verify(browser, 1440, 900)
        verify(browser, 390, 844)
        browser.close()


if __name__ == "__main__":
    main()
