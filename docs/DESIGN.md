# Damascus Medical Center — design and motion

## Identity and purpose

English: **Damascus Medical Center**. Arabic: **مركز دمشق الطبي**. The original geometric mark combines an outlined medical cross with a solid central square; it is used consistently in the wordmark and favicon. Arabic is a genuine part of the wordmark, not a nonfunctional language selector. Content outside the brand remains English.

This is a fictional portfolio project for people exploring care, a clinician and a clear appointment journey. No user research, actual provider or clinical outcomes are claimed.

## Audit and composition

The existing homepage was captured and reviewed at 1440×900 and 1920×1080 before edits. Its identity was too small, the composition relied on a familiar pale split hero, and section rhythm and motion were underdeveloped. The existing routing, booking controls and optimized photography were sound and retained.

The redesign introduces a deep teal 48/52 desktop hero, a deliberate sans/serif headline pairing, short supporting copy, two actions and a framed listening photograph. Content caps at 1600px, with 64px desktop gutters, 36px tablet gutters and 16–20px small-screen gutters. The hero is 590px tall on standard desktop and 660px on wider desktop; mobile stacks content before the photograph.

Below the hero, a three-way task strip leads into an asymmetric specialty index. A centered care statement introduces an architectural image and numbered care philosophy. Larger portraits provide the team section's visual emphasis. FAQs and a dark appointment section complete the page. Composition changes serve content rather than repeating identical cards.

## Tokens and imagery

| Token        | Value / use                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| Forest       | #123f3c: hero, primary actions, footer                                              |
| Ivory        | #f8f7f3: warm page surface                                                          |
| Ink / sage   | #203e3b / #527970: readable text and editorial emphasis                             |
| Muted / line | #52645e / #d5dfd9: secondary text and boundaries                                    |
| Typography   | Local Manrope for interface and hero; local DM Serif Display for editorial headings |

Consultation, reception and clinician images were reviewed in the rendered composition. They share natural daylight, warm materials and credible fictional subjects; they were retained with new crops and placement. Explicit dimensions, responsive hero sources and lazy loading remain. Provenance and original generation prompts are in ASSETS.md.

## Motion specification

| Element                      | Trigger and behavior                                                                       | Timing                           |
| ---------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------- |
| Hero copy                    | On mount: eyebrow, title, copy, actions and footnote enter in order                        | 750ms; staggered delays 60–450ms |
| Hero image                   | On mount: horizontal mask and subtle scale settling                                        | 950ms mask; 1300ms settling      |
| Section groups               | First viewport entry: 22px rise and fade; paired/grouped offsets                           | 650ms; delays 0–200ms            |
| Buttons, links, portraits    | Hover/press: background, arrow translation, subtle crop movement                           | 180–900ms by scale of action     |
| Menu, FAQ, booking, feedback | Open/disclosure/stage change: short entrance; native FAQ height transition where supported | 180–400ms                        |

Primary easing: `cubic-bezier(.22, 1, .36, 1)`. Motion tokens and rules are in `src/styles/identity.css` and `motion.css`. There are no repeated loops, parallax, continuous scroll listeners or scroll-jacking. FAQ height transitions progressively enhance native details; older browsers retain the native disclosure.

`Reveal` leaves the underlying content visible. It animates only when observed, disconnects after entry, cancels on unmount and responds to a change in reduced-motion preference. CSS reduced-motion rules remove entrances and image transforms. Mobile navigation uses an opening transition; closing is immediate so destinations and keyboard focus remain responsive. Booking stages enter without waiting for exit animations; controlled draft state remains in their parent.

## Accessibility and content integrity

Semantic navigation, a keyboard skip link, visible focus, native form controls, inline error relationships, first-error focus, route/stage focus management and native FAQ keyboard behavior remain. Mobile navigation closes on route selection or Escape. All controls remain usable during animation. Brand Arabic declares its own language and direction.

Fictional clinicians, generated images, sample location and local-only forms remain clearly disclosed. There are no fake testimonials, invented credentials, misleading availability or medical-business structured data. The demo remains noindex. See QA.md for actual verification and its limits.
