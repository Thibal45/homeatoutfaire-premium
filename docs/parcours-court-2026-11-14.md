# HomeAToutFaire — parcours court et pictogrammes

## Objective and structure

Reduce the effort of traversing the whole site without shrinking body copy or losing the scope of the offered work. The homepage now has four main sections: introduction, service catalogue, a real project and contact. Repeated about/process/coverage/contact/review blocks are combined rather than repeated vertically.

The catalogue keeps six service choices, three examples per choice, explicit scope boundaries, detailed service-page links and quote/planner access. The seventh offer, secondary homes and holiday rentals, retains its own visible link and detailed page. Illustrative service photos are available in the expandable gallery instead of a second large image panel in the catalogue.

The real ceiling comparison, the three exact work stages, all original photo captions and reconstruction/retouch provenance remain. The lightbox and all nine images remain accessible.

Contact methods, operating hours, owner identity and a short introduction stay visible. Native disclosures hold the method, detailed coverage/commune selection and FAQ. The quote form starts closed but is opened by quote links, initial hash/deep links, browser history or the existing prefill event. It stays mounted, retaining edits when closed/reopened. A form submission is still an explicit action; security, provider enforcement, CAPTCHA opt-in, cooldown and consent are unchanged.

All seven service pages use a shorter common layout. Their complete item lists and scope exclusions are preserved verbatim; metadata, canonical URLs and structured data are unchanged. Footer service links, public review link, social links, legal pages and consent preferences remain accessible.

## Icons and visual design

One consistent SVG set is used on the house, catalogue and project notebook: lightbulb, tap, paint roller, door, pool-cleaning net and crossed tools. The old hardware-bolt/drop/wave mismatches are removed. House markers remain labelled and keyboard-operable, with at least 44 px touch targets. The house is an illustration, not a claimed customer property.

Warm paper, deep blue, sage and gold are retained in tighter compositions, with readable 13–16 px body copy, shorter section headings, a lighter header and less repeated imagery. Motion remains finite and respects reduced motion. No runtime dependency, analytics system or external service is added.

## Baseline observed in Chromium

Same public site, closed optional disclosures, Peinture selected, no undecided cookie banner. Width is the effective CSS viewport produced by Chromium zoom, not a physical phone.

| CSS width | CSS height | Homepage height before |
|---|---|---|
| 1363 | 936 | 8032 px |
| 909 | 624 | 9033 px |
| 454 | 312 | 11570 px |
| 340 | 234 | 12242 px |

The electrical-service page measured 3048 px at 1363 px width and 4516 px at 454 px width. Post-release measurements, including the quote open, are recorded in the pull request so that disclosure-related savings are explicit.

## Verification

TypeScript and production build pass (17 static routes). 56 automated checks: 29 quote/security, 7 gallery, 11 consent, 9 discovery. New checks verify a closed-but-mounted quote, repeated links/deep links/history opening relevant disclosures, preservation of in-progress text and consistent house icon mapping. Provider calls remain mocked; no real email or CAPTCHA is sent.

Local HTTP checks pass for ten pages: 200 responses, one H1, canonical and security headers. The seven service-page item counts and complete exclusion wording match their existing source props. The homepage has four main sections, six tabs and a closed rendered quote. The cloud browser cannot open local previews; no local file or preview-access workaround is used. Live UI, responsive measurements, screenshots and final release identifiers are recorded in the pull request.
