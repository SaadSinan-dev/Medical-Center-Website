# Redesign verification evidence

Date: 10 October 2026. Environment: Windows, Node 24.19.0, npm 11.17.0 and headless Microsoft Edge controlled by Playwright. The existing development server and a production preview were used.

## Checks

| Check                          | Result                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------- |
| TypeScript and Oxlint          | Passed without errors                                                             |
| Vitest / React Testing Library | 15 tests passed across two files                                                  |
| Playwright                     | 18 tests passed                                                                   |
| Production build               | Successful; route chunks emitted                                                  |
| Accessibility                  | Zero axe violations in tested settled states, WCAG 2 A/AA, 2.1 AA and 2.2 AA tags |

## Browser inventory

Navigation and deep links, unknown profiles/services, service filtering, combined clinician search/specialty filters, empty-state reset, mobile menu route closing, Escape/focus return and keyboard FAQ are exercised.

Booking checks cover doctor preselection, ignored unknown IDs, normalized mismatches, specialty-dependent reset, sample date/time validation, first-error focus, Enter submission, review edits with retained details, honest completion, new demonstration and refresh reset. Contact checks cover local validation, honest feedback and cleared input. The suite verifies no personal details in URLs and no local/session storage.

Home, services, doctors, clinician profile, appointments, contact, about, FAQ, privacy and 404 fit at **320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px**, with no document horizontal overflow. The initial desktop action, keyboard skip link, source image loading and reduced-motion styles are tested.

The motion-specific test verifies zero active animations under reduced motion, readable team content and working service navigation when IntersectionObserver is unavailable. The screenshot script records no broken images, page errors or HTTP failures across ten routes.

## Visual inspection

Before changes, actual desktop baselines were inspected at 1440×900 and 1920×1080. Baselines were kept outside the shipped project so the deliverable has only current branding. Final screenshot review includes both required desktop sizes, mobile, full homepage, hero-to-specialty transition, mobile navigation, doctor profile, FAQ disclosure, booking review and confirmation. Additional captures document the intermediate viewport widths.

`motion-qa.mjs` pauses actual browser animations at 200, 550 and 1300ms for deterministic choreography review. Those captures are application screenshots, not generated mockups. Generated photographs are content within the application.

Corrections during QA: increased muted-text contrast on pale surfaces; removed a mobile line-break rule that joined two heading words; fitted the longer name inside the illustrative map label; enforced the intended content-width cap. Axe is run with reduced motion because sampling a transient fade gives an invalid representation of settled text contrast; normal motion is checked separately.

## Reproduce and evidence

Run the commands in README.md. `qa-results.json` contains browser outcomes; `accessibility-results.json` contains the checked page/state inventory. `screenshots/initial-observations.json` records current rendered titles, image loading and errors despite its legacy filename. `motion-results.json` records the actual animation timing inspection and reduced-motion count. `performance-results.json` contains fresh unthrottled production measurements.

## Limits

These checks are evidence, not blanket WCAG certification. Physical devices, Safari/Firefox, screen-reader user sessions, all text-spacing/zoom combinations and real medical/backend services were not tested. No deployment or real booking is claimed. Local unthrottled timing observations are not field Core Web Vitals or Lighthouse scores.
