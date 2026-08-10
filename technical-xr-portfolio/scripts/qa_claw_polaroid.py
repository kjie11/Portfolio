from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "qa"
OUT.mkdir(parents=True, exist_ok=True)


def verify(viewport, filename):
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport=viewport, device_scale_factor=1)
        console_errors = []
        page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
        page.goto("http://127.0.0.1:4174/creative/")
        page.wait_for_load_state("networkidle")
        page.locator(".gallery-stage").scroll_into_view_if_needed()
        page.wait_for_timeout(800)

        card = page.locator('.polaroid[data-index="0"]')
        image = card.locator("img")
        assert page.locator(".gallery-title b").inner_text() == "01 / 05"
        assert image.get_attribute("src") == "/media/claw-machine-prize-composite-cover.png"
        assert image.get_attribute("alt") in {
            "由文鸟与毛绒狗重新排布而成的抓娃娃机奖品封面",
            "Claw-machine prize cover recomposed from bird and plush-dog elements",
        }
        assert image.evaluate("element => element.complete && element.naturalWidth === 1024")
        assert card.bounding_box()["width"] > 250
        assert not console_errors, console_errors
        page.locator(".gallery-stage").screenshot(path=str(OUT / filename))
        browser.close()


verify({"width": 1440, "height": 900}, "claw-polaroid-desktop.png")
verify({"width": 390, "height": 844}, "claw-polaroid-mobile.png")
print("claw polaroid QA passed")
