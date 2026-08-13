import os
import time
from pathlib import Path

from playwright.sync_api import sync_playwright


URL = os.environ.get("XR_TEST_URL", "file:///D:/Portfolio/low-fi-portfolio-prototype/index.html")
OUTPUT = Path(__file__).parent / "output"
OUTPUT.mkdir(exist_ok=True)


def open_xr(page, width, height):
    page.set_viewport_size({"width": width, "height": height})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(URL, wait_until="networkidle")
    frame = page.locator("iframe").content_frame
    section = frame.locator("[data-rq-xr-section]")
    section.evaluate("section => section.scrollIntoView()")
    stage = frame.locator("[data-rq-xr-stage]")
    deadline = time.monotonic() + 50
    state = {}
    while time.monotonic() < deadline:
        state = stage.evaluate("stage => ({progress: Number(stage.dataset.rqXrSequenceProgress || 0), fade: Number(getComputedStyle(stage).getPropertyValue('--rq-xr-paper-fade') || 0)})")
        if state["fade"] >= .999:
            break
        if state["progress"] < .3:
            page.mouse.wheel(0, 900)
        page.wait_for_timeout(500)
    assert state["fade"] >= .999, state
    return frame, errors


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    frame, errors = open_xr(page, 1440, 900)
    nodes = frame.locator("[data-rq-xr-cards] .xr-project")
    assert nodes.count() == 5
    assert frame.locator(".rq-xr-copy h2").evaluate("title => [...title.querySelectorAll('[data-rq-xr-title-line]')].every(line => { const box = line.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth; })")
    nodes.nth(0).hover()
    page.wait_for_timeout(500)
    stage = frame.locator("[data-rq-xr-stage]")
    assert "rq-xr-project-active" in (stage.get_attribute("class") or "")
    assert stage.locator(".xr-dome").evaluate("canvas => canvas.width > 0 && canvas.height > 0")
    assert stage.locator(".xr-contours").evaluate("canvas => canvas.width > 0 && canvas.height > 0")
    assert stage.locator(".rq-xr-copy h2").evaluate("title => { const box = title.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth; }")
    stage.hover(position={"x": 900, "y": 500})
    page.wait_for_timeout(250)
    smoke_background = stage.locator("[data-rq-xr-smoke]").get_attribute("data-scene-background")
    assert smoke_background in (None, "copied-xr-dome-canvas")
    assert not frame.locator("html").evaluate("el => el.scrollWidth > el.clientWidth")
    page.screenshot(path=str(OUTPUT / "xr-copy-desktop.png"))
    assert not errors, errors

    page = browser.new_page(has_touch=True, is_mobile=True)
    frame, errors = open_xr(page, 390, 844)
    nodes = frame.locator("[data-rq-xr-cards] .xr-project")
    assert nodes.count() == 5
    nodes.nth(4).tap()
    page.wait_for_timeout(300)
    assert "is-previewing" in (nodes.nth(4).get_attribute("class") or "")
    assert frame.locator("[data-rq-panel='home']").is_visible()
    page.screenshot(path=str(OUTPUT / "xr-copy-mobile.png"))
    nodes.nth(4).tap()
    page.wait_for_timeout(300)
    assert frame.locator("[data-rq-panel='detail']").is_visible()
    assert not frame.locator("html").evaluate("el => el.scrollWidth > el.clientWidth")
    assert not errors, errors
    browser.close()
