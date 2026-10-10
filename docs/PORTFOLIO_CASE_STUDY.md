# Damascus Medical Center — portfolio case study

## Problem

Healthcare visitors need clear answers about care options, the people behind care and the next step. This self-directed project demonstrates that journey through a complete fictional medical website. It does not claim a real client, patient interviews, measured conversions or clinical outcomes.

## Redesign

The existing React application already had working service discovery, clinician filtering and sample appointment validation. The redesign preserved those strengths while rebuilding the visual presentation around Damascus Medical Center and مركز دمشق الطبي.

A restrained geometric medical mark, deep teal hero, warm surfaces and bilingual wordmark establish the identity. Desktop composition was evaluated at 1440×900 and 1920×1080. A 48/52 text/photography split and maximum 1600px content width use large screens deliberately. The page then shifts through a specialty index, architectural care story, portrait-led team section, questions and appointment invitation.

Existing generated photography was retained after visual review. Natural lighting and consistent materials support the new direction without representing real clinical premises or credentials. Arabic appears in the identity; the rest of the website is English.

## Engineering decisions

React, TypeScript, Tailwind, React Router and all existing routes remain. Home composition is divided into feature components. Branding, motion styles and the reusable reveal behavior have dedicated modules. Secondary pages load lazily, forms use Zod validation, and sample scheduling remains in pure tested helpers.

Motion uses native browser features rather than another dependency. The hero has a coordinated text sequence and photographic mask. Section reveals occur once, without continuous scroll listeners. Interaction feedback guides menus, disclosures and booking stages. Content is visible when enhancement APIs are absent; reduced-motion settings cancel or disable animation.

The booking form remains an honest four-step demonstration. Only safe IDs appear in URLs. Dependent selections reset correctly, review edits preserve details and the completion view explicitly reports that no appointment has been booked. Contact feedback reports local validation, not delivery. Form data stays in memory.

## Evaluation

Fifteen unit/component tests and eighteen real-browser tests pass. The browser suite covers navigation, filtering, preselection, errors, editable booking, reset, local-only contact feedback, mobile navigation, nine widths from 320–1920px and motion fallback behavior. Axe reports zero violations in the checked settled states. During review, muted text on pale backgrounds was darkened and a small-screen heading join was corrected.

Actual screenshots cover full homepage, desktop/mobile viewports, clinician profile, FAQ, mobile menu, booking review/confirmation and staged animation frames. Production output remains about 94.7 kB gzipped for initial JavaScript and 11.6 kB for CSS. Local measurement details are saved in performance-results.json, with no field-performance claim.

## Scope

The completed deliverable is a frontend portfolio demonstration with a public Netlify demo linked in README.md. Real appointment integration, verified clinical content, complete Arabic localization, assisted-technology user testing and physical-device/cross-browser review remain future work. No commercial results or compliance certification are claimed.
