# Damascus Medical Center · مركز دمشق الطبي

A complete fictional healthcare frontend, built with React, TypeScript and Tailwind. A bilingual identity, editorial homepage and coordinated motion support a practical journey from finding a specialty to reviewing a sample appointment.

![Damascus Medical Center desktop homepage](docs/screenshots/home-desktop-viewport.png)

## Run locally

Requires Node.js 22.12+ and npm; verified with Node 24.19.0. No API keys or environment variables are required.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Open http://127.0.0.1:5173. For a production preview, run `npm run build`, then `npm run preview -- --host 127.0.0.1 --port 4173`.

## Experience

| Journey              | Implemented behavior                                                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home                 | Bilingual geometric wordmark, desktop art direction, photographic hero, six specialties, care philosophy, sample team, native FAQ and booking actions |
| Services and doctors | Search, category/specialty filters, live counts, empty-state reset, detail routes and direct booking preselection                                     |
| Appointments         | Four validated steps, sample dates and times, optional clinician, editable review, explicit demo completion and reset                                 |
| Contact and support  | Illustrative site plan, sample hours, locally validated contact form, about, FAQ, privacy and custom not-found pages                                  |

The site is a portfolio demonstration. The center, location, availability and clinicians are fictional. Generated photography does not depict real staff or patients. No appointment or message is sent. No ratings, accreditations, testimonials or business outcomes are fabricated.

## Design and motion

Deep teal, warm white and pale sage establish the Damascus identity. Manrope carries the hero and interface; DM Serif Display adds editorial emphasis. The homepage uses a 48/52 desktop split, a 1600px maximum content width, an asymmetric specialty index, an architectural approach section, photographic team profiles and a closing appointment panel. Arabic appears in the brand using `lang="ar"` and `dir="rtl"`; the remaining content is English. Full Arabic localization is not implemented.

CSS coordinates the hero text sequence, photographic mask reveal and restrained image settling. A reusable `Reveal` component enhances selected section groups using IntersectionObserver and the Web Animations API. Content is visible without those APIs. Buttons, navigation, specialty links, portraits, mobile navigation, FAQs, booking stages and form feedback share short motion timings. Reduced-motion preferences disable entrances and image transforms, including when changed during a visit. No animation dependency or continuous scroll handler was added.

## Architecture

```text
src/
  components/                 shared layout, controls, Accordion and Reveal
  data/brand.ts               English/Arabic identity constants
  data/content.ts             typed fictional services, clinicians and FAQs
  features/home/              hero and distinct homepage sections
  features/appointments/      workflow state and controlled step components
  hooks/usePageMeta.ts         route titles and descriptions
  lib/booking.ts              selection, date/time helpers and validation
  pages/                      routed directories and supporting pages
  styles/                     identity, homepage compositions and motion system
  index.css                   Tailwind theme and shared component recipes
public/images/                optimized local generated photography
scripts/                      repeatable visual, motion and performance checks
e2e/                          browser workflow and accessibility tests
docs/                         design, evidence, screenshots and asset provenance
```

React 19.3, TypeScript 6, Vite 8.3, Tailwind 4.3, React Router 7.18, Lucide React and Zod. Fonts are self-hosted with licenses in `docs/licenses`. Exact versions are in the lockfile. Secondary pages and form schemas load separately. The existing application architecture and working routes were preserved during redesign.

Contact details remain in component memory; neither localStorage nor sessionStorage is used. Only safe service/doctor IDs appear in URLs. A refresh clears the draft. Contact details clear after successful local validation. Privacy links open a new tab to preserve an in-progress draft.

## Verification

```sh
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
npm run format:check
```

Verified: 15 unit/component tests and 18 browser tests pass. Principal layouts fit at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px. Axe reports zero violations across the checked pages/states. Screenshot review covers 1440×900, 1920×1080, mobile, full homepage, internal pages, menus, FAQ, booking review and motion frames. See [QA evidence](docs/QA.md).

Browser scripts default to installed Microsoft Edge. To use Chromium: `npx playwright install chromium`, set `PLAYWRIGHT_CHANNEL=chromium`, then run the checks. With the dev server running, use `node scripts/visual-qa.mjs` and `node scripts/motion-qa.mjs`. Production measurements use port 4173 and `node scripts/performance.mjs`.

## Delivery and limits

The production main JavaScript is approximately 94.7 kB gzipped; CSS is approximately 11.6 kB gzipped. No motion library was added. Fresh local production measurements are saved in `docs/performance-results.json`; these unthrottled lab observations are not field performance or a Lighthouse score.

Deploy `dist` to a static host after verification. Netlify and Vercel route fallbacks are supplied. Test direct route refreshes after deployment. Keep demo notices and noindex metadata; configure an absolute Open Graph image URL for the chosen domain. No public deployment was performed.

A real medical service would require verified organization content, a secure backend, accurate availability, server-side validation and an appropriate consent/retention model. Physical-device, Safari/Firefox and assisted-technology user testing remain outside the performed checks. No legal or healthcare compliance certification is claimed.

See [design and motion](docs/DESIGN.md), [case study](docs/PORTFOLIO_CASE_STUDY.md), [engineering report](docs/ENGINEERING_REPORT.md), and [asset provenance](docs/ASSETS.md).
