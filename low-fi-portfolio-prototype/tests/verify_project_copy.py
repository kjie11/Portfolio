from playwright.sync_api import sync_playwright


URL = "http://127.0.0.1:8767/index.html"
ADDED_PROJECTS = {
    "emg-ninja": "EMG Gesture Ninja",
    "vr-interaction": "VR Interaction Project",
    "wearable-game": "Wearable Game Experience",
    "webxr-gallery": "WebXR Multimodal Gallery",
    "white-lavender": "White Lavender - Game Remake Practice",
    "magic-bus": "Magic Bus",
}


def verify_viewport(browser, width, height, check_details=False):
    page = browser.new_page(
        viewport={"width": width, "height": height}, reduced_motion="reduce"
    )
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(URL, wait_until="networkidle")
    frame = page.frame_locator('iframe[title="Portfolio Wireframe"]')
    root = frame.locator("#ruyan-portfolio-wireframe")
    root.wait_for()

    project_ids = frame.locator("[data-rq-detail-project]").evaluate_all(
        "elements => elements.map(element => element.dataset.rqDetailProject)"
    )
    assert len(set(project_ids)) == 19, project_ids
    assert set(ADDED_PROJECTS).issubset(project_ids)
    assert "ar-graffiti" not in project_ids

    overflow = frame.locator("html").evaluate(
        "element => element.scrollWidth > element.clientWidth + 1"
    )
    assert not overflow, f"horizontal overflow at {width}x{height}"

    pizza_copy = frame.locator(
        '[data-rq-detail-project="pizza-delivery"] .rq-pizza-summary'
    ).inner_text()
    assert "1:14, 1:46, and 1:53" in pizza_copy
    assert "157%" not in pizza_copy and "44 seconds" not in pizza_copy

    if check_details:
        for index, (project_id, expected_title) in enumerate(ADDED_PROJECTS.items()):
            card = frame.locator(
                f'.rq-playground [data-rq-detail-project="{project_id}"]'
            )
            card.scroll_into_view_if_needed()
            if index == 0:
                card.focus()
                card.press("Enter")
            else:
                card.click()
            title = frame.locator("[data-rq-detail-title]")
            title.wait_for()
            assert title.inner_text() == expected_title
            frame.locator("[data-rq-detail-back]").click()

    assert not errors, errors
    page.close()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    verify_viewport(browser, 1440, 1000, check_details=True)
    verify_viewport(browser, 390, 844)
    browser.close()

print("Verified 19 projects, added detail routes, copy metrics, and responsive overflow.")
