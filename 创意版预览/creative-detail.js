(function () {
    const projectOrder = [
        "project-catTeaser.html",
        "project-moleRhythm.html",
        "project-handInputClaw.html",
        "project-fourWayKitchen.html",
        "project-pizzaDelivery.html",
        "project-ARGraffiti.html",
        "project-detail.html",
        "project-gothicHunter.html",
        "project-speakingWorld.html",
        "project-plantBot.html",
        "project-AREscapeRoom.html",
        "project-magicBus.html",
        "project-whiteLavender.html",
        "project-neonBeatRunner.html",
        "project-emotionalMask.html",
        "project-emgNinja.html",
        "project-vrInteraction.html",
        "project-webxrGallery.html",
        "project-wearableGame.html"
    ];

    const link = (href, label, className) => {
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.className = className;
        anchor.textContent = label;
        return anchor;
    };

    function enhanceDetailPage() {
        const project = document.querySelector(".project-content");
        if (!project || project.dataset.enhanced === "true") return;

        project.dataset.enhanced = "true";
        project.querySelectorAll(".project-media-empty").forEach((node) => node.remove());

        const back = project.querySelector(":scope > .back-btn");
        const oldTitle = project.querySelector(":scope > h2");
        const summary = project.querySelector(":scope > .project-text");
        if (!oldTitle || !summary) return;

        const logo = document.querySelector(".logo");
        if (logo && logo.tagName === "H1") {
            const brand = document.createElement("p");
            brand.className = logo.className;
            brand.innerHTML = logo.innerHTML;
            logo.replaceWith(brand);
        }

        const title = document.createElement("h1");
        title.className = "detail-title";
        title.innerHTML = oldTitle.innerHTML;
        oldTitle.replaceWith(title);

        const media = Array.from(project.children).find((node) =>
            node.matches(".detail-preview, img")
        );

        title.id = "project-title";

        let mediaWrap = null;
        if (media) {
            mediaWrap = document.createElement("div");
            mediaWrap.className = "detail-hero-media";
            mediaWrap.append(media);
        }

        const header = document.createElement("section");
        header.className = "detail-header-copy";
        header.setAttribute("aria-labelledby", "project-title");
        if (back) header.append(back);
        header.append(title, summary);

        const projectVideo = Array.from(project.children).find((node) =>
            node.matches(".video-container")
        );
        let videoSection = null;
        if (projectVideo) {
            videoSection = document.createElement("section");
            videoSection.className = "detail-video-section";
            videoSection.setAttribute("aria-labelledby", "project-video-title");

            const videoTitle = document.createElement("h2");
            videoTitle.id = "project-video-title";
            videoTitle.textContent = "Project Video";
            videoSection.append(videoTitle);

            const youtubePreview = projectVideo.querySelector(".youtube-preview");
            const youtubeFrame = projectVideo.querySelector('iframe[src*="youtube.com/embed/"]');
            let watchHref = youtubePreview?.href;
            if (!watchHref && youtubeFrame) {
                const videoId = new URL(youtubeFrame.src).pathname.split("/").pop();
                watchHref = `https://www.youtube.com/watch?v=${videoId}`;
            }
            if (watchHref) {
                const watchLink = link(watchHref, "Watch on YouTube", "detail-video-link");
                watchLink.target = "_blank";
                watchLink.rel = "noopener noreferrer";
                videoSection.append(watchLink);
            }

            videoSection.append(projectVideo);
        }

        const grid = document.createElement("div");
        grid.className = "detail-grid";
        const main = document.createElement("div");
        main.className = "detail-main";

        Array.from(project.children).forEach((node) => {
            if (node !== back) main.append(node);
        });

        main.querySelectorAll("h3").forEach((oldHeading) => {
            const heading = document.createElement("h2");
            Array.from(oldHeading.attributes).forEach((attribute) => {
                heading.setAttribute(attribute.name, attribute.value);
            });
            heading.innerHTML = oldHeading.innerHTML;
            oldHeading.replaceWith(heading);
        });

        grid.append(header);

        const facts = main.querySelector(".case-fact-strip");
        if (facts) {
            const actions = main.querySelector(".detail-actions");
            const aside = document.createElement("aside");
            aside.className = "detail-facts";
            aside.setAttribute("aria-labelledby", "project-facts-title");

            const label = document.createElement("h2");
            label.id = "project-facts-title";
            label.className = "detail-facts-label";
            label.textContent = "Project Facts";
            aside.append(label, facts);
            if (actions) aside.append(actions);
            grid.append(aside, main);
        } else {
            grid.classList.add("detail-grid--single");
            grid.append(main);
        }

        project.replaceChildren();
        if (mediaWrap) project.append(mediaWrap);
        project.append(grid);
        if (videoSection) project.append(videoSection);

        const fileName = decodeURIComponent(window.location.pathname.split("/").pop());
        const currentIndex = projectOrder.indexOf(fileName);
        if (currentIndex >= 0) {
            const nav = document.createElement("nav");
            nav.className = "detail-project-nav";
            nav.setAttribute("aria-label", "Project navigation");

            if (currentIndex > 0) {
                nav.append(link(projectOrder[currentIndex - 1], "Previous project", "detail-project-nav__previous"));
            } else {
                nav.append(document.createElement("span"));
            }

            nav.append(link("creative-site-framework.html", "All projects", "detail-project-nav__all"));

            if (currentIndex < projectOrder.length - 1) {
                nav.append(link(projectOrder[currentIndex + 1], "Next project", "detail-project-nav__next"));
            } else {
                nav.append(document.createElement("span"));
            }

            project.append(nav);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", enhanceDetailPage);
    } else {
        enhanceDetailPage();
    }
})();
