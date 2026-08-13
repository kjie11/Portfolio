from pathlib import Path

from playwright.sync_api import sync_playwright


REFERENCE = "file:///C:/Users/brainco/Documents/%E4%BD%9C%E5%93%81%E9%9B%86/%E5%88%9B%E6%84%8F%E7%89%88%E9%A2%84%E8%A7%88/creative-site-framework.html"
TARGET = "file:///D:/Portfolio/low-fi-portfolio-prototype/index.html"
OUTPUT = Path(__file__).parent / "output"


def inspect(page, url, selector, name, iframe=False):
    page.set_viewport_size({"width": 1440, "height": 900})
    page.goto(url, wait_until="networkidle")
    scope = page.locator("iframe").content_frame if iframe else page
    section = scope.locator(selector)
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    result = scope.locator(selector).evaluate(
        """section => {
          const title = section.querySelector('.case-copy h2, .rq-pizza-title');
          const body = section.querySelector('.case-copy > p:not(.case-role), .rq-pizza-summary');
          const name = section.querySelector('.case-name, .rq-pizza-name');
          const data = element => {
            const style = getComputedStyle(element);
            const range = document.createRange();
            range.selectNodeContents(element);
            return {
              family: style.fontFamily,
              size: style.fontSize,
              weight: style.fontWeight,
              lineHeight: style.lineHeight,
              letterSpacing: style.letterSpacing,
              width: element.getBoundingClientRect().width,
              textWidth: range.getBoundingClientRect().width,
            };
          };
          return {
            title: data(title), body: data(body), name: data(name),
            fonts: [...document.fonts].map(f => ({family: f.family, status: f.status, weight: f.weight})),
            montaguLoaded: document.fonts.check('60px Montagu'),
            rqMontaguLoaded: document.fonts.check('60px "RQ Montagu Slab"'),
          };
        }"""
    )
    page.screenshot(path=str(OUTPUT / f"pizza-font-{name}-1440.png"))
    print(name, result)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    inspect(page, REFERENCE, ".pizza-case", "reference")
    inspect(page, TARGET, "section[data-rq-pizza-section]", "target", iframe=True)
    browser.close()
