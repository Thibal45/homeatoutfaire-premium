"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Cookie } from "lucide-react";

const GA_MEASUREMENT_ID = "G-W93SKYD01D";
const CONSENT_KEY = "homeatoutfaire-cookie-consent";
const ANALYTICS_HOSTNAMES = new Set([
  "homeatoutfaire30.fr",
  "www.homeatoutfaire30.fr",
]);

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
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [isReady, setIsReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerHost, setBannerHost] = useState<HTMLElement | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const focusOnOpen = useRef(false);
  const sessionConsent = useRef<ConsentChoice>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // Refresh the host after client navigation replaces a page's Header.
      setBannerHost(document.getElementById("cookie-consent-slot"));
      let savedConsent = sessionConsent.current;
      try {
        if (savedConsent === null) {
          const saved = window.localStorage.getItem(CONSENT_KEY);
          if (saved === "granted" || saved === "denied") savedConsent = saved;
        }
      } catch { /* Keep the visitor's choice for this visit when storage is blocked. */ }

      if (savedConsent === "granted" || savedConsent === "denied") {
        sessionConsent.current = savedConsent;
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
  }, [pathname]);

  useEffect(() => {
    if (showBanner && focusOnOpen.current) {
      focusOnOpen.current = false;
      bannerRef.current?.focus();
    }
  }, [showBanner]);

  function acceptAnalytics() {
    sessionConsent.current = "granted";
    try { window.localStorage.setItem(CONSENT_KEY, "granted"); } catch { /* Session-only choice. */ }
    Reflect.set(window, `ga-disable-${GA_MEASUREMENT_ID}`, false);
    setConsent("granted");
    setShowBanner(false);
  }

  function refuseAnalytics() {
    const previousConsent = consent;
    sessionConsent.current = "denied";
    let saved = false;
    try { window.localStorage.setItem(CONSENT_KEY, "denied"); saved = true; } catch { /* Session-only choice. */ }
    const analyticsWindow = window as Window & {
      gtag?: (command: string, action: string, values: Record<string, string>) => void;
    };
    Reflect.set(analyticsWindow, `ga-disable-${GA_MEASUREMENT_ID}`, true);
    analyticsWindow.gtag?.("consent", "update", { analytics_storage: "denied" });
    setConsent("denied");
    setShowBanner(false);

    deleteGoogleAnalyticsCookies();

    if (previousConsent === "granted" && saved) {
      window.location.reload();
    }
  }

  function reopenPreferences() {
    if (showBanner) {
      bannerRef.current?.focus();
      return;
    }
    focusOnOpen.current = true;
    setShowBanner(true);
  }

  if (!isReady) {
    return null;
  }

  const canLoadAnalytics = ANALYTICS_HOSTNAMES.has(window.location.hostname);

  const banner = showBanner ? (
    <div
      ref={bannerRef}
      role="region"
      tabIndex={-1}
      aria-labelledby="cookie-consent-title"
      className="scroll-mt-[83px] border-b border-slate-200 bg-[#06192B] px-5 py-4 text-white focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-yellow-300 sm:px-8 lg:scroll-mt-[87px] lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1360px] items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex min-w-0 items-start gap-3">
          <Cookie size={22} strokeWidth={2.1} aria-hidden="true" className="mt-0.5 shrink-0 text-yellow-300" />
          <div className="min-w-0">
            <h2 id="cookie-consent-title" className="text-sm font-bold text-white">
              Respect de votre vie privée
            </h2>
            <p className="mt-1 text-sm leading-6 text-blue-100">
              Google Analytics mesure la fréquentation du site uniquement avec votre accord.
              Vous pouvez continuer votre visite sans accepter cette mesure d&apos;audience.{" "}
              <Link href="/politique-confidentialite" className="font-semibold underline underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300">
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 md:w-[280px]">
          <button type="button" onClick={refuseAnalytics} className="min-h-12 rounded-xl border border-white/50 bg-[#102C44] px-3 py-3 text-sm font-bold text-white hover:bg-[#183C58] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300">
            Tout refuser
          </button>
          <button type="button" onClick={acceptAnalytics} className="min-h-12 rounded-xl border border-yellow-300 bg-yellow-300 px-3 py-3 text-sm font-bold text-[#06192B] hover:bg-yellow-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* GOOGLE ANALYTICS */}
      {consent === "granted" && canLoadAnalytics && (
        <>
          <Script
            id="google-consent-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];

                window.gtag = function () {
                  window.dataLayer.push(arguments);
                };

                window.gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });

                window.gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });

                window.gtag('js', new Date());
                window.gtag('config', '${GA_MEASUREMENT_ID}');
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

      {/* In-flow after Header; a non-overlay fallback also covers error pages. */}
      {bannerHost ? createPortal(banner, bannerHost) : banner}

      {/* MODIFIER LE CHOIX */}
      <div className="border-t border-slate-200 bg-[#F5F7FA] px-5 py-3 text-center">
        <button
          type="button"
          onClick={reopenPreferences}
          aria-label="Gérer mes préférences de cookies"
          className="min-h-11 rounded-lg px-4 py-2 text-sm font-semibold text-[#082E50] underline underline-offset-4 hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#082E50]"
        >
          Gérer mes cookies
        </button>
      </div>
    </>
  );
}
