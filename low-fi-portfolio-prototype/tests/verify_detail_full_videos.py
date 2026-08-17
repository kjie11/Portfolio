import os

from playwright.sync_api import sync_playwright


URL = os.environ.get(
    "PORTFOLIO_URL",
    "file:///D:/Portfolio/low-fi-portfolio-prototype/index.html",
)
VIDEOS = {
    "augsoc": "IBjiM0_Ek-c",
    "abyss": "Jfq4dHgv87M",
    "speaking-world": "j5jeKZbRmL8",
    "plant-bot": "joI6rHameEc",
    "ar-escape-room": "Qz9FfWEAgcA",
    "emotional-mask": "AvCc4186Ol4",
    "after-class": "275NSp7rIuA",
}


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(URL, wait_until="domcontentloaded")
        frame = page.frame_locator('iframe[title="Portfolio Wireframe"]')
        frame.locator(
            '#ruyan-portfolio-wireframe[data-rq-creative-detail-installed="true"]'
        ).wait_for()

        for project_id, video_id in VIDEOS.items():
            trigger = frame.locator(
                f'[data-rq-detail-project="{project_id}"]:not([aria-hidden="true"])'
            ).first
            trigger.dispatch_event("click")
            video = frame.locator("[data-creative-detail-video]")
            assert video.is_visible(), project_id
            if URL.startswith("file:"):
                preview = video.locator(".creative-detail-youtube-preview")
                assert preview.is_visible(), project_id
                assert f"/vi/{video_id}/hqdefault.jpg" in preview.locator("img").get_attribute("src"), project_id
            else:
                player = video.locator("iframe")
                assert player.is_visible(), project_id
                assert f"/embed/{video_id}" in player.get_attribute("src"), project_id
                assert "autoplay" in player.get_attribute("allow"), project_id
            assert video.get_by_role("button", name="Play with sound").count() == 0, project_id
            frame.get_by_role("button", name="Back to Index").click()

        page.close()
        browser.close()


if __name__ == "__main__":
    main()
