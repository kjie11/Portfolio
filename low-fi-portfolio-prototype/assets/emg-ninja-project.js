(function () {
  "use strict";

  var detailData = window.RUYAN_CREATIVE_DETAIL_DATA;
  if (!detailData || !detailData.projects) return;

  var project = {
    file: "project-emgNinja.html",
    url: "../project-emgNinja.html",
    title: "EMG Gesture Ninja",
    pageTitle: "EMG Gesture Ninja - RuyanQin",
    projectClass: "project-content",
    summaryHtml: "<p>A gesture-driven ninja game prototype created at BrainCo, exploring how EMG input can translate physical gestures into immediate gameplay actions.</p>",
    summaryText: "A gesture-driven ninja game prototype created at BrainCo, exploring how EMG input can translate physical gestures into immediate gameplay actions.",
    hero: {
      tag: "video",
      src: "../videos/emg-ninja-preview.mp4",
      poster: "../images/emg-ninja-cover.jpg",
      ariaLabel: "EMG gesture-controlled ninja game preview",
      autoplay: true,
      controls: true,
      loop: true,
      muted: true,
      alt: ""
    },
    facts: [
      { label: "Role", value: "Unity real-time interaction development" },
      { label: "Format", value: "EMG gesture prototype" },
      { label: "Context", value: "BrainCo internship project" },
      { label: "Status", value: "Prototype documented; detailed validation unavailable" }
    ],
    actions: [
      { label: "Watch Full Video", href: "", disabled: true },
      { label: "Try Live Demo", href: "", disabled: true }
    ],
    sections: [
      {
        title: "Known Scope",
        paragraphs: ["This prototype explores translating EMG gestures into immediate ninja-game actions within a broader set of non-standard-input Unity experiments. The shared work included virtual-device mapping, real-time data paths, reconnect behavior, event deduplication, and keyboard simulation, but the exact subset used by this game is not separately documented."],
        items: []
      },
      {
        title: "Evidence Boundary",
        paragraphs: ["A project-specific interaction map, iteration history, test record, device performance, team structure, and personal contribution breakdown are not currently available. The page therefore presents the concept and preview without inventing a full case-study narrative."],
        items: []
      }
    ],
    extraImages: [],
    videoSection: null,
    nav: [
      { label: "Previous project", href: "../project-fourWayKitchen.html" },
      { label: "All projects", href: "../index.html" },
      { label: "Next project", href: "../project-moleRhythm.html" }
    ]
  };

  detailData.projects["emg-ninja"] = project;
  detailData.order = detailData.order.filter(function (key) {
    return key !== "emg-ninja";
  });
  detailData.order.splice(detailData.order.indexOf("four-way-kitchen") + 1, 0, "emg-ninja");
  window.RUYAN_EMG_NINJA_PROJECT = project;
})();
