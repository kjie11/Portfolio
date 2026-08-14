(function () {
    const cases = {
        "project-catTeaser.html": {
            facts: [["Role", "Interaction design and Unity prototyping"], ["Period", "July 2026 - present"], ["Format", "2D embodied-input prototype"], ["Status", "Implemented and automated-tested; device validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The interaction had to preserve rope inertia without becoming uncontrollable, while the cats needed to feel readable and still be able to miss. The same rules also had to work through mouse and wearable input without stale network samples taking control."] },
                { title: "Key Decisions & Trade-offs", items: ["Control the handle rather than the feather so force travels through the rope.", "Lock a cat's target at take-off; this sacrifices mid-air tracking but creates genuine anticipation and missed catches.", "Use a tunable custom rope model for controllable inertia, accepting more implementation work than a simple joint chain.", "Move from a complex IMU-ray mapping to absolute pointer coordinates once the middleware could provide them, reducing the data path in exchange for less posture information."] },
                { title: "Iteration & Verification", paragraphs: ["The prototype grew from one cat chasing a feather into two cats, fish and bird targets, and three progressive scenarios. The hardware path also changed after geometry checks showed that a moving projection plane could prevent the intended cursor movement."], items: ["Documented checks include 29 EditMode tests, 4 focused PlayMode input tests, and 42 middleware tests.", "Real wristband feel, end-to-end latency, resolution coverage, and the full PlayMode suite remain open validation work."] },
                { title: "Current Status", paragraphs: ["The multi-target interaction and shared mouse/wearable path are implemented as a testable prototype. It should not yet be presented as a fully device-validated experience."] }
            ]
        },
        "project-moleRhythm.html": {
            facts: [["Role", "Interaction design and Unity prototyping"], ["Period", "July 2026 - present"], ["Format", "Five-lane rhythm prototype"], ["Status", "Implemented and automated-tested; glove validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["A five-finger rhythm game needed charts that felt musical while remaining approachable for exhibition newcomers. The available audio did not support the original multi-stem and MIDI concept, and automatic generation had to avoid overloading weaker fingers or creating excessive simultaneous hits."] },
                { title: "Key Decisions & Trade-offs", items: ["Reduced a complex multi-stem pitch-control concept to one main track, visual judgment, offline Librosa analysis, and deterministic JSON charts.", "Kept the Normal chart untouched and generated Easy and Very Easy variants in the import layer.", "Used absolute DSP time for judgment so chart timing remains independent of frame rate.", "The simpler audio structure gives up some live musical control but better fits the available material, exhibition setup, and repeatable testing."] },
                { title: "Iteration & Verification", paragraphs: ["The workflow connects offline beat analysis, ergonomic lane assignment, Unity import, timing judgment, and visual feedback. Later passes added independent hammer strikes, hit bursts, and sparser difficulty variants."], items: ["Normal contains 106 events; Easy contains 53 events, 58 actions, and 5 simultaneous pairs.", "Focused records show 10 EditMode and 1 PlayMode chart/judgment tests passing; later feedback work recorded up to 17 EditMode and 3 PlayMode tests.", "Real glove false triggers, device/audio offset calibration, and the complete PlayMode suite remain pending."] },
                { title: "Current Status", paragraphs: ["The deterministic chart pipeline and multiple difficulty levels are implemented. Precise event timestamps, separate keyboard/glove calibration, and graded Perfect/Good feedback are still follow-up work."] }
            ]
        },
        "project-handInputClaw.html": {
            facts: [["Role", "Interaction design and Unity prototyping"], ["Period", "July 2026 - present"], ["Format", "3D embodied-input game prototype"], ["Status", "Implemented and automated-tested; real-device tuning pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The player must position the claw with one hand while maintaining a learnable grip-force window with the other. Animation, physics, failure drops, and lingering hardware input all had to resolve into a believable and recoverable state."] },
                { title: "Key Decisions & Trade-offs", items: ["Split spatial positioning and grip control across two hands instead of reproducing a joystick-and-button machine.", "Give each prize a configurable force profile rather than one universal threshold.", "Let failed prizes fall from their current location and recover independently instead of snapping to their origin.", "Keep deformation visual while leaving colliders stable, trading strict physical deformation for predictable performance.", "Validate the full loop with keyboard simulation before drawing conclusions about real-device feel."] },
                { title: "Iteration & Verification", paragraphs: ["The initial hardware-angle and pinch concept became a state machine covering start, sustained force, out-of-range timing, voluntary release, automatic drop-off, and reason-specific recovery."], items: ["Focused EditMode and PlayMode checks cover force windows, timer reset, voluntary release, and failure recovery.", "A restored hardware-input scene loads in Unity with the claw, gesture/grip controllers, and input mode intact.", "A formal practice scene, complete result feedback, prize reset, and real two-hand tuning remain pending."] },
                { title: "Current Status", paragraphs: ["The configurable force-window loop and unified future hardware interface are in place. Simulation results are not presented as proof of real-device comfort or accuracy."] }
            ]
        },
        "project-fourWayKitchen.html": {
            facts: [["Role", "Interaction design and Unity prototyping"], ["Period", "July 2026 - present"], ["Format", "Embodied cooking-game prototype"], ["Status", "Implemented and compiled; full device playthrough pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The cooking loop had to accept continuous pointers and discrete gestures from keyboard, EMG, camera, and glove paths without rewriting gameplay for each device. Disconnects, stale samples, hand assignment, and diagonal intent were experience problems as much as protocol problems."] },
                { title: "Key Decisions & Trade-offs", items: ["Keep high-level actions stable: move or drag, pick or place, cut, and throw in four directions.", "Assign continuous spatial control to the left hand and discrete actions to the right.", "Let the bridge emit a native pointer, pass it through unchanged, and interpret the same x, y, and pressed contract in Unity.", "Apply diagonal-intent assistance only to the glove path so mouse and camera behavior remain unchanged.", "Accept a mixed pointer-plus-gesture protocol to preserve both continuous and discrete control."] },
                { title: "Iteration & Verification", paragraphs: ["The input path progressed from keyboard graybox to discrete events, camera gestures, glove bridge, native pointer, and a shared middleware layer. Fail-safe release, FIFO handling, calibration, and diagnostics were added as integration issues appeared."], items: ["Core food processing, cooking, plating, orders, and deterministic throwing are connected to the multi-input architecture.", "Bridge, middleware, and Unity pointer paths have code, compile, prefab, and serialized-reference checks.", "A complete real two-hand Play Mode run, camera performance, and a Windows development build remain pending."] },
                { title: "Current Status", paragraphs: ["Multiple inputs now reach one gameplay vocabulary and expose useful diagnostics. The project remains a prototype until the complete kitchen loop is verified with real devices."] }
            ]
        },
        "project-pizzaDelivery.html": {
            facts: [["Role", "Game design and Unity development"], ["Period", "May - July 2026"], ["Platform", "Unity WebGL"], ["Status", "Released prototype with three recorded test rounds"]],
            sections: [
                { title: "Project Boundaries", paragraphs: ["The recorded playtime trend supports a story of iterative improvement across versions, but it does not prove that any single design change caused the increase. Round-by-round retention, completion rate, and the original 44-second baseline dashboard are not available."] }
            ]
        },
        "project-ARGraffiti.html": {
            sections: [
                { title: "Challenge", paragraphs: ["The prototype needed two comparable creation modes so observed behavior and stated preference could be studied without changing the underlying task more than necessary. The detailed research question, hypotheses, measures, and statistical findings are not yet available for publication."] },
                { title: "Key Work", items: ["Built comparable 2D and 3D AR creation modes for Meta Quest 3.", "Implemented spraying, path drawing, dragging, and scaling interactions.", "Designed and conducted questionnaires and interviews with 18 participants.", "Used the study as input to later interaction priorities while keeping unverified findings out of the public narrative."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["Treating the creation mode as the comparison variable created a clearer research structure, but it also required careful consistency across tasks and controls. The current evidence supports the study setup and participant count, not a claim about which mode performed better."] },
                { title: "Current Status", paragraphs: ["Both modes were implemented and playtested. Detailed findings, analysis methods, and the final change set remain pending evidence."] }
            ]
        },
        "project-detail.html": {
            facts: [["Role", "Independent design and development"], ["Period", "February 2026"], ["Format", "Experimental VR horror prototype"], ["Status", "Designed; runtime and user validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["Abyss explores whether hand-driven locomotion, spatial audio, and triggered environmental storytelling can serve a feeling of scale and fear. The central design task was to make body movement support the emotional goal rather than function as a detached control novelty."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["The concept places embodied movement at the center of the experience and uses environmental scale and audio as supporting systems. Precise gesture mappings, comfort safeguards, and locomotion alternatives still need project-level documentation before stronger claims can be made."] },
                { title: "Current Status", paragraphs: ["This is an independently designed experimental prototype. The device, tracking method, runtime state, performance, and user-test outcomes are not yet documented, so the page intentionally avoids claims about comfort, accuracy, or validated immersion."] }
            ]
        },
        "project-gothicHunter.html": {
            facts: [["Role", "Gameplay design and Godot prototyping"], ["Period", "August 2026 prototype record"], ["Format", "Top-down survival graybox"], ["Status", "Runtime-verified graybox; balance and hardware validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The project started from a near-empty Godot codebase and needed a complete, inspectable run under a fixed enemy budget. The work combined pacing, weapon growth, directional input, crowded-scene readability, and verification in an unfamiliar engine workflow."] },
                { title: "Key Decisions & Trade-offs", items: ["Front-load input abstraction and object pooling so the core loop can scale before hardware integration.", "Use procedural visuals and temporary audio to validate play before committing to final assets.", "Reduce a four-direction expanding attack to fixed-size vertical slashes, sacrificing freedom for a clearer relationship between gesture and trajectory.", "Reuse and rig the existing enemy artwork instead of generating replacement assets.", "Treat compilation as one checkpoint, then use runtime capture and review for experiential issues."] },
                { title: "Iteration & Verification", paragraphs: ["The graybox moved through implementation, headless checks, windowed review, recorded playback, pacing changes, directional-skill refinement, skeletal walk-cycle fixes, and stress tests."], items: ["The main graybox has an 18-second runtime proof plus structural, phase, upgrade, and pacing checks.", "A 450-frame directional-skill capture verifies ignored horizontal input and vertical trajectories.", "A 180-enemy stress test recorded 238.3 FPS in its test environment; this is not target-hardware profiling.", "A user run ended around two minutes while the automated run reached about 4:51, so balance remains unresolved."] },
                { title: "Current Status", paragraphs: ["The project is a playable, runtime-verified graybox, not a finished or balanced release. Final art, audio, real glove input, target-hardware profiling, and broader player testing remain future work."] }
            ]
        },
        "project-speakingWorld.html": {
            facts: [["Role", "Independent design and development"], ["Period", "October 2025"], ["Format", "AR and conversational-interaction prototype"], ["Status", "Designed; technical and user validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The concept connects object recognition, conversation, voice feedback, and AR drawing into one continuous encounter with a personified real-world object. The main risk is not any individual feature, but the continuity and recovery of the full interaction chain."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["The experience was framed as a characterful object encounter rather than a separate chat interface. Model and API choices, context rules, latency, safety behavior, and fallback states are not documented, so the page does not imply model training or production AI engineering."] },
                { title: "Current Status", paragraphs: ["The experience concept and prototype scope are established. Recognition accuracy, dialogue quality, response time, failure recovery, and user feedback still need project-level evidence."] }
            ]
        },
        "project-plantBot.html": {
            facts: [["Role", "Interaction design and Arduino development"], ["Period", "May 2026"], ["Format", "Physical-computing and AR prototype"], ["Status", "Physical prototype completed; user and AR validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["Plant Bot turns environmental readings that are difficult to interpret into emotional states, care prompts, and contextual AR feedback. The challenge was to connect research, electronics, fabrication, communication, and interface design into one understandable experience."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["The design interprets four categories of environmental data through six states and actionable care cues rather than presenting raw readings alone. The detailed mapping rules and their effect on user understanding still require evidence."] },
                { title: "Iteration & Verification", items: ["Work covered user research, function definition, information architecture, sensors and circuitry, PCB work and soldering, communication, 3D modeling and printing, and Unity/AR integration.", "A physical prototype was completed.", "Sensor accuracy, data-path reliability, user comprehension, AR runtime behavior, and any autonomous movement are not validated claims."] },
                { title: "Current Status", paragraphs: ["The cross-device prototype is physically assembled. It remains pending user and AR runtime validation, and is presented as an interaction prototype rather than an autonomous robotics system."] }
            ]
        },
        "project-AREscapeRoom.html": {
            facts: [["Role", "Design, development, and project management"], ["Period", "November - December 2025"], ["Format", "Team AR escape-room prototype"], ["Status", "Implemented; device and user validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The project had to combine several unlike AR interactions into a puzzle flow that remained understandable and stable: clues in the physical space, virtual window wiping, handwriting input, and QR-triggered events."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["The experience was organized around interactions with the real room rather than isolated digital mini-games. Requirements were decomposed into modules, scheduled, integrated, and debugged as one system; the exact module priorities and rejected alternatives are not yet documented."] },
                { title: "Iteration & Verification", paragraphs: ["The recorded process covers concept development, requirement breakdown, progress management, module implementation, integration, and debugging. A repository exists, but device details, stability criteria, and user-test results are still missing."] },
                { title: "Current Status", paragraphs: ["The team delivered an integrated AR escape-room prototype. Integration responsibility does not imply that every module was individually authored, and the personal code share remains to be documented."] }
            ]
        },
        "project-vrInteraction.html": {
            facts: [["Role", "VR development contributor"], ["Period", "December 2025 - January 2026"], ["Format", "Team VR interaction project"], ["Status", "Implemented; detailed validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The work focused on movement, drawing, accidental activation, and controllability in a VR interaction flow that also exchanged data between client and server."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["User testing was used to guide changes to judgment logic and feedback, but the available record does not preserve the exact alternatives, before-and-after error rates, or protocol details."] },
                { title: "Iteration & Verification", paragraphs: ["The documented contribution includes core gameplay participation, movement and drawing improvements, client/server data exchange, and real-time state feedback. User testing is recorded at resume level; sample, method, device, and detailed results remain pending."] },
                { title: "Current Status", paragraphs: ["This was a team project and the role is presented as a contributor role. The page does not claim sole ownership or quantified improvement without supporting evidence."] }
            ]
        },
        "project-emotionalMask.html": {
            facts: [["Role", "Game Jam team member"], ["Period", "February 2026"], ["Format", "VR Game Jam prototype"], ["Status", "Implemented; completion and playtest evidence pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["Within a time-limited Game Jam, gesture triggers, level progression, and narrative interactions had to converge into a playable VR build. Scope control and integration were as important as the individual mechanics."] },
                { title: "Key Work", items: ["Implemented gesture-triggered mechanics tied to the level flow.", "Contributed level logic and narrative interaction content.", "Worked within a team delivery context and a compressed prototype schedule."] },
                { title: "Current Status", paragraphs: ["A repository and implemented interaction scope are recorded, but Jam duration, team size, individual module boundaries, final completion level, and playtest feedback remain undocumented. This page therefore avoids presenting the team result as a solo project."] }
            ]
        },
        "project-wearableGame.html": {
            facts: [["Role", "Research, product design, and Unity development"], ["Period", "September - November 2024"], ["Format", "Wearable gamification prototype"], ["Status", "Implemented and playtested; detailed evidence pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["The project explored how research with fitness beginners could become approachable levels, rewards, and real-time feedback in a wearable experience."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["The design direction connected research insights to game mechanics and wearing experience, then used a Unity prototype for iteration. The specific hardware form, alternatives, and trade-offs are not preserved in the current record."] },
                { title: "Iteration & Verification", paragraphs: ["User testing and iteration are recorded, but sample size, tasks, metrics, and before-and-after changes are not. Those gaps prevent claims about improved usability or behavior."] },
                { title: "Current Status", paragraphs: ["The result is presented as a tested prototype with limited evidence, not as a validated fitness product or a completed wearable device."] }
            ]
        },
        "project-webxrGallery.html": {
            facts: [["Role", "Independent project"], ["Period", "February - March 2024"], ["Format", "Mobile WebXR gallery prototype"], ["Status", "Implemented and playtested; compatibility evidence pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["Rotation, gaze, shaking, voice, and gesture inputs had to share one mobile WebXR experience without conflicting or producing inconsistent feedback."] },
                { title: "Key Decisions & Trade-offs", paragraphs: ["The core design question was when each input mode was appropriate and how feedback should remain coherent across modes. The exact priority and conflict rules are not yet documented."] },
                { title: "Iteration & Verification", paragraphs: ["Usability testing informed feedback changes, but the participant count, method, findings, technical stack, device coverage, and performance are not available as public evidence."] },
                { title: "Current Status", paragraphs: ["The independently built mobile WebXR prototype demonstrates a multimodal direction. It should not yet be described as broadly compatible or as having every input mode equally stable."] }
            ]
        },
        "project-neonBeatRunner.html": {
            facts: [["Role", "Gameplay concept and Godot prototyping"], ["Period", "August 2026 prototype record"], ["Format", "Rhythm platformer prototype"], ["Status", "Runtime-verified with demo audio; player validation pending"]],
            sections: [
                { title: "Challenge", paragraphs: ["Audio analysis can supply a rhythmic skeleton, but directly turning every onset into an enemy or jump produces conflicts and unreachable layouts. Movement and judgment also needed to remain tied to song time rather than drifting with frame rate."] },
                { title: "Key Decisions & Trade-offs", items: ["Separate audio analysis, gameplay orchestration, and runtime presentation.", "Use timestamps for rhythm judgment and collisions only for spatial feedback.", "Limit consecutive jumps, conflicting actions, and event density in the orchestration layer.", "Use self-contained procedural visuals when final art was unavailable, keeping the gameplay prototype moving without treating those visuals as final production art."] },
                { title: "Iteration & Verification", paragraphs: ["The workflow moved from reference analysis to a Godot/Python prototype, demo audio, deterministic chart generation, strict-type fixes, recorded review, and a second orchestration pass after the first chart produced too few jumps."], items: ["The demo WAV was measured at about 117.45 BPM and generated 44 events.", "Two chart generations produced the same SHA-256; the final demo distribution is 33 combat events and 11 jumps.", "Godot completed import checks, a 240-frame headless run, and a 1280×720 capture."] },
                { title: "Current Status", paragraphs: ["The time-driven prototype and replaceable-WAV pipeline run with demo material. Final audio, human playtesting, reachability tuning, latency calibration, formal visual assets, and an editor remain open."] }
            ]
        },
        "project-emgNinja.html": {
            facts: [["Role", "Unity real-time interaction development"], ["Format", "EMG gesture prototype"], ["Evidence", "Umbrella project record only"], ["Status", "Prototype scope recorded; detailed validation unavailable"]],
            sections: [
                { title: "Known Scope", paragraphs: ["This prototype explores translating EMG gestures into immediate ninja-game actions within a broader set of non-standard-input Unity experiments. The shared work included virtual-device mapping, real-time data paths, reconnect behavior, event deduplication, and keyboard simulation, but the exact subset used by this game is not separately documented."] },
                { title: "Evidence Boundary", paragraphs: ["A project-specific interaction map, iteration history, test record, device performance, team structure, and personal contribution breakdown are not currently available. The page therefore presents the concept and preview without inventing a full case-study narrative."] }
            ]
        },
        "project-magicBus.html": {
            facts: [["Format", "Gameplay prototype"], ["Available evidence", "Preview and public video"], ["Status", "Detailed project record pending"]],
            sections: [
                { title: "Known Scope", paragraphs: ["The available portfolio material confirms a Magic Bus gameplay preview and linked project video. A reliable record of the role, goals, systems, process, and validation has not yet been located."] },
                { title: "Evidence Boundary", paragraphs: ["Until a project description or repository record is added, this page intentionally avoids attributing specific mechanics, outcomes, tools, or authorship. The video remains the primary evidence."] }
            ]
        },
        "project-whiteLavender.html": {
            facts: [["Format", "Game-remake practice"], ["Visible scope", "Combat, UI, and dialogue systems"], ["Status", "Technical practice; validation record pending"]],
            sections: [
                { title: "Known Scope", paragraphs: ["This practice project recreates selected mechanics from White Lavender, with the current page showing combat, UI, and dialogue systems as the visible scope."] },
                { title: "Evidence Boundary", paragraphs: ["The available record does not yet establish the implementation process, degree of fidelity, tools, validation, asset sources, or learning outcomes. These details are left unstated rather than reconstructed from the reference game."] }
            ]
        }
    };

    const fileName = decodeURIComponent(window.location.pathname.split("/").pop());
    const data = cases[fileName];
    if (!data) return;

    const project = document.querySelector(".project-content");
    if (!project) return;

    let details = project.querySelector(".project-details");
    if (!details) {
        details = document.createElement("div");
        details.className = "project-details";
        project.append(details);
    }

    const existingTitles = new Set(Array.from(details.querySelectorAll("h2, h3"), (heading) => heading.textContent.trim().toLowerCase()));
    const isCaseStudy = project.classList.contains("case-study");
    const headingTag = isCaseStudy ? "h2" : "h3";

    if (data.facts && !project.querySelector(".case-facts, .case-fact-strip")) {
        const facts = document.createElement("dl");
        facts.className = "case-fact-strip";
        facts.setAttribute("aria-label", "Project facts");
        data.facts.forEach(([label, value]) => {
            const item = document.createElement("div");
            item.className = "case-fact-strip__item";
            const term = document.createElement("dt");
            term.textContent = label;
            const description = document.createElement("dd");
            description.textContent = value;
            item.append(term, description);
            facts.append(item);
        });
        details.prepend(facts);
    }

    const factsHost = project.querySelector(".case-facts, .case-fact-strip");
    if (factsHost && !project.querySelector(".detail-actions")) {
        const youtubeLink = project.querySelector('a[href*="youtube.com/watch"]');
        const youtubeFrame = project.querySelector('iframe[src*="youtube.com/embed/"]');
        const youtubeId = youtubeFrame ? new URL(youtubeFrame.src).pathname.split("/").pop() : "";
        const youtubeHref = youtubeLink?.href || (youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : "");
        const demoLink = project.querySelector("a[data-live-demo], a[href*='itch.io'], a[href*='poki.com']");
        const demoHref = project.dataset.liveDemoUrl || demoLink?.href || "";
        const actions = document.createElement("div");
        actions.className = "detail-actions";
        actions.setAttribute("aria-label", "Project links");

        [["Watch Full Video", youtubeHref, ""], ["Try Live Demo", demoHref, "detail-action--secondary"]].forEach(([label, href, modifier]) => {
            const action = document.createElement(href ? "a" : "button");
            action.className = `detail-action ${modifier}`.trim();
            action.textContent = label;
            if (href) {
                action.href = href;
                action.target = "_blank";
                action.rel = "noopener noreferrer";
            } else {
                action.type = "button";
                action.disabled = true;
                action.title = "Link coming soon";
            }
            actions.append(action);
        });

        if (factsHost.classList.contains("case-facts")) factsHost.append(actions);
        else factsHost.after(actions);
    }

    data.sections
        .filter((section) => section.title !== "Current Status")
        .filter((section) => fileName !== "project-ARGraffiti.html" || section.title !== "Key Decisions & Trade-offs")
        .forEach((section) => {
            if (existingTitles.has(section.title.toLowerCase())) return;

            const wrapper = document.createElement("section");
            wrapper.className = "case-module";
            const heading = document.createElement(headingTag);
            heading.textContent = section.title;
            wrapper.append(heading);

            (section.paragraphs || []).forEach((text) => {
                const paragraph = document.createElement("p");
                paragraph.textContent = text;
                wrapper.append(paragraph);
            });

            if (section.items) {
                const list = document.createElement("ul");
                section.items.forEach((text) => {
                    const item = document.createElement("li");
                    item.textContent = text;
                    list.append(item);
                });
                wrapper.append(list);
            }

            details.append(wrapper);
        });
})();
