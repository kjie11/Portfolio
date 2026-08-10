---
name: Dual Portfolio System
description: Two independent portfolio worlds built from one verified project truth.
colors:
  technical-paper: "#f2f1ed"
  technical-ink: "#181916"
  technical-muted: "#696a65"
  technical-line: "#c9c9c2"
  calibration-yellow: "#e8ba19"
  creative-paper: "#f1eee7"
  creative-ink: "#171715"
  gallery-red: "#dc4c34"
  process-blue: "#4a79a8"
  marker-yellow: "#e3bc3c"
typography:
  display:
    fontFamily: "Noto Sans SC, Arial, sans-serif"
    fontSize: "clamp(42px, 7vw, 96px)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "0"
  body:
    fontFamily: "Noto Sans SC, Arial, sans-serif"
    fontSize: "clamp(16px, 1.4vw, 22px)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  measurement:
    fontFamily: "IBM Plex Mono, DM Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  none: "0"
spacing:
  compact: "12px"
  standard: "28px"
  section: "100px"
components:
  technical-project-row:
    backgroundColor: "{colors.technical-paper}"
    textColor: "{colors.technical-ink}"
    rounded: "{rounded.none}"
    padding: "28px 0"
  creative-polaroid:
    backgroundColor: "#f8f5ed"
    textColor: "{colors.creative-ink}"
    rounded: "{rounded.none}"
    padding: "12px 12px 0"
---

# Design System: Dual Portfolio System

## Overview

**Creative North Star: "Calibration Bench / Moving Contact Sheet"**

The portfolio contains two deliberately independent visual worlds. The technical version behaves like a quiet prototype calibration surface: exact dividers, measured metadata, neutral paper, and a single restrained yellow signal. The creative version behaves like a moving contact sheet: physical photographs, slight rotation, shallow depth, and direct manipulation.

Both worlds remain project-led and flat at the page level. They share factual content and detail-page anatomy, but never share homepage composition, accent behavior, or motion language.

**Key Characteristics:**

- Real project media appears before explanatory systems.
- Square corners, thin rules, and restrained color prevent generic card UI.
- AI appears as a short working sequence, not as a visual motif.
- Chinese is the default; English is independently edited and uses the same hierarchy.

## Colors

The technical palette is near-neutral with a rare calibration-yellow signal. The creative palette adds one muted red and one workmanlike blue while preserving the same paper-and-ink base.

**The Limited Signal Rule.** Accent color identifies progress, state, or a deliberate interaction surface; it never washes an entire page in brand color.

## Typography

**Display Font:** Noto Sans SC (with Arial fallback)
**Body Font:** Noto Sans SC (with Arial fallback)
**Measurement Font:** IBM Plex Mono in technical surfaces; DM Mono in creative surfaces

Display type is broad, direct, and limited to 96px. Body copy stays conversational and high-contrast. Monospace is reserved for sequence, engine, year, count, and measurement rather than used as a technical costume.

**The Heading Carries Itself Rule.** Do not place an eyebrow or role label directly above a main heading.

## Layout

Desktop pages use asymmetrical two-column compositions with fluid outer padding between 20px and 90px. Details alternate wide media with narrow explanatory columns. Mobile collapses to one column at 760px, preserves 44px controls, and keeps media before text.

Technical projects are full-width rows, never floating cards. Creative projects live in one horizontal, draggable gallery with a stable square image area and fixed caption strip.

## Elevation & Depth

Technical surfaces are flat and separated by lines or tonal bands. Creative depth belongs only to the polaroid gallery and detail media, where soft offset shadows and small rotations support the contact-sheet metaphor.

**The Flat Page Rule.** Do not add floating section containers, glass panels, or ambient shadows to ordinary page regions.

## Shapes

The system uses square corners throughout. Circles are limited to tiny status markers and workflow nodes. Tags are compact rectangular labels; no text pills are used.

## Components

### Project Rows

Technical rows combine number, fixed-ratio media, title and capability tags, plus one directional icon. The whole row is a button with a visible focus outline.

### Polaroids

Creative polaroids are real buttons with square media, a stable caption strip, subtle rotation, and transform-only drag/depth motion. Wheel, pointer, touch, keyboard focus, and reduced-motion behavior are all supported.

### Workflow

AI collaboration is shown as a compact ordered line. Each node contains a concrete working step; it never exposes prompts, chats, code, architecture, or private evidence.

### Navigation

Both worlds use a thin top bar with owner placeholder, cross-site link, and language switch. Switching language preserves the current project route.

## Do's and Don'ts

### Do:

- **Do** lead every project with video, a real screenshot, or an explicit video placeholder.
- **Do** preserve separate Chinese and English copy in the shared data layer.
- **Do** state validation boundaries when hardware tuning or Play Mode acceptance remains pending.
- **Do** keep the two homepages visually and behaviorally independent.

### Don't:

- **Don't** publish code, architecture, prompts, chats, internal protocols, company names, or raw logs.
- **Don't** turn middleware demo games into portfolio projects.
- **Don't** add purple-blue gradients, glass panels, rounded dashboard cards, cartoons, or decorative AI imagery.
- **Don't** let limited screenshots or result data compete with the project video and personal contribution.
