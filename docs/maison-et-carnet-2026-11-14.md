# HomeAToutFaire — la maison et le carnet de projet

## Design and scope

The lifestyle stock hero is replaced by a bespoke, code-native illustrative house, with six keyboard-operable service markers. The owner’s real portrait and a labelled, retouched project photo ground the introduction. The house is explicitly an illustration, not a claimed customer property. Selecting a marker and following its link selects the matching service tab.

Sage, clay, warm paper and the existing deep blue/gold unify the hero and shared elements. The real ceiling project has a stronger visual chapter on blue; image provenance is preserved. Service images receive a presentation crop, without replacing the original files. Service-detail URLs, business metadata, qualifications/scope boundaries and legal content remain unchanged.

## Useful interactions

An optional native dialog, “Le carnet de votre projet”, helps choose a service, select examples and add a free-text note. A second step gives an editable description. Nothing is sent until the visitor explicitly submits the existing quote form. The dialog can be closed with its close button or native Escape handling; native modality contains keyboard focus and makes the background inert. Keyboard behavior is verified in the deployed browser, not inferred from the DOM unit adapter.

Draft transfer uses an ephemeral custom event. Message text stays out of the URL and browser storage. Existing form descriptions are preserved and the draft is appended, duplicate handoffs are ignored, and overflow is rejected with a notice rather than truncation. No new tracking, provider, account, upload endpoint or runtime dependency is added. Existing CAPTCHA enforcement and duplicate-send/cooldown protection remain in place.

A mobile contact dock offers phone and quote access after scrolling. It hides over the gallery, quote, contact and footer. It replaces floating icons on narrow screens. The selected commune also appears in the proximity illustration without asserting automatic coverage or a cartographic location.

## Motion and access

The house drawing enters once, and service selection changes its relevant detail. Decorative responses are finite, not persistent background loops. CSS and the existing MotionConfig respect reduced motion. Form placeholders and footer information have stronger contrast/size. Existing skip link, tab-key navigation and real-photo lightbox remain.

## Verification

TypeScript and the production build pass (17 static routes). 54 automated checks: 29 quote/security, 7 gallery, 11 consent, 7 discovery. New checks exercise house-to-service handoff, the editable planner and cancellation, existing description preservation, duplicate handoffs and overlong draft rejection. Provider interactions are mocked; no real mail or CAPTCHA challenge is submitted.

The cloud browser blocks local file previews. An internally bundled local preview is not a deployment and is not used as evidence of live-browser success. Production browser checks and release identifiers are recorded in the pull request after publication. No preview protection or access setting is changed.

Live review found three details to refine: decorative service indices are now hidden from accessible names, Tab/Shift+Tab containment is explicit in the planner, and focus moves to the quote notice after the description update. The header clears its current-section marker on leaving a navigation section. The mobile dock is hidden in very short viewports to retain reading space. These follow-up changes are recorded separately from the initial release.
