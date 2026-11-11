# Quote-form verification — 11 November 2026

Scope: anti-spam only, EmailJS Free, no photo upload, no production change.

The client describes a request, provides a phone number and/or email, explicitly loads Google reCAPTCHA, solves it, and submits. The browser sends the fields plus `g-recaptcha-response` to the protected EmailJS template; only provider success resets the request and records a conversion.

## Live preview and provider checks

Frontend tested: `3f492d0dbd7b6170535b7490e25d47fae9c18b1c` on the branch preview `homeatoutfaire-premium-git-feat-secur-d6481f-thibal45s-projects.vercel.app`. The subsequent verification commit adds tests/documentation and a development-only test dependency, not frontend changes.

| Boundary | Evidence | Result |
| --- | --- | --- |
| Known spam domain | A request containing `probox.my.id` displayed the suspect-content alert; fields were preserved. | Pass, supplemental browser filter only |
| Missing CAPTCHA in form | Submitting a valid phone-only request with an empty token displayed “Activez puis complétez…” and focused the `role="alert"` paragraph. | Pass |
| Keyboard | Tab order: name → phone → email → address → service → message → email-photo alternative. Enter on submit triggered validation and focused the alert. | Pass for tested path |
| Responsive reflow | Browser zoom produced effective CSS widths 539 px and 337 px. `clientWidth` equalled `scrollWidth`; at 337 px fields stayed within x=54–283, submit height was 48 px, compact CAPTCHA iframe x=71–235 (164 px wide). | Pass for reflow, not a physical-phone/browser-compatibility test |
| Analytics refusal | The owner completed the real Google challenge after analytics had been refused. | Pass |
| Real submission | Preview showed “Votre demande a bien été envoyée”; EmailJS history showed OK. Owner explicitly confirmed receipt in the inbox, not spam. | Pass end-to-end |
| Provider enforcement | EmailJS’s official **Test It** control, using the protected preview template without a CAPTCHA parameter, returned **400 reCAPTCHA: The g-recaptcha-response parameter not found**. | Pass: rejection is enforced by EmailJS, not only by client validation |
| Non-browser API | A REST attempt returned 403 “API access from non-browser environments is currently disabled.” No account protection was disabled. | Existing safeguard preserved; not used as CAPTCHA proof |

The first official negative test’s transient result was lost when the browser session was cleaned up; it was repeated once to capture the explicit 400 response. No repeated flood or load test was performed. The protected template produced no new successful email-history entry for that negative check.

## Automated regression checks

Run:

```sh
npm ci
npm run test:quote
npx tsc --noEmit
npx eslint tests/quote-form.integration.test.mjs tests/quote-security.test.mjs app/components/QuoteForm.tsx app/components/QuoteCaptcha.tsx app/lib/quote-security.ts
npm run build
```

`test:quote` uses Node’s experimental VM-module flag to load the actual TSX components in a JSDOM DOM, with real React and mocked Google/EmailJS boundaries. It makes **no network calls** and never solves or bypasses a real CAPTCHA. JSDOM is a development dependency only.

The runner reports **25 tests passed**, including the parent test (24 individual scenarios):

- Ten validation/domain/cooldown utility scenarios.
- Script not loaded before activation; missing site key fails closed with alternatives.
- Missing token keeps fields and focuses the alert.
- Failed or pending script cannot send or record a conversion.
- Simulated expiry/widget-error callbacks clear a previously received mock token.
- Simultaneous submissions call the mock provider once; submit remains disabled while pending.
- Provider failure retains fields, resets the CAPTCHA, unlocks submit, stores no cooldown and records no conversion.
- Success trims fields, resets form/CAPTCHA, records one conversion and stores only a timestamp.
- Stored and in-memory cooldown; unavailable storage still allows a first request.
- Honeypot generates neither provider call nor conversion.
- Phone-only contact and legitimate photo URL remain accepted.

These are fault simulations, not claims that a live network outage or a real Google-token expiration was reproduced. A deliberately forged non-empty token was not sent to Google; missing-token enforcement was tested directly at EmailJS. Normal valid-token sending was tested separately end-to-end.

## Production gate

Ready for owner review after the final preview build. **Do not merge or change production variables without the owner's release approval.**

At release: configure the production public site key and protected template; merge approved code; confirm production READY; verify the production form and one labelled real submission. Then require CAPTCHA on the retained original EmailJS template (or retire it deliberately). Leaving old publicly known template IDs unprotected would retain an alternate sending path. Do not claim the production form is secured before that rollout is completed.

No zero-spam guarantee: a human scammer can solve a CAPTCHA. Domain checks, honeypot and browser delay are supplemental and bypassable, not server-side identity verification or global rate limiting.
