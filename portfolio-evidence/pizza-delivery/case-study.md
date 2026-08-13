# Pizza Delivery

For browser-game players, I reshaped a delivery prototype through documented playtest and mentor feedback, while three completed Poki versions recorded average playtimes of 1:14, 1:46, and 1:53. [DOC-004, DOC-005, DOC-006, DOC-007]

## Overview

Pizza Delivery is a casual Unity WebGL driving game developed during my internship at Dream Reality Interactive. I designed and built the tutorial and first level around pickup, delivery, reward, repair, vehicle, and area-unlock progression. [DOC-001, DOC-002, DOC-005]

## Problem

Early playtests showed players leaving before they experienced the complete delivery loop. The records identify several recurring sources of friction: difficult steering, too many road obstacles, cars becoming stuck on buildings or missing colliders, players overlooking WASD and Shift controls, and a growing stack of HUD elements and tutorial pop-ups. The challenge was to make the next action obvious without interrupting a short web-game session. [DOC-005, DOC-006, DOC-007]

## Process

### System foundation and Poki release

The early design work established timed delivery rewards, collision and zombie damage, repair costs, vehicle durability and capacity, garage progression, and paid zone unlocks. The prototype was integrated with the Poki SDK and prepared for repeatable WebGL testing. [DOC-002, DOC-005]

### First playtest response

Week 8 notes recorded difficult handling, excessive obstacles, a shop UI that could not be closed, zombies spawning too close to the start, and players missing both keyboard movement and the Shift boost. The associated improvement list prioritized arrow visibility, obstacle removal, collider and pause-menu fixes, a short untimed first delivery, and visual-first tutorial cues. [DOC-005, DOC-007]

### Progression and feedback pass

The next documented build introduced Normal, Rush, and VIP orders in stages, zone-specific delivery pools, elevation changes, damage states, goal and countdown feedback, and onboarding for the garage and area progression. Orders 1–3 remained simple before timed and higher-value variants entered the pool. [DOC-005, DOC-007]

### Simplification after mentor review

A later mentor review found the initial screen crowded: health information repeated, objective and timer UI were separated, and Garage and Zone controls appeared before they were relevant. The same review flagged steering jitter and a 50–60 MB build. The Week 10 record then shows a simplification pass: the landing and Start screens were removed, character and pop-up tutorials were cut, duplicate damage and delivery pop-ups were removed, and arrows and key prompts were placed beside the car. The stage mapping is reconstructed from the documented feature states rather than an explicit date on the feedback file. [DOC-005, DOC-006]

### Remaining problem

The latest retained playtest notes still show players reaching for arrow keys and occasionally missing the Shift prompt. Control discoverability therefore remained an open issue rather than a solved claim. [DOC-005]

## Key Work

- Converted recurring playtest friction into release priorities
- Designed staged Normal, Rush, and VIP order progression
- Connected deliveries to repairs, vehicles, and zone unlocks
- Simplified onboarding after UI overload surfaced in testing
- Prepared repeatable Poki and itch.io WebGL releases

## Solution

The resulting prototype taught driving through a short first delivery, introduced order complexity gradually, and connected each completed job to cash, repair, vehicle, and zone progression. In-world arrows, nearby key prompts, audio, particles, and camera feedback carried essential information after redundant screens and pop-ups were removed. [DOC-002, DOC-005, DOC-006, DOC-007]

## Results

Three completed Poki rounds recorded 500 gameplays each. The dashboard directly confirms average playtimes of 1:14, 1:46, and 1:53 for the completed versions. A retained project summary records an earlier 44-second baseline, making the final result approximately 157% higher, but that baseline is not visible in the supplied dashboard. The evidence does not attribute the metric change to any single design decision. [DOC-001, DOC-003, DOC-004]

## Learnings

The most useful reversal was learning that more explanation did not necessarily produce more clarity. One pass added tutorials and pop-ups; the following pass removed most of them and brought essential cues into the play space. The written feedback trail also made unresolved issues visible, preventing a rising aggregate metric from being presented as proof that every usability problem had been solved. [DOC-005, DOC-006]

## Visual Evidence

- `assets/gameplay.png`: runtime driving and delivery UI. [IMAGE-001]
- `assets/poki-iteration-dashboard.png`: version-level gameplay count and average-playtime comparison. [DOC-004]
