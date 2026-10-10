# Asset provenance and generation prompts

All raster imagery was generated with the built-in Imagegen tool for this fictional project. No real staff, patients or clinic premises are depicted. Source PNGs were visually inspected for facial quality, hand anatomy, lighting and consistency. Sharp resized/encoded the assets as WebP; the clinician contact sheet is displayed using CSS crops without distorting its proportions. Assets are stored locally and do not depend on the generation directory at runtime.

| Asset                                   | Use                                                               | Size                                    |
| --------------------------------------- | ----------------------------------------------------------------- | --------------------------------------- |
| `public/images/consultation.webp`       | Desktop hero                                                      | 1440 × 960; 74,114 bytes                |
| `public/images/consultation-small.webp` | Responsive mobile hero source                                     | 640 × 427; 24,488 bytes                 |
| `public/images/clinicians.webp`         | Three fictional profile portraits from equal contact-sheet panels | 1536 × 1024; 106,104 bytes              |
| `public/images/interior.webp`           | Care approach and about page                                      | 1200 × 800; generated reception concept |

The original custom brand mark and favicon are repository-native SVG. Lucide supplies interface icons. DM Serif Display and Manrope are self-hosted Fontsource assets with OFL license copies in `licenses/`. No external stock-photo license is needed for these generated images; use of generated content remains subject to the generation service’s terms. The generated files are project content, not proof of an operating medical business.

## Consultation prompt

Generate one photorealistic editorial photograph for a premium fictional medical center website, landscape 3:2. A kind female physician in her early 40s with dark brown hair loosely tied back, ivory medical coat over muted sage clothing, subtle stethoscope, sitting at a pale oak desk having a warm attentive conversation with a female adult patient in beige linen shown from behind at the left foreground. Both are relaxed, believable, appropriate dignity, natural skin texture, realistic faces and hands. Physician mainly in the center-right of composition, clear face. Warm daylight through large windows, softly blurred contemporary consultation room in ivory and pale muted green with one plant, tactile natural materials, serene sophisticated environment. High-end documentary healthcare photography, subtle fine film grain, realistic photographic depth, soft diffused sun. No text, logos, watermarks, medical diagrams, overlays, graphic borders, excessive medical equipment or exaggerated smiles. Save-ready image asset for website hero, not a screenshot.

## Clinician portrait prompt

A single landscape 3:2 photographic contact sheet with exactly THREE equally wide vertical panels edge to edge, each panel an independent natural high quality head-and-torso portrait of a different fictional physician for premium medical website cards. No visible gaps or borders between panels, no text. LEFT third: kind female physician age 42 with dark brown hair loosely tied, ivory medical coat over sage blouse, stethoscope, centered within left panel. CENTER third: relaxed male physician age 45, medium warm skin, short dark brown hair and neat beard, white coat over neutral shirt, stethoscope, centered in center panel. RIGHT third: warm smiling female physician age 38 with shoulder-length light brown hair, white coat over cream blouse, centered in right panel. All people face camera, believable features, natural hands outside frame, each person entirely in own panel. Consistent creamy pale sage clinical walls, diffused daylight, beautiful realistic skin texture, subtle photographic grain, editorial professional headshots, vertical portrait crop composed to upper thighs. White coats distinct against soft sage background. No real person likeness, no logos, watermark, credentials, doctor names, decorations or typography.

## Reception prompt

Photorealistic editorial architectural photograph, landscape 3:2, serene contemporary premium medical center waiting room in daylight. An elegant light oak reception desk, textured warm ivory walls, tall glass windows casting softly diffused natural light, restrained sage green upholstered waiting chairs, subtle green plants, wall niches, tactile warm natural materials, excellent designed calm clinical space. Wide composed interior scene with reception toward left middle ground and seating toward right foreground. Human-centered medical interior, completely realistic clean welcoming architecture, quiet high-end documentary photography, subtle film grain. No people, no signage, no text, no logos, no watermark, no medical devices, no excessive luxury hotel decoration or visual effects.

## Original local files

The built-in tool saved PNG originals in `C:/Users/saads/.codex/generated_images/01a120f8-8a81-7e73-b36d-c976b9ecd222/`:

- Consultation: `exec-7a7c7686-9bf7-4fc2-8384-9ab225778730.png`
- Clinicians: `exec-e51f36a3-056c-4f8e-8ecd-1077dc1b9351.png`
- Reception: `exec-f44dd051-7a7b-4611-aef7-358e3158bf9a.png`

The optimized workspace files above are the actual shipped deliverables. Existing original PNGs were left in place. To encode another image, run `node scripts/prepare-assets.mjs <input-file> <consultation|clinicians|interior>`; the existing application does not require this step.
