"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Cookie } from "lucide-react";

const GA_MEASUREMENT_ID = "G-W93SKYD01D";
const CONSENT_KEY = "homeatoutfaire-cookie-consent";

type ConsentChoice = "granted" | "denied" | null;

function deleteGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter(
      (name) =>
        name === "_ga" ||
        name.startsWith("_ga_") ||
        name === "_gid" ||
        name === "_gat",
    );

  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");

  const possibleDomains = [
    hostname,
    `.${hostname}`,
    domainParts.length >= 2
      ? `.${domainParts.slice(-2).join(".")}`
      : hostname,
  ];

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;

    possibleDomains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    });
  });
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [isReady, setIsReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedConsent = window.localStorage.getItem(CONSENT_KEY);

      if (savedConsent === "granted" || savedConsent === "denied") {
        setConsent(savedConsent);
        setShowBanner(false);
      } else {
        setConsent(null);
        setShowBanner(true);
      }

      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  function acceptAnalytics() {
    window.localStorage.setItem(CONSENT_KEY, "granted");
    setConsent("granted");
    setShowBanner(false);
  }

  function refuseAnalytics() {
    const previousConsent = window.localStorage.getItem(CONSENT_KEY);

    window.localStorage.setItem(CONSENT_KEY, "denied");
    setConsent("denied");
    setShowBanner(false);

    deleteGoogleAnalyticsCookies();

    if (previousConsent === "granted") {
      window.location.reload();
    }
  }

  function reopenPreferences() {
    setShowBanner(true);
  }

  if (!isReady) {
    return null;
  }

  return (
    <>
      {/* GOOGLE ANALYTICS */}
      {consent === "granted" && (
        <>
          <Script
            id="google-consent-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                  dataLayer.push(arguments);
                }

                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });

                gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });

                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `,
            }}
          />

          <Script
            id="google-analytics"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        </>
      )}

      {/* BANDEAU DE CONSENTEMENT */}
      {showBanner && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Préférences de cookies"
          className="fixed inset-x-0 bottom-0 z-[9999] p-3"
        >
          <div className="mx-auto w-full max-w-[1000px] rounded-2xl border border-white/15 bg-[#06192B] shadow-2xl">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-300">
                  <Cookie size={21} strokeWidth={2.1} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-white">
                    Respect de votre vie privée
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-blue-100/80">
                    HomeAToutFaire utilise Google Analytics uniquement avec
                    votre accord afin de mesurer la fréquentation du site et
                    améliorer son fonctionnement.
                  </p>

                  <p className="mt-1 text-xs leading-4 text-blue-100/55">
                    Vous pouvez accepter ou refuser cette mesure
                    d&apos;audience.
                  </p>
                </div>
              </div>

              {/* BOUTONS TOUJOURS VISIBLES */}
              <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={refuseAnalytics}
                  className="min-h-[48px] flex-1 rounded-xl px-4 py-3 text-sm font-bold"
                  style={{
                    backgroundColor: "#102C44",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                >
                  Tout refuser
                </button>

                <button
                  type="button"
                  onClick={acceptAnalytics}
                  className="min-h-[48px] flex-1 rounded-xl px-4 py-3 text-sm font-bold"
                  style={{
                    backgroundColor: "#FACC15",
                    color: "#06192B",
                    border: "1px solid #FACC15",
                  }}
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODIFIER LE CHOIX */}
      {!showBanner && (
        <button
          type="button"
          onClick={reopenPreferences}
          aria-label="Gérer mes préférences de cookies"
          className="fixed bottom-3 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#082E50] shadow-md"
        >
          Gérer mes cookies
        </button>
      )}
    </>
  );
}