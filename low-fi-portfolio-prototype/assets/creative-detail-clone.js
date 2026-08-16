(function () {
  "use strict";

  var iframe = document.querySelector("iframe");
  if (!iframe) return;

  if (iframe.srcdoc && (location.protocol === "http:" || location.protocol === "https:")) {
    var html = iframe.srcdoc;
    var baseHref = new URL(".", location.href).href;
    if (!/<base[\s>]/i.test(html)) {
      html = html.replace(/<head>/i, "<head><base href=\"" + baseHref.replace(/"/g, "&quot;") + "\">");
    }
    iframe.removeAttribute("srcdoc");
    iframe.src = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  }

  function install() {
    var data = window.RUYAN_CREATIVE_DETAIL_DATA;
    var css = window.RUYAN_CREATIVE_DETAIL_CSS;
    var frameDocument;
    var frameWindow;

    if (!data || !data.projects) return;

    try {
      frameDocument = iframe.contentDocument;
      frameWindow = iframe.contentWindow;
    } catch (error) {
      return;
    }

    if (!frameDocument || !frameWindow) return;

    var root = frameDocument.getElementById("ruyan-portfolio-wireframe");
    if (!root || root.dataset.rqCreativeDetailInstalled === "true") return;

    if (css && !frameDocument.getElementById("creative-detail-clone-styles")) {
      var style = frameDocument.createElement("style");
      style.id = "creative-detail-clone-styles";
      style.textContent = css;
      frameDocument.head.appendChild(style);
    }

    var panel = frameDocument.createElement("section");
    panel.className = "creative-detail-page";
    panel.dataset.rqPanel = "creative-detail";
    panel.setAttribute("aria-label", "Project detail");
    panel.hidden = true;
    panel.innerHTML =
      '<header class="creative-detail-nav">' +
        '<div class="creative-detail-nav__inner">' +
          '<p class="creative-detail-brand">Ruyan Qin</p>' +
          '<nav class="creative-detail-nav__links" aria-label="Portfolio navigation">' +
            '<button type="button" data-creative-detail-action="home">All Projects</button>' +
            '<a href="../about.html">About</a>' +
            '<a href="../contact.html">Contact</a>' +
            '<a href="../Assets/CV-RuyanQin_UX3.pdf" target="_blank" rel="noopener noreferrer">CV</a>' +
          '</nav>' +
        '</div>' +
      '</header>' +
      '<main class="creative-detail-main">' +
        '<article class="creative-detail-article">' +
          '<div class="creative-detail-hero-media" data-creative-detail-hero></div>' +
          '<div class="creative-detail-grid">' +
            '<header class="creative-detail-header-copy">' +
              '<button class="creative-detail-back" type="button" data-creative-detail-action="home">&larr; Back to Index</button>' +
              '<h1 class="creative-detail-title" data-creative-detail-title></h1>' +
              '<div class="creative-detail-summary" data-creative-detail-summary></div>' +
            '</header>' +
            '<aside class="creative-detail-facts" aria-labelledby="creative-detail-facts-title">' +
              '<h2 class="creative-detail-facts-label" id="creative-detail-facts-title">Project Facts</h2>' +
              '<dl class="creative-detail-fact-list" data-creative-detail-facts></dl>' +
              '<div class="creative-detail-actions" data-creative-detail-actions></div>' +
            '</aside>' +
            '<div class="creative-detail-main-column">' +
              '<div data-creative-detail-sections></div>' +
              '<div data-creative-detail-images></div>' +
            '</div>' +
          '</div>' +
          '<div data-creative-detail-video></div>' +
          '<footer><nav class="creative-detail-project-nav" data-creative-detail-nav aria-label="Project navigation"></nav></footer>' +
        '</article>' +
      '</main>';

    root.appendChild(panel);

    var originalTitle = frameDocument.title;
    var homeScrollY = 0;
    var lastTrigger = null;

    function localAssetUrl(value) {
      if (!value) return "";

      try {
        var url = new URL(value, frameDocument.baseURI);
        if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
          var match = url.pathname.match(/\/(images|videos|portfolio-evidence)\/(.+)$/);
          if (match) return "../" + match[1] + "/" + match[2] + url.search + url.hash;
        }
      } catch (error) {
        return value;
      }

      return value;
    }

    function markExternal(anchor, href) {
      if (/^https?:\/\//i.test(href)) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
    }

    function youtubeEmbedUrl(value) {
      if (!value) return "";

      try {
        var url = new URL(value, frameDocument.baseURI);
        var host = url.hostname.replace(/^www\./, "");
        var id = "";
        if (host === "youtu.be") id = url.pathname.replace(/^\//, "").split("/")[0];
        else if (host === "youtube.com" || host === "youtube-nocookie.com") {
          id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
        }
        if (id) {
          var embed = new URL("https://www.youtube.com/embed/" + encodeURIComponent(id));
          embed.searchParams.set("rel", "0");
          if (location.protocol === "http:" || location.protocol === "https:") {
            embed.searchParams.set("origin", location.origin);
          }
          return embed.href;
        }
      } catch (error) {}

      return value;
    }

    function youtubeVideoId(value) {
      if (!value) return "";

      try {
        var url = new URL(value, frameDocument.baseURI);
        var host = url.hostname.replace(/^www\./, "");
        if (host === "youtu.be") return url.pathname.replace(/^\//, "").split("/")[0];
        if (host === "youtube.com" || host === "youtube-nocookie.com") {
          return url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop() || "";
        }
      } catch (error) {}

      return "";
    }

    function projectKeyForHref(href) {
      if (!href) return "";

      var file;
      try {
        file = decodeURIComponent(new URL(href, frameDocument.baseURI).pathname.split("/").pop());
      } catch (error) {
        return "";
      }

      return data.order.find(function (key) {
        return data.projects[key] && data.projects[key].file === file;
      }) || "";
    }

    function renderHero(hero) {
      var container = panel.querySelector("[data-creative-detail-hero]");
      container.replaceChildren();
      container.hidden = !hero;
      if (!hero) return;

      if (hero.tag === "video") {
        var video = frameDocument.createElement("video");
        var source = frameDocument.createElement("source");
        source.src = localAssetUrl(hero.src);
        video.poster = localAssetUrl(hero.poster);
        video.autoplay = Boolean(hero.autoplay);
        video.muted = Boolean(hero.muted);
        video.loop = Boolean(hero.loop);
        video.playsInline = true;
        video.controls = Boolean(hero.controls);
        video.setAttribute("aria-label", hero.ariaLabel);
        video.appendChild(source);
        container.appendChild(video);
        return;
      }

      var image = frameDocument.createElement("img");
      image.src = localAssetUrl(hero.src);
      image.alt = hero.alt;
      container.appendChild(image);
    }

    function renderFacts(facts) {
      var list = panel.querySelector("[data-creative-detail-facts]");
      list.replaceChildren();

      facts.forEach(function (fact) {
        var item = frameDocument.createElement("div");
        var label = frameDocument.createElement("dt");
        var value = frameDocument.createElement("dd");
        item.className = "creative-detail-fact";
        label.textContent = fact.label;
        value.textContent = fact.value;
        item.append(label, value);
        list.appendChild(item);
      });
    }

    function renderActions(actions) {
      var container = panel.querySelector("[data-creative-detail-actions]");
      container.replaceChildren();

      actions.forEach(function (action, index) {
        var control;
        var modifier = index === 0 ? "primary" : "secondary";

        if (action.disabled) {
          control = frameDocument.createElement("button");
          control.type = "button";
          control.disabled = true;
          modifier = "disabled";
        } else {
          control = frameDocument.createElement("a");
          control.href = localAssetUrl(action.href);
          markExternal(control, action.href);
        }

        control.className = "creative-detail-action creative-detail-action--" + modifier;
        control.textContent = action.label;
        container.appendChild(control);
      });
    }

    function renderSections(sections) {
      var container = panel.querySelector("[data-creative-detail-sections]");
      container.replaceChildren();

      sections.forEach(function (section) {
        var module = frameDocument.createElement("section");
        var heading = frameDocument.createElement("h2");
        module.className = "creative-detail-module";
        heading.textContent = section.title;
        module.appendChild(heading);

        section.paragraphs.forEach(function (text) {
          var paragraph = frameDocument.createElement("p");
          paragraph.textContent = text;
          module.appendChild(paragraph);
        });

        if (section.items.length) {
          var list = frameDocument.createElement("ul");
          section.items.forEach(function (text) {
            var item = frameDocument.createElement("li");
            item.textContent = text;
            list.appendChild(item);
          });
          module.appendChild(list);
        }

        container.appendChild(module);
      });
    }

    function renderVideo(videoSection) {
      var container = panel.querySelector("[data-creative-detail-video]");
      container.replaceChildren();
      if (!videoSection) return;

      var section = frameDocument.createElement("section");
      var heading = frameDocument.createElement("h2");
      var media;
      section.className = "creative-detail-video-section";
      heading.textContent = videoSection.title;
      section.appendChild(heading);

      if (videoSection.watch) {
        var watch = frameDocument.createElement("a");
        watch.href = localAssetUrl(videoSection.watch);
        watch.textContent = "Watch on YouTube";
        markExternal(watch, videoSection.watch);
        section.appendChild(watch);
      }

      if (videoSection.src) {
        media = frameDocument.createElement("video");
        media.src = localAssetUrl(videoSection.src);
        media.poster = localAssetUrl(videoSection.poster);
        media.controls = true;
        media.playsInline = true;
        media.preload = "metadata";
        media.setAttribute("aria-label", videoSection.ariaLabel);
      } else if (location.protocol === "file:") {
        var videoId = youtubeVideoId(videoSection.embed || videoSection.watch);
        media = frameDocument.createElement("a");
        media.href = videoSection.watch || ("https://www.youtube.com/watch?v=" + videoId);
        media.target = "_blank";
        media.rel = "noopener noreferrer";
        media.className = "creative-detail-video-frame creative-detail-youtube-preview";
        media.setAttribute("aria-label", "Watch this video on YouTube");
        media.innerHTML = '<img src="https://i.ytimg.com/vi/' + encodeURIComponent(videoId) + '/hqdefault.jpg" alt=""><span aria-hidden="true">&#9654;</span>';
      } else {
        media = frameDocument.createElement("iframe");
        media.src = youtubeEmbedUrl(videoSection.embed || videoSection.watch);
        media.title = videoSection.title || "Project video";
        media.loading = "lazy";
        media.allowFullscreen = true;
        media.referrerPolicy = "strict-origin-when-cross-origin";
        media.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen");
        media.setAttribute("allowfullscreen", "");
      }

      if (!media.classList.contains("creative-detail-video-frame")) media.className = "creative-detail-video-frame";
      section.appendChild(media);
      container.appendChild(section);
    }

    function renderImages(images) {
      var container = panel.querySelector("[data-creative-detail-images]");
      container.replaceChildren();

      images.forEach(function (imageData) {
        var image = frameDocument.createElement("img");
        image.className = "creative-detail-extra-image";
        image.src = localAssetUrl(imageData.src);
        image.alt = imageData.alt;
        container.appendChild(image);

        if (imageData.caption) {
          var caption = frameDocument.createElement("p");
          caption.textContent = imageData.caption;
          container.appendChild(caption);
        }
      });
    }

    function renderNavigation(items) {
      var nav = panel.querySelector("[data-creative-detail-nav]");
      nav.replaceChildren();

      items.forEach(function (item) {
        var button = frameDocument.createElement("button");
        var kind = item.label.toLowerCase().includes("previous") ? "previous" :
          item.label.toLowerCase().includes("next") ? "next" : "all";
        button.type = "button";
        button.className = "creative-detail-project-nav__" + kind;
        button.textContent = item.label;

        if (kind === "all") {
          button.dataset.creativeDetailAction = "home";
        } else {
          button.dataset.creativeDetailProject = projectKeyForHref(item.href);
          button.disabled = !button.dataset.creativeDetailProject;
        }

        nav.appendChild(button);
      });
    }

    function renderProject(key) {
      var project = data.projects[key];
      if (!project) return;

      panel.dataset.creativeDetailProject = key;
      frameDocument.title = project.pageTitle;
      panel.querySelector("[data-creative-detail-title]").textContent = project.title;
      panel.querySelector("[data-creative-detail-summary]").innerHTML = project.summaryHtml;
      renderHero(project.hero);
      renderFacts(project.facts);
      renderActions(project.actions);
      renderSections(project.sections);
      renderVideo(project.videoSection);
      renderImages(project.extraImages);
      renderNavigation(project.nav);
    }

    function openProject(key, trigger) {
      if (!data.projects[key]) return;

      if (panel.hidden) {
        lastTrigger = trigger;
        homeScrollY = frameWindow.scrollY;
      }

      root.querySelectorAll("[data-rq-panel]").forEach(function (item) {
        item.hidden = true;
      });
      renderProject(key);
      panel.hidden = false;
      frameWindow.scrollTo(0, 0);
      frameWindow.requestAnimationFrame(function () {
        panel.querySelector(".creative-detail-back").focus();
      });
    }

    function showHome() {
      if (panel.hidden) return;

      panel.hidden = true;
      var home = root.querySelector('[data-rq-panel="home"]');
      if (home) home.hidden = false;
      frameDocument.title = originalTitle;
      frameWindow.scrollTo(0, homeScrollY);
      frameWindow.requestAnimationFrame(function () {
        if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus();
      });
    }

    function handleTrigger(event) {
      if (event.type === "keydown" && event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;
      var trigger = event.target && event.target.closest ? event.target.closest("[data-rq-detail-project]") : null;
      if (!trigger) return;

      var key = trigger.dataset.rqDetailProject;
      if (!data.projects[key]) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      openProject(key, trigger);
    }

    frameDocument.addEventListener("click", handleTrigger, true);
    frameDocument.addEventListener("keydown", handleTrigger, true);
    panel.addEventListener("click", function (event) {
      var homeControl = event.target.closest("[data-creative-detail-action=home]");
      var projectControl = event.target.closest("[data-creative-detail-project]");

      if (homeControl) {
        showHome();
      } else if (projectControl && projectControl.dataset.creativeDetailProject) {
        renderProject(projectControl.dataset.creativeDetailProject);
        frameWindow.scrollTo(0, 0);
      }
    });

    root.dataset.rqCreativeDetailInstalled = "true";
  }

  iframe.addEventListener("load", install);
  try {
    if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") install();
  } catch (error) {
    return;
  }
})();
