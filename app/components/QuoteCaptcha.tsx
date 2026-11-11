"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  render: (element: HTMLElement, options: {
    sitekey: string; size: "compact"; callback: (token: string) => void;
    "expired-callback": () => void; "error-callback": () => void;
  }) => number;
  reset: (id: number) => void;
};

type Props = { siteKey: string; onToken: (token: string) => void; resetKey: number };

export default function QuoteCaptcha({ siteKey, onToken, resetKey }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!enabled || !scriptReady || !siteKey) return;
    const api = (window as Window & { grecaptcha?: RecaptchaApi }).grecaptcha;
    if (!api) return;
    let active = true;
    api.ready(() => {
      if (!active || !container.current || widgetId.current !== null) return;
      widgetId.current = api.render(container.current, {
        sitekey: siteKey,
        size: "compact",
        callback: (token) => { setFailed(false); onToken(token); },
        "expired-callback": () => onToken(""),
        "error-callback": () => { setFailed(true); onToken(""); },
      });
    });
    return () => { active = false; };
  }, [enabled, scriptReady, siteKey, onToken]);

  useEffect(() => {
    if (!resetKey || widgetId.current === null) return;
    (window as Window & { grecaptcha?: RecaptchaApi }).grecaptcha?.reset(widgetId.current);
    onToken("");
  }, [resetKey, onToken]);

  return (
    <div className="mt-5 rounded-2xl border border-white/20 bg-white/5 p-4">
      <p className="text-sm font-semibold text-white">Vérification avant envoi</p>
      <p className="mt-1 text-xs leading-5 text-blue-100/80">
        Cette étape aide à limiter les demandes automatisées. Google reCAPTCHA
        n&apos;est chargé qu&apos;après votre clic et peut traiter des données
        techniques de connexion. Consultez sa{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">politique de confidentialité</a>
        {" "}et ses{" "}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">conditions d&apos;utilisation</a>.
        Vous pouvez aussi me contacter par téléphone ou par e-mail.
      </p>
      {!siteKey ? (
        <p role="status" className="mt-3 text-sm text-yellow-100">
          La vérification est momentanément indisponible. Contactez-moi au{" "}
          <a href="tel:0618085598" className="font-semibold underline">06 18 08 55 98</a>
          {" "}ou par{" "}<a href="mailto:hatf30190@gmail.com" className="font-semibold underline">e-mail</a>.
        </p>
      ) : !enabled ? (
        <button type="button" onClick={() => setEnabled(true)} className="mt-3 min-h-11 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#082E50] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300">
          Activer la vérification anti-robot
        </button>
      ) : (
        <>
          <Script id="quote-recaptcha" src="https://www.google.com/recaptcha/api.js?render=explicit&hl=fr" strategy="afterInteractive" onReady={() => setScriptReady(true)} onError={() => { setFailed(true); onToken(""); }} />
          {!scriptReady && !failed && <p role="status" className="mt-3 text-sm text-blue-100">Chargement de la vérification…</p>}
          <div ref={container} className="mt-3" />
          {failed && <p role="alert" className="mt-3 text-sm text-yellow-100">La vérification n&apos;a pas abouti. Réessayez le contrôle ou contactez-moi par téléphone ou e-mail.</p>}
        </>
      )}
    </div>
  );
}
