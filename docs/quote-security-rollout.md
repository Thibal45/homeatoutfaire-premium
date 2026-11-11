# Quote security activation — do not merge until configured and tested

Scope: anti-spam only. No photo upload, no paid plan, no identity blacklist.

## Required setup

1. Register a Google reCAPTCHA **v2 checkbox** key for `homeatoutfaire30.fr` (covers www). Register only the exact preview hostname when testing; never allow all `vercel.app` tenants or disable domain checks. Keep the secret out of Git, chat and NEXT_PUBLIC variables.
2. In EmailJS, use the dedicated `Devis sécurisé — préproduction` template (`template_devis_securise`), not the live template. Enable reCAPTCHA V2 verification and enter the secret directly in EmailJS. Use the escaped `{{name}}`, `{{phone}}`, `{{email}}`, `{{address}}`, `{{service}}`, `{{message}}` placeholders, never triple braces. No auto-reply to arbitrary submitted email addresses.
3. Add a branch-scoped **preview** `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_devis_securise` and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<public site key>`. Keep the existing production variables unchanged until approval. A missing site key fails closed (telephone/email remain available).
4. Review the notification: warn that client-supplied content is unverified, no external link should request a mailbox password, and a CAPTCHA does not establish identity. Correct the footer to `www.homeatoutfaire30.fr`.

## Tests before production

- `node --test tests/quote-security.test.mjs`, `npx tsc --noEmit`, `npm run build`.
- In the preview: no Google CAPTCHA request before explicit activation; deny analytics and still complete the CAPTCHA; keyboard/mobile/compact widget; token expiry; script blocked; validation errors retain fields; a slow/double click cannot send twice.
- Exact scam email/domain rejected before sending. Legitimate Google Photos links, phone-only contact and out-of-area owner addresses remain allowed.
- One clearly labelled synthetic request to the owner's inbox with a valid CAPTCHA. Confirm receipt and render escaped HTML as text. Test content contains no real client details.
- EmailJS must reject direct requests with absent/invalid CAPTCHA **before any email is sent**. Do not exhaust quota or send to other recipients.
- Validate success analytics only after EmailJS success. Stored cooldown contains only a timestamp, no personal data; applies for 60 seconds and tolerates unavailable storage.

## Limits and rollback

EmailJS's template-side CAPTCHA is the enforcement boundary. The honeypot, validation, domain list, client cooldown and SDK throttle are complementary **browser checks, not server-side filtering or global rate limiting**. They can be bypassed. A human scammer can solve a CAPTCHA. Do not claim zero spam or verified email identity.

Keep the original template while previewing. At production rollout, change the production template variable and public site key, deploy the approved commit, then verify a real send and rejection without a token. To roll back, restore both the previous deployment and template environment together. Once stable, require CAPTCHA on any retained legacy template too (or retire it deliberately); otherwise the old public IDs remain an unprotected sending path.

Sources: https://www.emailjs.com/docs/user-guide/adding-captcha-verification/ ; https://www.emailjs.com/docs/sdk/options/ ; https://developers.google.com/recaptcha/docs/display ; Signal-Arnaques 10 November 2026 report on the fake-quote campaign. Maintain the narrow domain list if those domains change ownership.
