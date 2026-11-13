# HomeAToutFaire experience redesign — 13 November 2026

## Direction and scope

An editorial, warm design built from ivory, deep blue and restrained gold. The real portrait, logo and existing licensed/approved images are reused. Manrope is self-hosted as two WOFF2 files (about 62 kB combined), with the SIL Open Font License kept alongside the fonts. No visitor font request goes to Google.

The homepage, seven service pages, header, footer and legal-page layout share the same typography and component language. Metadata, canonical URLs, JSON-LD, public business information and existing service boundaries are preserved. No testimonials, ratings, guarantees or new qualifications were invented.

## Interactions

- Six accessible service tabs, with arrow/Home/End keyboard navigation, service examples and preselected quote links.
- Before/after range comparison of the ceiling project. The reconstructed before and retouched after remain explicitly identified. Full-size gallery, provenance, keyboard navigation, focus return and scroll lock are retained.
- Three on-demand process steps; no autoplay carousel.
- Commune selection hands the selected town to the optional quote field. Coverage still requires confirmation; the visual orbit is explicitly non-cartographic.
- Local custom-event handoff preserves service/town selection when navigating within the homepage; query parameters also work from another route or a new tab. These values trigger no submission or persistence.
- Native FAQ disclosures, direct phone/email/WhatsApp routes and a mobile menu that fits short viewports.

## Motion and performance

Short entrance sequences, single-use viewport reveals, a restrained hero-photo scroll offset, service-panel transitions and hover feedback. Reduced motion disables CSS sequences, viewport reveals and photo parallax. Reveal content stays visible without JavaScript and when the animation API is unavailable. Floating WhatsApp has no automatic promotional bubble and stays away from the quote form/gallery/footer.

The existing CAPTCHA, provider enforcement, duplicate-send lock, cooldown, spam checks, consent controls and security headers remain in place. No new tracking platform, backend or runtime dependency was added.

## Verification

Production build and TypeScript passed. Automated regression tests: quote/security (27), gallery (7), consent (11), discovery (3); 48 total at the initial preview checkpoint. Discovery tests cover keyboard tab navigation, the correct quote destination, town selection and manual process steps. Real emails and Google challenges are not sent by these tests.

Browser review and production release evidence are recorded in the pull request. Responsive verification uses Chromium's effective CSS viewport; do not describe it as a physical-phone test.
