import os
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "qa"
BASE_URL = os.environ.get("PORTFOLIO_URL", "http://127.0.0.1:5173/technical/")


def main() -> None:
    errors: list[str] = []
    OUTPUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        desktop = browser.new_page(viewport={"width": 1440, "height": 900})
        desktop.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        desktop.goto(BASE_URL, wait_until="networkidle")
        assert desktop.get_by_role("heading", name="Hi, I’m Ruyan —").is_visible()
        assert desktop.locator(".technical-intro h1").evaluate("el => el.scrollWidth <= el.clientWidth")
        assert desktop.locator(".technical-role").evaluate("el => getComputedStyle(el).whiteSpace === 'nowrap'")
        assert desktop.locator(".technical-intro").evaluate("el => getComputedStyle(el).display === 'flex' && getComputedStyle(el).flexWrap === 'nowrap'")

        cards = desktop.locator(".technical-card")
        assert cards.count() == 11
        assert "四面厨房" in cards.nth(5).get_attribute("aria-label")
        assert "White Lavender" in cards.nth(7).get_attribute("aria-label")
        assert desktop.locator(".technical-projects").evaluate("el => getComputedStyle(el).columnCount") == "3"
        assert cards.first.locator(".technical-card-copy").evaluate("el => getComputedStyle(el).opacity") == "0"
        assert desktop.locator("video").first.evaluate("el => el.paused && !el.autoplay")

        cards.first.hover()
        desktop.wait_for_timeout(400)
        assert cards.first.locator(".technical-card-copy").evaluate("el => getComputedStyle(el).opacity") == "1"
        desktop.locator("img").evaluate_all("images => Promise.all(images.map(image => image.decode()))")
        desktop.screenshot(path=OUTPUT / "technical-home-desktop.png", full_page=True)

        cards.first.click()
        desktop.wait_for_selector(".technical-project-detail h1")
        assert "#/project/abyss-vr" in desktop.url
        assert desktop.locator(".technical-project-detail h1").inner_text() == "Abyss：基于物理的 VR 叙事恐怖体验"
        assert desktop.locator(".technical-detail-youtube iframe").count() == 1
        assert desktop.locator(".technical-detail-supporting img").count() == 3
        assert desktop.locator(".technical-detail-workflow").count() == 0
        assert desktop.locator(".technical-detail-status").count() == 0
        desktop.locator(".technical-detail-supporting img").evaluate_all("images => Promise.all(images.map(image => image.decode()))")
        desktop.screenshot(path=OUTPUT / "technical-detail-desktop.png", full_page=True)

        desktop.get_by_role("button", name="返回项目").click()
        desktop.wait_for_selector(".technical-projects")
        assert "#/project/" not in desktop.url
        desktop.locator(".technical-card").nth(4).click()
        desktop.wait_for_selector(".technical-project-detail h1")
        key_work = desktop.locator(".technical-detail-work li")
        assert key_work.count() == 7
        assert "真实表面" in key_work.first.inner_text()
        assert desktop.locator(".technical-detail-meta").get_by_text("团队项目").is_visible()

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
        mobile.goto(BASE_URL, wait_until="networkidle")
        assert mobile.get_by_role("heading", name="Hi, I’m Ruyan —").is_visible()
        assert mobile.locator(".technical-intro h1").evaluate("el => el.scrollWidth <= el.clientWidth")
        assert mobile.locator(".technical-role").evaluate("el => getComputedStyle(el).whiteSpace === 'nowrap'")
        assert mobile.locator(".technical-intro").evaluate("el => el.scrollWidth <= el.clientWidth && getComputedStyle(el).flexWrap === 'nowrap'")
        assert mobile.locator(".technical-projects").evaluate("el => getComputedStyle(el).columnCount") == "1"
        assert mobile.locator(".technical-nav-links").evaluate("el => getComputedStyle(el).display") == "none"
        assert mobile.locator(".technical-card-copy").first.evaluate("el => getComputedStyle(el).opacity") == "1"
        assert mobile.locator("body").evaluate("el => el.scrollWidth <= window.innerWidth")
        mobile.locator("img").evaluate_all("images => Promise.all(images.map(image => image.decode()))")
        mobile.screenshot(path=OUTPUT / "technical-home-mobile.png", full_page=True)

        mobile.locator(".technical-card").nth(3).click()
        mobile.wait_for_selector(".technical-project-detail h1")
        assert mobile.locator(".technical-project-detail h1").inner_text().startswith("Emotional Mask")
        assert mobile.locator(".technical-detail-youtube iframe").count() == 1
        assert mobile.locator("body").evaluate("el => el.scrollWidth <= window.innerWidth")
        assert mobile.locator(".technical-detail-grid").evaluate("el => getComputedStyle(el).gridTemplateColumns") != ""
        mobile.screenshot(path=OUTPUT / "technical-detail-mobile.png", full_page=True)

        browser.close()

    assert not errors, f"Browser console errors: {errors}"
    print("technical portfolio QA passed")


if __name__ == "__main__":
    main()
