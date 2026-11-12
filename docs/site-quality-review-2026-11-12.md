# Site quality and security review — 12 November 2026

Scope: the existing public HomeAToutFaire website. Branding, validated business information, contact details, service boundaries and gallery provenance are preserved.

## Changes

- Next.js 16.2.11 → 16.4.6; aligned eslint-config-next; refreshed compatible dependencies and lockfile. Next's published advisory GHSA-2464-fhr4-w9xw identifies 16.4.1 as patched; the resolved image processor is sharp 0.35.5.
- CSP restricts base URLs, embedded objects, embedding parents and native form destinations. It does not impose a nonce or script-source policy; this is not a claim of complete XSS protection. The static rendering and existing EmailJS/reCAPTCHA/analytics integrations remain intact.
- Cookie acceptance/refusal survives blocked localStorage during client navigation. Withdrawal disables Google Analytics immediately, including when the new preference cannot be persisted. No contact details are stored.
- Stronger gold text contrast, visible keyboard focus, fixed-header anchor clearance and 16 px mobile form text. Back-to-top respects reduced motion.
- Mandatory fields are marked. Form success/provider-error messages receive focus; the visitor's request is retained on failure. Floating WhatsApp is hidden over the gallery and quote form.
- Service cards now use one shared catalogue. Gallery illustrations link directly to their service pages. The generic gallery label is now “Petit dépannage”.
- A branded French 404 provides service, home and telephone routes.

## Verification

- 42 automated checks passed: 11 consent, 25 quote/security, 6 gallery. External form providers are mocked; no new real email or CAPTCHA challenge was sent.
- TypeScript check and production build passed on Next.js 16.4.6.
- Local production HTTP check: ten public pages return 200, one h1 each, images have alt attributes, home anchors resolve, 12 optimized image URLs return 200, missing route returns the branded 404 with status 404. CSP header is present.
- npm audit --omit=dev: 0 known vulnerabilities at verification time.
- Full npm audit: 7 moderate package findings, all from one minimatch advisory (GHSA-g3hv-75wg-m249) in the TypeScript ESLint development dependency chain. npm audit fix and the current compatible parent release do not remove it. No forced major override was applied. These packages are marked dev-only; recheck when typescript-eslint publishes its fix.

Browser and deployment verification is recorded in the pull request. No site can be certified perfectly secure by these checks.
