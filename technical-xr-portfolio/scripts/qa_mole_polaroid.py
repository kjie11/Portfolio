from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "qa"
OUT.mkdir(parents=True, exist_ok=True)


def center_mole_card(page, distances):
    stage = page.locator(".gallery-stage")
    stage.scroll_into_view_if_needed()
    box = stage.bounding_box()
    assert box
    y = box["y"] + box["height"] * 0.48
    for distance in distances:
        page.mouse.move(box["x"] + box["width"] - 12, y)
        page.mouse.down()
        page.mouse.move(box["x"] + box["width"] - 12 - distance, y, steps=100)
        page.mouse.up()
        page.wait_for_timeout(700)
    page.wait_for_timeout(900)


def verify(viewport, distances, filename):
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport=viewport, device_scale_factor=1)
        console_errors = []
        page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
        page.goto("http://127.0.0.1:4173/creative/")
        page.wait_for_load_state("networkidle")
        center_mole_card(page, distances)

        card = page.locator('.polaroid[data-index="3"]')
        image = card.locator("img")
        assert image.get_attribute("src") == "/media/mole-rhythm-polaroid.webp"
        assert image.get_attribute("alt") in {
            "五只地鼠、下落木槌与节奏爆点构成的像素封面",
            "Pixel-art cover with five moles, a falling mallet, and a rhythmic impact burst",
        }
        assert image.evaluate("element => element.complete && element.naturalWidth === 1024")
        assert card.bounding_box()["width"] > 250
        current = page.locator(".gallery-title b").inner_text()
        assert current == "04 / 05", current
        assert not console_errors, console_errors
        page.locator(".gallery-stage").screenshot(path=str(OUT / filename))
        browser.close()


verify({"width": 1440, "height": 900}, [1230], "mole-polaroid-desktop.png")
verify({"width": 390, "height": 844}, [300, 300, 100], "mole-polaroid-mobile.png")
print("mole polaroid QA passed")
