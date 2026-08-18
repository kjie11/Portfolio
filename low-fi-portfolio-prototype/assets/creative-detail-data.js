window.RUYAN_CREATIVE_DETAIL_DATA = {
  "order": [
    "cat-teaser",
    "duck-trombone",
    "mole-rhythm",
    "claw-machine",
    "four-way-kitchen",
    "pizza-delivery",
    "augsoc",
    "abyss",
    "gothic-hunter",
    "speaking-world",
    "plant-bot",
    "ar-escape-room",
    "magic-bus",
    "white-lavender",
    "neon-beatrunner",
    "emotional-mask",
    "cascadeur",
    "ue-vfx",
    "after-class",
    "emg-ninja",
    "vr-interaction",
    "webxr-gallery",
    "wearable-game"
  ],
  "projects": {
    "cat-teaser": {
      "file": "project-catTeaser.html",
      "url": "http://127.0.0.1:4389/project-catTeaser.html",
      "actions": [
        {
          "disabled": false,
          "href": "http://127.0.0.1:4389/videos/cat-teaser-full.mp4",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Interaction design and Unity prototyping"
        },
        {
          "label": "Period",
          "value": "July 2026 - present"
        },
        {
          "label": "Format",
          "value": "2D embodied-input prototype"
        },
        {
          "label": "Status",
          "value": "Implemented and automated-tested; device validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Cat Teaser 2D gameplay preview",
        "autoplay": true,
        "controls": true,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/cat-teaser-polaroid.webp",
        "src": "http://127.0.0.1:4389/videos/cat-teaser-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-moleRhythm.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Cat Teaser 2D - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Designed the core interaction around controlling the handle while force travels through the rope",
            "Tuned rope inertia, feather drift, and velocity-and-acceleration flick detection",
            "Designed cat observation, wind-up, target locking, pouncing, and missed catches",
            "Expanded the prototype with two cats, multiple targets, and three progressive scenarios",
            "Unified mouse and wearable inputs behind the same interaction path"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Preserve delay and inertia instead of giving the player direct control of the feather",
            "Let the cat commit early and genuinely miss to create anticipation and playful deception",
            "Keep mouse and wearable inputs consistent without changing the interaction rules",
            "Keep real wristband feel, end-to-end latency, resolution coverage, and full-suite validation pending"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "The interaction had to preserve rope inertia without becoming uncontrollable, while the cats needed to feel readable and still be able to miss. The same rules also had to work through mouse and wearable input without stale network samples taking control."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Control the handle rather than the feather so force travels through the rope.",
            "Lock a cat's target at take-off; this sacrifices mid-air tracking but creates genuine anticipation and missed catches.",
            "Use a tunable custom rope model for controllable inertia, accepting more implementation work than a simple joint chain.",
            "Move from a complex IMU-ray mapping to absolute pointer coordinates once the middleware could provide them, reducing the data path in exchange for less posture information."
          ],
          "paragraphs": [],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [
            "Documented checks include 29 EditMode tests, 4 focused PlayMode input tests, and 42 middleware tests.",
            "Real wristband feel, end-to-end latency, resolution coverage, and the full PlayMode suite remain open validation work."
          ],
          "paragraphs": [
            "The prototype grew from one cat chasing a feather into two cats, fish and bird targets, and three progressive scenarios. The hardware path also changed after geometry checks showed that a moving projection plane could prevent the intended cursor movement."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p>Cat Teaser 2D is a Unity interaction prototype built around a custom rope simulation. Players control the handle rather than the feather directly, creating the delay and inertia needed for anticipation, deception, and well-timed misses.</p>\n                <p>The prototype combines rope physics, velocity-and-acceleration flick detection, cat behaviour, multiple targets, and shared mouse and wearable-input paths.</p>\n            ",
      "summaryText": "Cat Teaser 2D is a Unity interaction prototype built around a custom rope simulation. Players control the handle rather than the feather directly, creating the delay and inertia needed for anticipation, deception, and well-timed misses. The prototype combines rope physics, velocity-and-acceleration flick detection, cat behaviour, multiple targets, and shared mouse and wearable-input paths.",
      "title": "Cat Teaser 2D",
      "videoSection": {
        "ariaLabel": "Cat Teaser 2D full prototype video",
        "poster": "http://127.0.0.1:4389/images/cat-teaser-polaroid.webp",
        "src": "http://127.0.0.1:4389/videos/cat-teaser-full.mp4",
        "title": "Full Prototype Video"
      }
    },
    "mole-rhythm": {
      "file": "project-moleRhythm.html",
      "url": "http://127.0.0.1:4389/project-moleRhythm.html",
      "actions": [
        {
          "disabled": false,
          "href": "http://127.0.0.1:4389/videos/mole-rhythm-full.mp4",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Interaction design and Unity prototyping"
        },
        {
          "label": "Period",
          "value": "July 2026 - present"
        },
        {
          "label": "Format",
          "value": "Five-lane rhythm prototype"
        },
        {
          "label": "Status",
          "value": "Implemented and automated-tested; glove validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Mole Rhythm gameplay preview",
        "autoplay": true,
        "controls": true,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/mole-rhythm-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/mole-rhythm-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-catTeaser.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-handInputClaw.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Mole Rhythm - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Reframed whack-a-mole as a five-lane rhythm experience mapped directly to five fingers",
            "Defined novice-friendly chart constraints for density, repetition, weak fingers, and two-finger events",
            "Built a reproducible offline beat-analysis and chart-generation workflow",
            "Simplified the audio plan to one master track and visual judgment when the source material changed",
            "Designed DSP-timed judgments, adjustable windows, calibration, and keyboard-to-glove input parity"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Use character motion rather than a conventional falling-note track to communicate timing",
            "Reduce weaker-finger load so first-time wearable users can play comfortably",
            "Keep chart output reproducible while supporting multiple difficulty variants",
            "Keep real-glove false triggers, per-device timing calibration, and graded accuracy feedback pending"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "A five-finger rhythm game needed charts that felt musical while remaining approachable for exhibition newcomers. The available audio did not support the original multi-stem and MIDI concept, and automatic generation had to avoid overloading weaker fingers or creating excessive simultaneous hits."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Reduced a complex multi-stem pitch-control concept to one main track, visual judgment, offline Librosa analysis, and deterministic JSON charts.",
            "Kept the Normal chart untouched and generated Easy and Very Easy variants in the import layer.",
            "Used absolute DSP time for judgment so chart timing remains independent of frame rate.",
            "The simpler audio structure gives up some live musical control but better fits the available material, exhibition setup, and repeatable testing."
          ],
          "paragraphs": [],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [
            "Normal contains 106 events; Easy contains 53 events, 58 actions, and 5 simultaneous pairs.",
            "Focused records show 10 EditMode and 1 PlayMode chart/judgment tests passing; later feedback work recorded up to 17 EditMode and 3 PlayMode tests.",
            "Real glove false triggers, device/audio offset calibration, and the complete PlayMode suite remain pending."
          ],
          "paragraphs": [
            "The workflow connects offline beat analysis, ergonomic lane assignment, Unity import, timing judgment, and visual feedback. Later passes added independent hammer strikes, hit bursts, and sparser difficulty variants."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p>Mole Rhythm reimagines whack-a-mole as a five-finger music game. Five holes map directly to thumb, index, middle, ring, and little finger. Players bend the matching finger when a mole reaches its target pose, using character motion rather than a falling-note track to read the rhythm.</p>\n                <p>The chart pipeline analyzes a fixed music track offline, then applies deterministic density, repetition, weaker-finger, and two-finger constraints. This keeps output reproducible and allows Normal, Easy, and Very Easy variants without modifying the source chart.</p>\n            ",
      "summaryText": "Mole Rhythm reimagines whack-a-mole as a five-finger music game. Five holes map directly to thumb, index, middle, ring, and little finger. Players bend the matching finger when a mole reaches its target pose, using character motion rather than a falling-note track to read the rhythm. The chart pipeline analyzes a fixed music track offline, then applies deterministic density, repetition, weaker-finger, and two-finger constraints. This keeps output reproducible and allows Normal, Easy, and Very Easy variants without modifying the source chart.",
      "title": "Mole Rhythm",
      "videoSection": {
        "ariaLabel": "Mole Rhythm full prototype video",
        "poster": "http://127.0.0.1:4389/images/mole-rhythm-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/mole-rhythm-full.mp4",
        "title": "Full Prototype Video"
      }
    },
    "claw-machine": {
      "file": "project-handInputClaw.html",
      "url": "http://127.0.0.1:4389/project-handInputClaw.html",
      "actions": [
        {
          "disabled": false,
          "href": "http://127.0.0.1:4389/videos/claw-machine-full.mp4",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Interaction design and Unity prototyping"
        },
        {
          "label": "Period",
          "value": "July 2026 - present"
        },
        {
          "label": "Format",
          "value": "3D embodied-input game prototype"
        },
        {
          "label": "Status",
          "value": "Implemented and automated-tested; real-device tuning pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Hand-input claw machine gameplay preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/claw-machine-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/claw-machine-hover.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-moleRhythm.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-fourWayKitchen.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Hand-Input Claw Machine - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Mapped the player's hand continuously to the claw: squeeze tighter and the gripper closes further",
            "Designed a two-hand motion-control model for positioning and continuous grip control",
            "Made grip strength part of the game through prize-specific success windows",
            "Visualized invisible hand force with immediate radial feedback",
            "Designed the complete physical interaction from targeting to grabbing, carrying, and release"
          ],
          "paragraphs": [],
          "title": "Project Highlights"
        },
        {
          "items": [
            "Make hand opening and closing feel directly connected to the claw",
            "Turn grip strength into a learnable balance between control and risk",
            "Make success windows, failure states, and recovery paths visible and predictable",
            "Keep keyboard simulation available while real two-hand tuning remains in progress"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "The player must position the claw with one hand while maintaining a learnable grip-force window with the other. Animation, physics, failure drops, and lingering hardware input all had to resolve into a believable and recoverable state."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Split spatial positioning and grip control across two hands instead of reproducing a joystick-and-button machine.",
            "Give each prize a configurable force profile rather than one universal threshold.",
            "Let failed prizes fall from their current location and recover independently instead of snapping to their origin.",
            "Keep deformation visual while leaving colliders stable, trading strict physical deformation for predictable performance.",
            "Validate the full loop with keyboard simulation before drawing conclusions about real-device feel."
          ],
          "paragraphs": [],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [
            "Focused EditMode and PlayMode checks cover force windows, timer reset, voluntary release, and failure recovery.",
            "A restored hardware-input scene loads in Unity with the claw, gesture/grip controllers, and input mode intact.",
            "A formal practice scene, complete result feedback, prize reset, and real two-hand tuning remain pending."
          ],
          "paragraphs": [
            "The initial hardware-angle and pinch concept became a state machine covering start, sustained force, out-of-range timing, voluntary release, automatic drop-off, and reason-specific recovery."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p><strong>Your hand is the claw—and the grip is yours.</strong> Traditional claw machines let you position the claw, but not control how tightly it closes. In this Unity prototype, your hand controls both: open your hand and the claw opens; squeeze tighter and the claw closes further. Whether the prize slips or stays is entirely up to you.</p>\n                <p>One hand steers the claw while the other controls its grip in real time. Each prize has its own sweet spot: too loose and it slips, too tight and the grip becomes unstable. Radial feedback makes that invisible force easy to read without taking away the tension of the grab.</p>\n            ",
      "summaryText": "Your hand is the claw—and the grip is yours. Traditional claw machines let you position the claw, but not control how tightly it closes. In this Unity prototype, your hand controls both: open your hand and the claw opens; squeeze tighter and the claw closes further. Whether the prize slips or stays is entirely up to you. One hand steers the claw while the other controls its grip in real time. Each prize has its own sweet spot: too loose and it slips, too tight and the grip becomes unstable. Radial feedback makes that invisible force easy to read without taking away the tension of the grab.",
      "title": "Hand-Input Claw Machine",
      "videoSection": {
        "ariaLabel": "Hand-Input Claw Machine full prototype video",
        "poster": "http://127.0.0.1:4389/images/claw-machine-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/claw-machine-full.mp4",
        "title": "Full Prototype Video"
      }
    },
    "four-way-kitchen": {
      "file": "project-fourWayKitchen.html",
      "url": "http://127.0.0.1:4389/project-fourWayKitchen.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Interaction design and Unity prototyping"
        },
        {
          "label": "Period",
          "value": "July 2026 - present"
        },
        {
          "label": "Format",
          "value": "Embodied cooking-game prototype"
        },
        {
          "label": "Status",
          "value": "Implemented and compiled; full device playthrough pending"
        }
      ],
      "hero": {
        "alt": "Four-sided kitchen gameplay with ingredient stations, chopping boards, stoves, and a central character",
        "ariaLabel": "",
        "autoplay": false,
        "controls": false,
        "loop": false,
        "muted": false,
        "poster": "",
        "src": "http://127.0.0.1:4389/images/four-way-kitchen-polaroid.webp",
        "tag": "img"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-handInputClaw.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-pizzaDelivery.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Four-Way Kitchen - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Designed a four-sided kitchen layout that keeps sourcing, processing, cooking, and delivery spatially distinct",
            "Built a complete ingredient loop with chopping, timed cooking, burning, plating, recipes, and orders",
            "Defined deterministic four-direction throws instead of relying on unpredictable free-physics drops",
            "Unified keyboard, EMG, camera, and wearable inputs behind stable gameplay actions",
            "Added timeout, disconnect, stale-input, and residual-state handling for safer hardware interaction"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Keep the cooking loop understandable when switching between keyboard, EMG, camera, and wearable inputs",
            "Separate continuous movement from discrete pickup, processing, and throwing actions",
            "Treat timeout, disconnect, and stale signals as interaction-design constraints",
            "Keep full Play Mode and real dual-hand validation separate from compiled and focused-test evidence"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "The cooking loop had to accept continuous pointers and discrete gestures from keyboard, EMG, camera, and glove paths without rewriting gameplay for each device. Disconnects, stale samples, hand assignment, and diagonal intent were experience problems as much as protocol problems."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Keep high-level actions stable: move or drag, pick or place, cut, and throw in four directions.",
            "Assign continuous spatial control to the left hand and discrete actions to the right.",
            "Let the bridge emit a native pointer, pass it through unchanged, and interpret the same x, y, and pressed contract in Unity.",
            "Apply diagonal-intent assistance only to the glove path so mouse and camera behavior remain unchanged.",
            "Accept a mixed pointer-plus-gesture protocol to preserve both continuous and discrete control."
          ],
          "paragraphs": [],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [
            "Core food processing, cooking, plating, orders, and deterministic throwing are connected to the multi-input architecture.",
            "Bridge, middleware, and Unity pointer paths have code, compile, prefab, and serialized-reference checks.",
            "A complete real two-hand Play Mode run, camera performance, and a Windows development build remain pending."
          ],
          "paragraphs": [
            "The input path progressed from keyboard graybox to discrete events, camera gestures, glove bridge, native pointer, and a shared middleware layer. Fail-safe release, FIFO handling, calibration, and diagnostics were added as integration issues appeared."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p>Four-Way Kitchen is a single-player Unity action-cooking prototype arranged around four functional counter walls. Players collect ingredients, chop and cook food, assemble plates, throw items in fixed directions, and complete orders.</p>\n                <p>The interaction system explores how the same kitchen actions can remain understandable across keyboard and mouse, EMG events, MediaPipe camera gestures, and wearable pointer input. Each input mode is explicit and mutually exclusive so switching devices does not change the gameplay rules.</p>\n            ",
      "summaryText": "Four-Way Kitchen is a single-player Unity action-cooking prototype arranged around four functional counter walls. Players collect ingredients, chop and cook food, assemble plates, throw items in fixed directions, and complete orders. The interaction system explores how the same kitchen actions can remain understandable across keyboard and mouse, EMG events, MediaPipe camera gestures, and wearable pointer input. Each input mode is explicit and mutually exclusive so switching devices does not change the gameplay rules.",
      "title": "Four-Way Kitchen",
      "videoSection": null
    },
    "pizza-delivery": {
      "file": "project-pizzaDelivery.html",
      "url": "http://127.0.0.1:4389/project-pizzaDelivery.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [
        {
          "alt": "Pizza Delivery gameplay showing a delivery car, active order, timer, and coin rewards",
          "src": "http://127.0.0.1:4389/images/pizza-delivery-01-gameplay-01.png",
          "caption": "Gameplay screenshot · Driving, active order, countdown, and reward feedback"
        },
        {
          "alt": "Poki dashboard comparing four Pizza Delivery test versions, including three completed rounds of 500 gameplays",
          "src": "http://127.0.0.1:4389/portfolio-evidence/pizza-delivery/assets/poki-iteration-dashboard.png"
        }
      ],
      "facts": [
        {
          "label": "Role",
          "value": "Game design and Unity development"
        },
        {
          "label": "Period",
          "value": "May - July 2026"
        },
        {
          "label": "Platform",
          "value": "Unity WebGL"
        },
        {
          "label": "Status",
          "value": "Released prototype with three recorded test rounds"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Pizza Delivery gameplay preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/pizza-delivery-01-gameplay-01.png",
        "src": "http://127.0.0.1:4389/videos/pizza-delivery.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-fourWayKitchen.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-ARGraffiti.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Pizza Delivery - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [],
          "paragraphs": [
            "Early playtests showed players leaving before they experienced the full pickup-and-delivery loop. Some missed the WASD and Shift controls, others became stuck on buildings or road obstacles, and the growing stack of tutorials and HUD elements competed for attention. The challenge was to teach the game quickly without slowing down a short browser session."
          ],
          "title": "The Problem"
        },
        {
          "items": [
            "System foundation: Built the delivery economy around timed rewards, collision damage, repairs, vehicle durability, garage upgrades, and zone unlocks, then integrated the prototype with Poki.",
            "First playtest response: Players reported difficult steering, too many obstacles, unclear keyboard controls, and an easy-to-miss Shift boost. I prioritized clearer arrows, collider fixes, fewer road blockers, a working pause flow, and a short first delivery with no timer pressure.",
            "Progression pass: Introduced Normal, Rush, and VIP orders gradually, added zone-specific deliveries and terrain changes, and connected each completed order to cash, vehicle, and area progression.",
            "Simplification pass: Mentor feedback showed that repeated health information, objective panels, early Garage and Zone UI, and tutorial pop-ups were overwhelming. I removed the landing and Start screens, cut character and pop-up tutorials, and moved essential arrows and key prompts closer to the car."
          ],
          "paragraphs": [],
          "title": "How the Design Changed"
        },
        {
          "items": [],
          "paragraphs": [
            "The final playtest notes still recorded players reaching for the arrow keys and occasionally missing the Shift prompt. Rather than treating the metric improvement as proof that onboarding was solved, I kept control discoverability as an open design issue."
          ],
          "title": "What Remained Difficult"
        },
        {
          "items": [
            "Converted recurring playtest friction into priorities for each WebGL build",
            "Designed staged Normal, Rush, and VIP order progression",
            "Connected deliveries to rewards, repairs, vehicles, and zone unlocks",
            "Simplified onboarding after testing revealed UI and tutorial overload",
            "Prepared repeatable Poki and itch.io releases with Git-based versioning"
          ],
          "paragraphs": [],
          "title": "Key Work"
        },
        {
          "items": [
            "A short first delivery that teaches driving through an immediate goal",
            "Order types introduced gradually instead of exposing every system at once",
            "Vehicle upgrades and locked zones that turn deliveries into longer-term progress",
            "In-world arrows, nearby key prompts, audio, particles, and camera feedback for important actions"
          ],
          "paragraphs": [],
          "title": "Solution"
        },
        {
          "items": [
            "3 Poki test rounds",
            "500 recorded plays in each completed round",
            "1:14, 1:46, and 1:53 visible average playtime across the three rounds",
            "Implemented, runtime verified, and released as a WebGL prototype"
          ],
          "paragraphs": [
            "Poki version comparison · Three completed 500-gameplay rounds recorded average playtimes of 1:14, 1:46, and 1:53"
          ],
          "title": "Results"
        },
        {
          "items": [
            "Game Designer: Defined the core loop, order types, progression, and onboarding",
            "Unity Prototyper: Extended vehicle control and implemented gameplay, UI, and feedback systems",
            "Experience Designer: Turned player behaviour into priorities across three test rounds"
          ],
          "paragraphs": [],
          "title": "My Role"
        },
        {
          "items": [],
          "paragraphs": [
            "The clearest lesson was that more explanation does not always create more clarity. One iteration added several tutorials and pop-ups; the next removed most of them and brought the essential cues into the play space. Behavioural data helped set priorities, while the written playtest record kept unresolved problems visible instead of turning every release into a success story.",
            "Validation boundary: the documents support the sequence of feedback and design changes, but not causal attribution between any individual change and the playtime increase. Round-by-round retention, completion rate, and the original 44-second baseline dashboard remain unavailable."
          ],
          "title": "Learnings"
        },
        {
          "items": [],
          "paragraphs": [
            "The recorded playtime trend supports a story of iterative improvement across versions, but it does not prove that any single design change caused the increase. Round-by-round retention, completion rate, and the original 44-second baseline dashboard are not available."
          ],
          "title": "Project Boundaries"
        }
      ],
      "summaryHtml": "\n                <p>Pizza Delivery is a casual Unity WebGL driving prototype I developed during an internship. I designed and built the tutorial and first level, then used Poki playtests to reshape the opening, driving feel, order progression, and moment-to-moment feedback.</p>\n                <p>Three completed Poki test rounds recorded 500 gameplays each. Visible average playtime rose from 1 minute 14 seconds to 1 minute 46 seconds and then 1 minute 53 seconds. The data shows the versions improving over time, but does not isolate any single change as the cause.</p>\n            ",
      "summaryText": "Pizza Delivery is a casual Unity WebGL driving prototype I developed during an internship. I designed and built the tutorial and first level, then used Poki playtests to reshape the opening, driving feel, order progression, and moment-to-moment feedback. Three completed Poki test rounds recorded 500 gameplays each. Visible average playtime rose from 1 minute 14 seconds to 1 minute 46 seconds and then 1 minute 53 seconds. The data shows the versions improving over time, but does not isolate any single change as the cause.",
      "title": "Pizza Delivery",
      "videoSection": null
    },
    "augsoc": {
      "file": "project-ARGraffiti.html",
      "url": "http://127.0.0.1:4389/project-ARGraffiti.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=IBjiM0_Ek-c",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "VR Developer and User Researcher"
        },
        {
          "label": "Platform",
          "value": "Meta Quest 3"
        },
        {
          "label": "Engine",
          "value": "Unity"
        },
        {
          "label": "Study",
          "value": "18 participants"
        },
        {
          "label": "Period",
          "value": "June 2025 - September 2025"
        },
        {
          "label": "Status",
          "value": "Implemented and playtested; detailed findings pending evidence"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "AugSoc AR creation research preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/ARGraffiti.png",
        "src": "http://127.0.0.1:4389/videos/ar-graffiti-preview.mp4",
        "tag": "video"
      },
      "nav": [],
      "pageTitle": "AugSoc AR Creation Research - RuyanQin",
      "projectClass": "project-content case-study",
      "sections": [
        {
          "items": [
            "Comparable 2D and 3D AR creation modes in Unity for Meta Quest 3",
            "Spraying, path drawing, dragging, and scaling interactions",
            "Questionnaires and interviews conducted with 18 participants",
            "Research evidence used to guide interaction iteration"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Keep interaction variables comparable across both creation modes",
            "Combine observed behaviour with stated participant preference",
            "Avoid claiming specific findings until the detailed study record is available"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "The prototype needed two comparable creation modes so observed behavior and stated preference could be studied without changing the underlying task more than necessary. The detailed research question, hypotheses, measures, and statistical findings are not yet available for publication."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Built comparable 2D and 3D AR creation modes for Meta Quest 3.",
            "Implemented spraying, path drawing, dragging, and scaling interactions.",
            "Designed and conducted questionnaires and interviews with 18 participants.",
            "Used the study as input to later interaction priorities while keeping unverified findings out of the public narrative."
          ],
          "paragraphs": [],
          "title": "Key Work"
        }
      ],
      "summaryHtml": "\n                    <p>AugSoc is a Unity and Meta Quest 3 research prototype comparing 2D and 3D AR creation modes. The system supports spraying, path drawing, dragging, and scaling so participant behaviour and preference can be examined across comparable creative tasks.</p>\n                    <p>I combined VR development with user research, using questionnaires and interviews with 18 participants to inform later interaction priorities. Detailed findings, statistics, and the final change set remain pending evidence.</p>\n                    ",
      "summaryText": "AugSoc is a Unity and Meta Quest 3 research prototype comparing 2D and 3D AR creation modes. The system supports spraying, path drawing, dragging, and scaling so participant behaviour and preference can be examined across comparable creative tasks. I combined VR development with user research, using questionnaires and interviews with 18 participants to inform later interaction priorities. Detailed findings, statistics, and the final change set remain pending evidence.",
      "title": "AugSoc AR Creation Research",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/IBjiM0_Ek-c?si=GljLm76XnbM7PRLH",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=IBjiM0_Ek-c"
      }
    },
    "abyss": {
      "file": "project-detail.html",
      "url": "http://127.0.0.1:4389/project-detail.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=Jfq4dHgv87M",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [
        {
          "alt": "Project Detail 1",
          "src": "http://127.0.0.1:4389/images/aybss1.png"
        },
        {
          "alt": "Project Detail 2",
          "src": "http://127.0.0.1:4389/images/abyss2.png"
        },
        {
          "alt": "Project Detail 3",
          "src": "http://127.0.0.1:4389/images/abyss3.png"
        }
      ],
      "facts": [
        {
          "label": "Role",
          "value": "Independent design and development"
        },
        {
          "label": "Period",
          "value": "February 2026"
        },
        {
          "label": "Format",
          "value": "Experimental VR horror prototype"
        },
        {
          "label": "Status",
          "value": "Designed; runtime and user validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Abyss gameplay preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/aybss.jpg",
        "src": "http://127.0.0.1:4389/videos/abyss-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-ARGraffiti.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-gothicHunter.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Abyss - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Dynamic hand movement mapped to embodied locomotion",
            "Monumental environments built around a fear-of-scale theme",
            "Spatial audio supporting scale and tension",
            "Triggered environmental storytelling within an immersive VR space"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Use body movement to support the emotional goal rather than as a detached control scheme",
            "Combine scale, audio, and environmental triggers instead of relying on exposition",
            "Keep runtime and device validation visibly separate from the documented design intent"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "Abyss explores whether hand-driven locomotion, spatial audio, and triggered environmental storytelling can serve a feeling of scale and fear. The central design task was to make body movement support the emotional goal rather than function as a detached control novelty."
          ],
          "title": "Challenge"
        },
        {
          "items": [],
          "paragraphs": [
            "The concept places embodied movement at the center of the experience and uses environmental scale and audio as supporting systems. Precise gesture mappings, comfort safeguards, and locomotion alternatives still need project-level documentation before stronger claims can be made."
          ],
          "title": "Key Decisions & Trade-offs"
        }
      ],
      "summaryHtml": "Abyss is a personal experimental VR project that maps dynamic hand movement to locomotion. Monumental environments, spatial audio, and triggered environmental storytelling work together to make the player’s body part of the emotional experience. The available record supports the design direction, while device details, recognition methods, implementation scope, and runtime validation remain pending evidence.",
      "summaryText": "Abyss is a personal experimental VR project that maps dynamic hand movement to locomotion. Monumental environments, spatial audio, and triggered environmental storytelling work together to make the player’s body part of the emotional experience. The available record supports the design direction, while device details, recognition methods, implementation scope, and runtime validation remain pending evidence.",
      "title": "Abyss - Embodied VR Horror Prototype",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/Jfq4dHgv87M?si=X2fIQ2jOro5qNJO7",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=Jfq4dHgv87M"
      }
    },
    "emotional-mask": {
      "file": "project-emotionalMask.html",
      "url": "http://127.0.0.1:4389/project-emotionalMask.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=AvCc4186Ol4",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Game Jam team member"
        },
        {
          "label": "Period",
          "value": "February 2026"
        },
        {
          "label": "Format",
          "value": "VR Game Jam prototype"
        },
        {
          "label": "Status",
          "value": "Implemented; completion and playtest evidence pending"
        }
      ],
      "hero": null,
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-neonBeatRunner.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-emgNinja.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Emotional Mask - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Gesture-triggered interactions connected to level events",
            "Level logic supporting the playable flow",
            "Narrative interaction content built within the Jam scope"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Keep gesture input tied to the level flow",
            "Control scope around a playable team prototype",
            "Separate my recorded contribution from the wider team delivery"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "Within a time-limited Game Jam, gesture triggers, level progression, and narrative interactions had to converge into a playable VR build. Scope control and integration were as important as the individual mechanics."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Implemented gesture-triggered mechanics tied to the level flow.",
            "Contributed level logic and narrative interaction content.",
            "Worked within a team delivery context and a compressed prototype schedule."
          ],
          "paragraphs": [],
          "title": "Key Work"
        }
      ],
      "summaryHtml": "\n                <p>Emotional Mask is a time-boxed VR Game Jam team prototype connecting gesture triggers, level flow, and narrative interaction.</p>\n\n                <p>My recorded contribution covers gesture-trigger mechanisms, level logic, and interactive narrative content. The exact Jam duration, team size, personal code ownership, final completion level, and playtest results remain undocumented.</p>\n            ",
      "summaryText": "Emotional Mask is a time-boxed VR Game Jam team prototype connecting gesture triggers, level flow, and narrative interaction. My recorded contribution covers gesture-trigger mechanisms, level logic, and interactive narrative content. The exact Jam duration, team size, personal code ownership, final completion level, and playtest results remain undocumented.",
      "title": "Emotional Mask - VR Game Jam Prototype",
      "videoSection": {
        "embed": "https://youtube.com/embed/AvCc4186Ol4?si=o2d4R4_AdNQDpJ7W",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=AvCc4186Ol4"
      }
    },
    "ar-escape-room": {
      "file": "project-AREscapeRoom.html",
      "url": "http://127.0.0.1:4389/project-AREscapeRoom.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=Qz9FfWEAgcA",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Design, development, and project management"
        },
        {
          "label": "Period",
          "value": "November - December 2025"
        },
        {
          "label": "Format",
          "value": "Team AR escape-room prototype"
        },
        {
          "label": "Status",
          "value": "Implemented; device and user validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "AR Escape Room preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/AREscapeRoom.png",
        "src": "http://127.0.0.1:4389/videos/ar-escape-room-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-plantBot.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-magicBus.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "AR Escape Room - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Physical and virtual clues organised into one puzzle flow",
            "Virtual-window wiping as an AR interaction mechanic",
            "Handwriting input and QR-code triggers",
            "Integration and debugging across project modules"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Make heterogeneous AR interactions understandable within one escape-room flow",
            "Connect physical-space clues to digital state changes",
            "Treat module integration and debugging as part of experience delivery"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [
            "Design: Developed the concept, mechanics, and physical-digital clue flow",
            "Development: Built window wiping, handwriting input, and QR-trigger interactions",
            "Project management: Broke down requirements, managed progress, and integrated modules",
            "Boundary: This was a team project; integration does not imply authorship of every module"
          ],
          "paragraphs": [],
          "title": "My Role"
        },
        {
          "items": [],
          "paragraphs": [
            "The project had to combine several unlike AR interactions into a puzzle flow that remained understandable and stable: clues in the physical space, virtual window wiping, handwriting input, and QR-triggered events."
          ],
          "title": "Challenge"
        },
        {
          "items": [],
          "paragraphs": [
            "The experience was organized around interactions with the real room rather than isolated digital mini-games. Requirements were decomposed into modules, scheduled, integrated, and debugged as one system; the exact module priorities and rejected alternatives are not yet documented."
          ],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [],
          "paragraphs": [
            "The recorded process covers concept development, requirement breakdown, progress management, module implementation, integration, and debugging. A repository exists, but device details, stability criteria, and user-test results are still missing."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p>AR Escape Room is a team project that connects clues and interactions in physical space to one AR puzzle flow. My recorded responsibilities span concept and mechanic design, requirement breakdown, progress management, development, module integration, and debugging.</p>\n\n\n\n            ",
      "summaryText": "AR Escape Room is a team project that connects clues and interactions in physical space to one AR puzzle flow. My recorded responsibilities span concept and mechanic design, requirement breakdown, progress management, development, module integration, and debugging.",
      "title": "AR Escape Room",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/Qz9FfWEAgcA?si=XUrDZ1bM1PQGdQyU",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=Qz9FfWEAgcA"
      }
    },
    "speaking-world": {
      "file": "project-speakingWorld.html",
      "url": "http://127.0.0.1:4389/project-speakingWorld.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=j5jeKZbRmL8",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Independent design and development"
        },
        {
          "label": "Period",
          "value": "October 2025"
        },
        {
          "label": "Format",
          "value": "AR and conversational-interaction prototype"
        },
        {
          "label": "Status",
          "value": "Designed; technical and user validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Speaking World AR and AI experience preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/SpeakingWorld.png",
        "src": "http://127.0.0.1:4389/videos/speaking-world-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-gothicHunter.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-plantBot.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Speaking World - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Object recognition as the entry point to the interaction",
            "AI dialogue connected to spoken feedback",
            "AR drawing directly on recognised object surfaces",
            "A continuous recognition, conversation, voice, and expression flow"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Treat familiar physical objects as characters rather than isolated interface elements",
            "Keep AI conversation spatially connected to the recognised object",
            "Do not claim model training, fine-tuning, latency, or interaction quality without project-level evidence"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "The concept connects object recognition, conversation, voice feedback, and AR drawing into one continuous encounter with a personified real-world object. The main risk is not any individual feature, but the continuity and recovery of the full interaction chain."
          ],
          "title": "Challenge"
        },
        {
          "items": [],
          "paragraphs": [
            "The experience was framed as a characterful object encounter rather than a separate chat interface. Model and API choices, context rules, latency, safety behavior, and fallback states are not documented, so the page does not imply model training or production AI engineering."
          ],
          "title": "Key Decisions & Trade-offs"
        }
      ],
      "summaryHtml": "Speaking World is a personal AR prototype connecting object recognition, AI dialogue, voice feedback, and drawing on object surfaces into one continuous experience. Recognised physical objects become characters rather than sending the user to a separate chat interface. AI is documented as a product feature; model choice, prompting, latency, safety, failure handling, and development-assistant use remain pending evidence.",
      "summaryText": "Speaking World is a personal AR prototype connecting object recognition, AI dialogue, voice feedback, and drawing on object surfaces into one continuous experience. Recognised physical objects become characters rather than sending the user to a separate chat interface. AI is documented as a product feature; model choice, prompting, latency, safety, failure handling, and development-assistant use remain pending evidence.",
      "title": "Speaking World - AR & AI Companion Environment",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/j5jeKZbRmL8?si=HAUQf2Hocal3J2rb",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=j5jeKZbRmL8"
      }
    },
    "plant-bot": {
      "file": "project-plantBot.html",
      "url": "http://127.0.0.1:4389/project-plantBot.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=joI6rHameEc",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [
        {
          "alt": "Plant Bot research board with references, habitat observations, activities, visual directions, and prototype concepts",
          "caption": "Research and concept direction · References, habitats, activities, and form explorations shaped the physical and emotional interaction model.",
          "src": "http://127.0.0.1:4389/images/plant-bot-research.png"
        },
        {
          "alt": "Plant Bot circuit diagrams, ESP32 breadboard test, and soldered prototype board",
          "caption": "Circuit development · ESP32 wiring moved from schematic and breadboard tests to a soldered prototype board.",
          "src": "http://127.0.0.1:4389/images/plant-bot-circuit-development.png"
        },
        {
          "alt": "Plant Bot sensor, motor, ESP32, wiring, and 3D-printed enclosure during hardware assembly",
          "caption": "Hardware assembly · Sensors, motor control, display, and the printed enclosure were brought together through iterative bench testing.",
          "src": "http://127.0.0.1:4389/images/plant-bot-hardware-assembly.png"
        },
        {
          "alt": "Plant Bot installed beside a plant with watering feedback and a web dashboard showing soil moisture and light conditions",
          "caption": "Integrated prototype · The physical bot communicates care feedback while the companion interface exposes soil moisture and light conditions.",
          "src": "http://127.0.0.1:4389/images/plant-bot-integrated-prototype.png"
        }
      ],
      "facts": [
        {
          "label": "Role",
          "value": "Interaction design and Arduino development"
        },
        {
          "label": "Period",
          "value": "May 2026"
        },
        {
          "label": "Format",
          "value": "Physical-computing and AR prototype"
        },
        {
          "label": "Status",
          "value": "Physical prototype completed; user and AR validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Plant Bot prototype preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/plant-bot-cover.png",
        "src": "http://127.0.0.1:4389/videos/plant-bot-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-speakingWorld.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-AREscapeRoom.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Plant Bot - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [],
          "paragraphs": [
            "The project moved from reference research and interaction mapping into circuit design, sensor testing, physical assembly, and an integrated plant-care experience."
          ],
          "title": "From Research to Working Prototype"
        },
        {
          "items": [
            "Four categories of environmental data translated into six plant states and care guidance",
            "A web interface that communicates plant condition and suggested actions",
            "Arduino/ESP32 sensing supported by circuit, PCB, and communication prototyping",
            "A 3D-modelled and printed physical prototype with Unity/AR feedback"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Make invisible environmental conditions emotionally legible and actionable",
            "Connect physical sensing, digital information, and AR feedback into one coherent care journey",
            "Present meaningful states and guidance instead of exposing raw sensor values",
            "Keep user comprehension, sensor accuracy, and AR runtime results as pending validation"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [],
          "paragraphs": [
            "Plant Bot turns environmental readings that are difficult to interpret into emotional states, care prompts, and contextual AR feedback. The challenge was to connect research, electronics, fabrication, communication, and interface design into one understandable experience."
          ],
          "title": "Challenge"
        },
        {
          "items": [],
          "paragraphs": [
            "The design interprets four categories of environmental data through six states and actionable care cues rather than presenting raw readings alone. The detailed mapping rules and their effect on user understanding still require evidence."
          ],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [
            "Work covered user research, function definition, information architecture, sensors and circuitry, PCB work and soldering, communication, 3D modeling and printing, and Unity/AR integration.",
            "A physical prototype was completed.",
            "Sensor accuracy, data-path reliability, user comprehension, AR runtime behavior, and any autonomous movement are not validated claims."
          ],
          "paragraphs": [],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p>Plant Bot is a physical-computing prototype that turns plant-care data into an understandable and expressive experience. Four types of environmental data are mapped to six emotional states, care prompts, and contextual AR feedback.</p>\n                <p>The project connects user research and interaction design with a web interface, Arduino/ESP32 sensing, circuit and PCB work, communication, 3D modelling and printing, Unity/AR integration, and physical assembly.</p>\n            ",
      "summaryText": "Plant Bot is a physical-computing prototype that turns plant-care data into an understandable and expressive experience. Four types of environmental data are mapped to six emotional states, care prompts, and contextual AR feedback. The project connects user research and interaction design with a web interface, Arduino/ESP32 sensing, circuit and PCB work, communication, 3D modelling and printing, Unity/AR integration, and physical assembly.",
      "title": "Plant Bot",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/joI6rHameEc",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=joI6rHameEc"
      }
    },
    "gothic-hunter": {
      "file": "project-gothicHunter.html",
      "url": "http://127.0.0.1:4389/project-gothicHunter.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Gameplay design and Godot prototyping"
        },
        {
          "label": "Period",
          "value": "August 2026 prototype record"
        },
        {
          "label": "Format",
          "value": "Top-down survival graybox"
        },
        {
          "label": "Status",
          "value": "Runtime-verified graybox; balance and hardware validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Gothic Hunter gameplay preview",
        "autoplay": true,
        "controls": true,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/gothic-hunter.jpg",
        "src": "../videos/gothicHunterShort.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-detail.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-speakingWorld.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Gothic Hunter - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Turned wrist angle into continuous movement: the palm becomes the joystick",
            "Mapped thumb swipes and a long-press gesture to directional skills and ultimates",
            "Converted a one-sentence brief into a playable game through a rapid Godot AI workflow",
            "Generated and integrated character art, environments, VFX, animation, and adaptive music",
            "Built a finite three-act run with four evolving weapons, elites, and a final boss"
          ],
          "paragraphs": [],
          "title": "Project Highlights"
        },
        {
          "items": [
            "Used one gameplay language across wearable gestures and keyboard fallback",
            "Reviewed every AI-assisted output through hands-on play, automated checks, and runtime capture",
            "Tuned dense combat with telemetry, debug jumps, pooling, and performance tests",
            "Implemented and tested the glove command path; final physical-glove calibration remains pending"
          ],
          "paragraphs": [],
          "title": "Workflow & Validation"
        },
        {
          "items": [],
          "paragraphs": [
            "The project started from a near-empty Godot codebase and needed a complete, inspectable run under a fixed enemy budget. The work combined pacing, weapon growth, directional input, crowded-scene readability, and verification in an unfamiliar engine workflow."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Front-load input abstraction and object pooling so the core loop can scale before hardware integration.",
            "Use procedural visuals and temporary audio to validate play before committing to final assets.",
            "Reduce a four-direction expanding attack to fixed-size vertical slashes, sacrificing freedom for a clearer relationship between gesture and trajectory.",
            "Reuse and rig the existing enemy artwork instead of generating replacement assets.",
            "Treat compilation as one checkpoint, then use runtime capture and review for experiential issues."
          ],
          "paragraphs": [],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [
            "The main graybox has an 18-second runtime proof plus structural, phase, upgrade, and pacing checks.",
            "A 450-frame directional-skill capture verifies ignored horizontal input and vertical trajectories.",
            "A 180-enemy stress test recorded 238.3 FPS in its test environment; this is not target-hardware profiling.",
            "A user run ended around two minutes while the automated run reached about 4:51, so balance remains unresolved."
          ],
          "paragraphs": [
            "The graybox moved through implementation, headless checks, windowed review, recorded playback, pacing changes, directional-skill refinement, skeletal walk-cycle fixes, and stress tests."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p><strong>Your palm is the joystick.</strong> Built in Godot, Gothic Hunter turns wrist tilt into 2D movement, while thumb swipes trigger directional skills and a long-press gesture releases the ultimate. The result is a top-down survival game controlled through the hand itself, with keyboard input retained as a reliable fallback.</p>\n                <p>The second highlight is the <strong>Godot AI workflow</strong>: a one-sentence game brief became a playable game, not just a design document. The workflow built and iterated the Godot gameplay systems alongside character art, graveyard assets, effects, animation, and adaptive music; hands-on play, automated checks, and recorded captures kept the final experience human-directed.</p>\n            ",
      "summaryText": "Your palm is the joystick. Built in Godot, Gothic Hunter turns wrist tilt into 2D movement, while thumb swipes trigger directional skills and a long-press gesture releases the ultimate. The result is a top-down survival game controlled through the hand itself, with keyboard input retained as a reliable fallback. The second highlight is the Godot AI workflow: a one-sentence game brief became a playable game, not just a design document. The workflow built and iterated the Godot gameplay systems alongside character art, graveyard assets, effects, animation, and adaptive music; hands-on play, automated checks, and recorded captures kept the final experience human-directed.",
      "title": "Gothic Hunter",
      "videoSection": null
    },
    "magic-bus": {
      "file": "project-magicBus.html",
      "url": "http://127.0.0.1:4389/project-magicBus.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=NhjzFSxJuxg",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Format",
          "value": "Gameplay prototype"
        },
        {
          "label": "Available evidence",
          "value": "Preview and public video"
        },
        {
          "label": "Status",
          "value": "Detailed project record pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Magic Bus gameplay preview",
        "autoplay": true,
        "controls": false,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/magic-bus-cover.jpg",
        "src": "http://127.0.0.1:4389/videos/magic-bus-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-AREscapeRoom.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-whiteLavender.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Magic Bus - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [],
          "paragraphs": [
            "The available portfolio material confirms a Magic Bus gameplay preview and linked project video. A reliable record of the role, goals, systems, process, and validation has not yet been located."
          ],
          "title": "Known Scope"
        },
        {
          "items": [],
          "paragraphs": [
            "Until a project description or repository record is added, this page intentionally avoids attributing specific mechanics, outcomes, tools, or authorship. The video remains the primary evidence."
          ],
          "title": "Evidence Boundary"
        }
      ],
      "summaryHtml": "Gameplay video for the Magic Bus project.",
      "summaryText": "Gameplay video for the Magic Bus project.",
      "title": "Magic Bus",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/NhjzFSxJuxg",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=NhjzFSxJuxg"
      }
    },
    "white-lavender": {
      "file": "project-whiteLavender.html",
      "url": "http://127.0.0.1:4389/project-whiteLavender.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=YqOI3-PyRKA",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Format",
          "value": "Game-remake practice"
        },
        {
          "label": "Visible scope",
          "value": "Combat, UI, and dialogue systems"
        },
        {
          "label": "Status",
          "value": "Technical practice; validation record pending"
        }
      ],
      "hero": null,
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-magicBus.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-neonBeatRunner.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Project Details - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Combat System",
            "UI System",
            "Dialogue System"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [],
          "paragraphs": [
            "This practice project recreates selected mechanics from White Lavender, with the current page showing combat, UI, and dialogue systems as the visible scope."
          ],
          "title": "Known Scope"
        },
        {
          "items": [],
          "paragraphs": [
            "The available record does not yet establish the implementation process, degree of fidelity, tools, validation, asset sources, or learning outcomes. These details are left unstated rather than reconstructed from the reference game."
          ],
          "title": "Evidence Boundary"
        }
      ],
      "summaryHtml": "\n                <p>This project is a technical remake practice focused on recreating the core mechanics of <em>White Lavender</em></p>\n\n\n            ",
      "summaryText": "This project is a technical remake practice focused on recreating the core mechanics of White Lavender",
      "title": "White Lavender - Game Remake Practice",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/YqOI3-PyRKA?si=cNp12QB90wnEHn1h",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=YqOI3-PyRKA"
      }
    },
    "neon-beatrunner": {
      "file": "project-neonBeatRunner.html",
      "url": "http://127.0.0.1:4389/project-neonBeatRunner.html",
      "actions": [
        {
          "disabled": false,
          "href": "http://127.0.0.1:4389/videos/neon-beatrunner-full.mp4",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Gameplay concept and Godot prototyping"
        },
        {
          "label": "Period",
          "value": "August 2026 prototype record"
        },
        {
          "label": "Format",
          "value": "Rhythm platformer prototype"
        },
        {
          "label": "Status",
          "value": "Runtime-verified with demo audio; player validation pending"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Neon BeatRunner gameplay preview",
        "autoplay": true,
        "controls": true,
        "loop": true,
        "muted": true,
        "poster": "../images/neon-beatrunner-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/neon-beatrunner-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-whiteLavender.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-emotionalMask.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Neon BeatRunner - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Auto-run platforming combined with rhythm-timed combat",
            "Librosa analysis exported as deterministic JSON chart data",
            "Absolute-time enemy movement and Perfect, Good, and Miss judgement",
            "Arrangement constraints for jump reachability, action conflicts, and event density",
            "Offset control, combo, life, rank, pause, and restart systems"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Use timestamps for rhythm judgement and collisions only for spatial presentation",
            "Keep the first prototype self-contained with procedural visuals and demo audio",
            "Separate deterministic analysis tools from AI-assisted development"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [
            "Demo analysis detected approximately 117.45 BPM and generated 44 repeatable events",
            "Final demo distribution contains 33 combat and 11 jump events",
            "Godot import, headless runtime, and 1280 × 720 capture were verified",
            "Final WAV, formal art, long-form pacing, latency tuning, and player testing remain pending"
          ],
          "paragraphs": [],
          "title": "Validation"
        },
        {
          "items": [],
          "paragraphs": [
            "Audio analysis can supply a rhythmic skeleton, but directly turning every onset into an enemy or jump produces conflicts and unreachable layouts. Movement and judgment also needed to remain tied to song time rather than drifting with frame rate."
          ],
          "title": "Challenge"
        },
        {
          "items": [
            "Separate audio analysis, gameplay orchestration, and runtime presentation.",
            "Use timestamps for rhythm judgment and collisions only for spatial feedback.",
            "Limit consecutive jumps, conflicting actions, and event density in the orchestration layer.",
            "Use self-contained procedural visuals when final art was unavailable, keeping the gameplay prototype moving without treating those visuals as final production art."
          ],
          "paragraphs": [],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [
            "The demo WAV was measured at about 117.45 BPM and generated 44 events.",
            "Two chart generations produced the same SHA-256; the final demo distribution is 33 combat events and 11 jumps.",
            "Godot completed import checks, a 240-frame headless run, and a 1280×720 capture."
          ],
          "paragraphs": [
            "The workflow moved from reference analysis to a Godot/Python prototype, demo audio, deterministic chart generation, strict-type fixes, recorded review, and a second orchestration pass after the first chart produced too few jumps."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n                <p>Neon BeatRunner is a Godot rhythm-platformer prototype that converts offline audio analysis into reachable jumps, timed enemies, and graded combat feedback. The character runs automatically while obstacles and enemies are scheduled to reach fixed judgement points at target song times.</p>\n                <p>Audio analysis, gameplay arrangement, and runtime presentation are separated so every onset does not become an action. Absolute song time drives movement and judgement, while an arrangement layer limits consecutive jumps, action conflicts, and event density.</p>\n            ",
      "summaryText": "Neon BeatRunner is a Godot rhythm-platformer prototype that converts offline audio analysis into reachable jumps, timed enemies, and graded combat feedback. The character runs automatically while obstacles and enemies are scheduled to reach fixed judgement points at target song times. Audio analysis, gameplay arrangement, and runtime presentation are separated so every onset does not become an action. Absolute song time drives movement and judgement, while an arrangement layer limits consecutive jumps, action conflicts, and event density.",
      "title": "Neon BeatRunner",
      "videoSection": {
        "ariaLabel": "Neon BeatRunner full gameplay video",
        "poster": "../images/neon-beatrunner-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/neon-beatrunner-full.mp4",
        "title": "Full Gameplay Video"
      }
    },
    "emg-ninja": {
      "file": "project-emgNinja.html",
      "url": "http://127.0.0.1:4389/project-emgNinja.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Unity real-time interaction development"
        },
        {
          "label": "Format",
          "value": "EMG gesture prototype"
        },
        {
          "label": "Evidence",
          "value": "Umbrella project record only"
        },
        {
          "label": "Status",
          "value": "Prototype scope recorded; detailed validation unavailable"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "EMG gesture-controlled ninja game preview",
        "autoplay": true,
        "controls": true,
        "loop": true,
        "muted": true,
        "poster": "http://127.0.0.1:4389/images/emg-ninja-cover.jpg",
        "src": "http://127.0.0.1:4389/videos/emg-ninja-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-emotionalMask.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-vrInteraction.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "EMG Gesture Ninja - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [],
          "paragraphs": [
            "This prototype explores translating EMG gestures into immediate ninja-game actions within a broader set of non-standard-input Unity experiments. The shared work included virtual-device mapping, real-time data paths, reconnect behavior, event deduplication, and keyboard simulation, but the exact subset used by this game is not separately documented."
          ],
          "title": "Known Scope"
        },
        {
          "items": [],
          "paragraphs": [
            "A project-specific interaction map, iteration history, test record, device performance, team structure, and personal contribution breakdown are not currently available. The page therefore presents the concept and preview without inventing a full case-study narrative."
          ],
          "title": "Evidence Boundary"
        }
      ],
      "summaryHtml": "A gesture-driven ninja game prototype exploring how EMG input can translate physical gestures into immediate gameplay actions.",
      "summaryText": "A gesture-driven ninja game prototype exploring how EMG input can translate physical gestures into immediate gameplay actions.",
      "title": "EMG Gesture Ninja",
      "videoSection": null
    },
    "vr-interaction": {
      "file": "project-vrInteraction.html",
      "url": "http://127.0.0.1:4389/project-vrInteraction.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "VR development contributor"
        },
        {
          "label": "Period",
          "value": "December 2025 - January 2026"
        },
        {
          "label": "Format",
          "value": "Team VR interaction project"
        },
        {
          "label": "Status",
          "value": "Implemented; detailed validation pending"
        }
      ],
      "hero": null,
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-emgNinja.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-webxrGallery.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "VR Interaction Project - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "VR movement and drawing interaction",
            "Client-server data exchange",
            "Real-time interaction-state feedback",
            "Judgement and feedback iteration based on user testing"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Improve movement and drawing controllability",
            "Make interaction state visible through timely feedback",
            "Use observed user issues to guide judgement and feedback changes"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [
            "Implemented prototype work and user testing are recorded",
            "Participant count, device validation, protocol details, and before-and-after measures remain unavailable"
          ],
          "paragraphs": [],
          "title": "Validation"
        },
        {
          "items": [],
          "paragraphs": [
            "The work focused on movement, drawing, accidental activation, and controllability in a VR interaction flow that also exchanged data between client and server."
          ],
          "title": "Challenge"
        },
        {
          "items": [],
          "paragraphs": [
            "User testing was used to guide changes to judgment logic and feedback, but the available record does not preserve the exact alternatives, before-and-after error rates, or protocol details."
          ],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [],
          "paragraphs": [
            "The documented contribution includes core gameplay participation, movement and drawing improvements, client/server data exchange, and real-time state feedback. User testing is recorded at resume level; sample, method, device, and detailed results remain pending."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n            <p>This VR development project focused on core gameplay, movement, and drawing interaction. Client-server data exchange supported real-time interaction-state feedback.</p>\n            <p>User testing informed revisions to judgement logic and feedback. The available record confirms participation in implementation and iteration, but the device, protocol, team structure, personal module boundaries, and test details remain pending evidence.</p>\n        ",
      "summaryText": "This VR development project focused on core gameplay, movement, and drawing interaction. Client-server data exchange supported real-time interaction-state feedback. User testing informed revisions to judgement logic and feedback. The available record confirms participation in implementation and iteration, but the device, protocol, team structure, personal module boundaries, and test details remain pending evidence.",
      "title": "VR Interaction Project",
      "videoSection": null
    },
    "webxr-gallery": {
      "file": "project-webxrGallery.html",
      "url": "http://127.0.0.1:4389/project-webxrGallery.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Independent project"
        },
        {
          "label": "Period",
          "value": "February - March 2024"
        },
        {
          "label": "Format",
          "value": "Mobile WebXR gallery prototype"
        },
        {
          "label": "Status",
          "value": "Implemented and playtested; compatibility evidence pending"
        }
      ],
      "hero": null,
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-vrInteraction.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-wearableGame.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "WebXR Multimodal Gallery - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Mobile WebXR gallery prototype",
            "Rotation, gaze, shake, voice, and gesture input",
            "Feedback iteration informed by usability testing"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Choose appropriate modalities for different gallery actions",
            "Reduce input conflict and keep feedback consistent across modalities",
            "Treat mobile compatibility and performance as pending validation rather than assumed support"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [
            "Designed, implemented, and usability-tested personal prototype",
            "Participant count, device matrix, performance results, and detailed findings remain unavailable"
          ],
          "paragraphs": [],
          "title": "Validation"
        },
        {
          "items": [],
          "paragraphs": [
            "Rotation, gaze, shaking, voice, and gesture inputs had to share one mobile WebXR experience without conflicting or producing inconsistent feedback."
          ],
          "title": "Challenge"
        },
        {
          "items": [],
          "paragraphs": [
            "The core design question was when each input mode was appropriate and how feedback should remain coherent across modes. The exact priority and conflict rules are not yet documented."
          ],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [],
          "paragraphs": [
            "Usability testing informed feedback changes, but the participant count, method, findings, technical stack, device coverage, and performance are not available as public evidence."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n            <p>This personal mobile WebXR gallery combines rotation, gaze, shake, voice, and gesture input in one immersive experience. The project explores how several modalities can support a gallery visit without creating conflicting controls or inconsistent feedback.</p>\n            <p>Usability testing informed feedback iteration. The available record confirms the prototype and testing direction, while the technical stack, participant count, compatibility coverage, performance, and detailed conflict rules remain pending evidence.</p>\n        ",
      "summaryText": "This personal mobile WebXR gallery combines rotation, gaze, shake, voice, and gesture input in one immersive experience. The project explores how several modalities can support a gallery visit without creating conflicting controls or inconsistent feedback. Usability testing informed feedback iteration. The available record confirms the prototype and testing direction, while the technical stack, participant count, compatibility coverage, performance, and detailed conflict rules remain pending evidence.",
      "title": "WebXR Multimodal Gallery",
      "videoSection": null
    },
    "wearable-game": {
      "file": "project-wearableGame.html",
      "url": "http://127.0.0.1:4389/project-wearableGame.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Role",
          "value": "Research, product design, and Unity development"
        },
        {
          "label": "Period",
          "value": "September - November 2024"
        },
        {
          "label": "Format",
          "value": "Wearable gamification prototype"
        },
        {
          "label": "Status",
          "value": "Implemented and playtested; detailed evidence pending"
        }
      ],
      "hero": null,
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-webxrGallery.html",
          "label": "Previous project"
        },
        {
          "href": "http://127.0.0.1:4389/creative-site-framework.html",
          "label": "All projects"
        }
      ],
      "pageTitle": "Wearable Game Experience - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Fitness-beginner research translated into product requirements",
            "Level and reward design for a wearable game experience",
            "Real-time feedback concepts implemented in a Unity prototype",
            "User testing used to support iteration"
          ],
          "paragraphs": [],
          "title": "Key Features"
        },
        {
          "items": [
            "Make gamification appropriate for first-time fitness users",
            "Connect research findings to testable levels, rewards, and feedback",
            "Keep unsupported hardware capabilities and behavioural outcomes out of the public claim"
          ],
          "paragraphs": [],
          "title": "Design Focus"
        },
        {
          "items": [
            "Designed, implemented, and user-tested prototype work is recorded",
            "Sample size, test tasks, metrics, hardware details, and quantified outcomes remain unavailable"
          ],
          "paragraphs": [],
          "title": "Validation"
        },
        {
          "items": [],
          "paragraphs": [
            "The project explored how research with fitness beginners could become approachable levels, rewards, and real-time feedback in a wearable experience."
          ],
          "title": "Challenge"
        },
        {
          "items": [],
          "paragraphs": [
            "The design direction connected research insights to game mechanics and wearing experience, then used a Unity prototype for iteration. The specific hardware form, alternatives, and trade-offs are not preserved in the current record."
          ],
          "title": "Key Decisions & Trade-offs"
        },
        {
          "items": [],
          "paragraphs": [
            "User testing and iteration are recorded, but sample size, tasks, metrics, and before-and-after changes are not. Those gaps prevent claims about improved usability or behavior."
          ],
          "title": "Iteration & Verification"
        }
      ],
      "summaryHtml": "\n            <p>This wearable product prototype translated research with fitness beginners into level, reward, and real-time feedback concepts. A Unity prototype made the gamified experience testable.</p>\n            <p>My recorded responsibilities include research analysis, product design, Unity game development, and user-test iteration. Hardware form, sample size, test measures, detailed changes, and individual contribution boundaries remain pending evidence.</p>\n        ",
      "summaryText": "This wearable product prototype translated research with fitness beginners into level, reward, and real-time feedback concepts. A Unity prototype made the gamified experience testable. My recorded responsibilities include research analysis, product design, Unity game development, and user-test iteration. Hardware form, sample size, test measures, detailed changes, and individual contribution boundaries remain pending evidence.",
      "title": "Wearable Game Experience",
      "videoSection": null
    },
    "duck-trombone": {
      "file": "project-duckTrombone.html",
      "url": "http://127.0.0.1:4389/project-duckTrombone.html",
      "actions": [
        {
          "disabled": false,
          "href": "http://127.0.0.1:4389/videos/duck-trombone-full.mp4",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Format",
          "value": "IMU-driven music game prototype"
        },
        {
          "label": "Input",
          "value": "Wrist rotation angle"
        },
        {
          "label": "Output",
          "value": "Musical pitch and trombone control"
        },
        {
          "label": "Evidence",
          "value": "Preview and full prototype video"
        }
      ],
      "hero": {
        "alt": "",
        "ariaLabel": "Duck Trombone Champion preview",
        "autoplay": true,
        "controls": true,
        "loop": true,
        "muted": true,
        "poster": "assets/duck-trombone-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/duck-trombone-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "http://127.0.0.1:4389/project-catTeaser.html",
          "label": "Previous project"
        },
        {
          "href": "",
          "label": "All projects"
        },
        {
          "href": "http://127.0.0.1:4389/project-handInputClaw.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Duck Trombone Champion - RuyanQin",
      "projectClass": "project-content",
      "sections": [],
      "summaryHtml": "<p>An IMU-driven music game prototype that maps wrist rotation angle to musical pitch, turning wrist movement into direct trombone control.</p>",
      "summaryText": "An IMU-driven music game prototype that maps wrist rotation angle to musical pitch, turning wrist movement into direct trombone control.",
      "title": "Duck Trombone Champion",
      "videoSection": {
        "ariaLabel": "Duck Trombone Champion full prototype video",
        "poster": "assets/duck-trombone-poster.jpg",
        "src": "http://127.0.0.1:4389/videos/duck-trombone-full.mp4",
        "title": "Full Prototype Video"
      }
    },
    "cascadeur": {
      "file": "project-cascadeur.html",
      "url": "../project-cascadeur.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Format",
          "value": "Video-based motion capture practice"
        },
        {
          "label": "Tool",
          "value": "Cascadeur"
        },
        {
          "label": "Focus",
          "value": "Recorded movement to editable character animation"
        }
      ],
      "hero": {
        "alt": "Cascadeur workspace showing video-based motion capture applied to a character",
        "ariaLabel": "Cascadeur video-based motion capture practice",
        "autoplay": false,
        "controls": true,
        "loop": false,
        "muted": false,
        "poster": "../images/cascadeur-cover.png",
        "src": "../videos/cascadeur.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "project-emotionalMask.html",
          "label": "Previous project"
        },
        {
          "href": "",
          "label": "All projects"
        },
        {
          "href": "project-ueVfx.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Cascadeur Motion Capture - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Using recorded video as the motion reference",
            "Reviewing captured movement on a 3D character",
            "Refining poses and timing in Cascadeur"
          ],
          "paragraphs": [],
          "title": "Practice Focus"
        }
      ],
      "summaryHtml": "<p>A video-based motion capture exercise in Cascadeur, exploring how recorded movement can be translated into editable character animation.</p><p>The practice focused on reviewing the captured motion against the source video, then refining poses and timing on the animation timeline.</p>",
      "summaryText": "A video-based motion capture exercise in Cascadeur, exploring how recorded movement can be translated into editable character animation. The practice focused on reviewing the captured motion against the source video, then refining poses and timing on the animation timeline.",
      "title": "Cascadeur Motion Capture"
    },
    "ue-vfx": {
      "file": "project-ueVfx.html",
      "url": "../project-ueVfx.html",
      "actions": [
        {
          "disabled": true,
          "href": "",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Format",
          "value": "Real-time VFX practice"
        },
        {
          "label": "Tool",
          "value": "Unreal Engine"
        },
        {
          "label": "Focus",
          "value": "Motion, lighting, water, and scene scale"
        }
      ],
      "hero": {
        "alt": "Unreal Engine scene showing a real-time VFX practice over a reflective water environment",
        "ariaLabel": "Unreal Engine real-time VFX practice",
        "autoplay": false,
        "controls": true,
        "loop": false,
        "muted": false,
        "poster": "../images/ue-vfx-cover.png",
        "src": "../videos/ue-vfx.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "project-cascadeur.html",
          "label": "Previous project"
        },
        {
          "href": "",
          "label": "All projects"
        },
        {
          "href": "project-afterClass.html",
          "label": "Next project"
        }
      ],
      "pageTitle": "Unreal Engine VFX Practice - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Building and reviewing a real-time effect in Unreal Engine",
            "Testing the effect within an environmental scene",
            "Evaluating motion, scale, and visual readability during runtime"
          ],
          "paragraphs": [],
          "title": "Practice Focus"
        }
      ],
      "summaryHtml": "<p>A real-time VFX practice piece created as part of my Unreal Engine learning.</p><p>The exercise focused on testing how the effect reads in motion and against the lighting, water, and scale of the surrounding scene.</p>",
      "summaryText": "A real-time VFX practice piece created as part of my Unreal Engine learning. The exercise focused on testing how the effect reads in motion and against the lighting, water, and scale of the surrounding scene.",
      "title": "Unreal Engine VFX Practice"
    },
    "after-class": {
      "file": "project-afterClass.html",
      "url": "../project-afterClass.html",
      "actions": [
        {
          "disabled": false,
          "href": "https://www.youtube.com/watch?v=275NSp7rIuA",
          "label": "Watch Full Video"
        },
        {
          "disabled": true,
          "href": "",
          "label": "Try Live Demo"
        }
      ],
      "extraImages": [],
      "facts": [
        {
          "label": "Format",
          "value": "Immersive escape room"
        },
        {
          "label": "Interaction",
          "value": "RFID, dual projection, physical puzzles"
        },
        {
          "label": "Evidence",
          "value": "Team assignment report dated 24 June 2026"
        }
      ],
      "hero": {
        "alt": "After Class escape room showing projected ghost imagery inside a dark classroom",
        "ariaLabel": "Muted After Class escape room preview",
        "autoplay": true,
        "controls": true,
        "loop": true,
        "muted": true,
        "poster": "../images/after-class-cover.png",
        "src": "../videos/after-class-preview.mp4",
        "tag": "video"
      },
      "nav": [
        {
          "href": "project-ueVfx.html",
          "label": "Previous project"
        },
        {
          "href": "",
          "label": "All projects"
        }
      ],
      "pageTitle": "After Class - RuyanQin",
      "projectClass": "project-content",
      "sections": [
        {
          "items": [
            "Three schoolbags created a linear puzzle flow, revealing the story in a controlled sequence",
            "An answer sheet gave players a continuous goal while they identified the student, cause of death, and time of death",
            "UV clues, diaries, a body model, ritual objects, and medication connected physical puzzles to narrative information",
            "The Stage 1 ritual transformed the classroom through wall and desk projections"
          ],
          "paragraphs": [],
          "title": "Experience Design"
        },
        {
          "items": [
            "Unity delivered the 3D animated wall projection",
            "Python with Py5 powered the 2D Die Xian desk projection",
            "RFID cards embedded in four key props triggered video and animation sequences",
            "COGS coordinated game state, sensor input, and projection output, with Media Master supporting the wireless projector connection"
          ],
          "paragraphs": [],
          "title": "Technical System"
        },
        {
          "items": [
            "Supported projector testing and technical setup",
            "Tested the software flow and trigger sequence",
            "Produced the Stage 1 digital-number puzzle cards"
          ],
          "paragraphs": [],
          "title": "My Contribution"
        },
        {
          "items": [
            "Redesigned the opening puzzle to connect it more strongly to the narrative",
            "Strengthened visual cues between stages",
            "Added UV-highlighted ritual instructions so critical steps were harder to miss",
            "Introduced a staff hint system for the final showcase"
          ],
          "paragraphs": [
            "A seven-person playtest compared three game-design students with four participants from other disciplines. The first group completed the experience in roughly 30-40 minutes, while the second took about one hour and needed clearer guidance."
          ],
          "title": "Testing and Iteration"
        },
        {
          "items": [
            "Eight groups of three to five players took part",
            "Approximately half completed the full experience within the extended 50-minute allowance",
            "The ordinary-to-horror atmosphere shift and RFID-triggered projections received the strongest positive responses",
            "Remaining issues included puzzle clarity, colour visibility in low light, and unclear links between narrative clues and number sequences"
          ],
          "paragraphs": [
            "Project details and results are based on the team's assignment report dated 24 June 2026."
          ],
          "title": "Showcase Results"
        }
      ],
      "summaryHtml": "<p>After Class is a single-room immersive escape room built around Die Xian, a Taiwanese folkloric ritual for communicating with spirits. Players enter an ordinary classroom and reconstruct the story of a deceased student through sequential puzzles, physical props, diaries, and projected narrative.</p><p>The experience was designed as a two-phase emotional arc: a familiar classroom gradually becomes an uncanny horror environment, while the ghost story reveals an underlying narrative about school bullying and its consequences.</p>",
      "summaryText": "After Class is a single-room immersive escape room built around Die Xian, a Taiwanese folkloric ritual for communicating with spirits. Players enter an ordinary classroom and reconstruct the story of a deceased student through sequential puzzles, physical props, diaries, and projected narrative. The experience was designed as a two-phase emotional arc: a familiar classroom gradually becomes an uncanny horror environment, while the ghost story reveals an underlying narrative about school bullying and its consequences.",
      "title": "After Class",
      "videoSection": {
        "embed": "https://www.youtube.com/embed/275NSp7rIuA",
        "title": "Project Video",
        "watch": "https://www.youtube.com/watch?v=275NSp7rIuA"
      }
    }
  }
};
