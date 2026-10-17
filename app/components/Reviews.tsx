"use client";

import { ExternalLink, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters?: Record<string, string | number | boolean>,
  ) => void;
};

const googleReviewsUrl = "https://g.page/r/Cf0mvGh1AFkOECE/review";

function trackGoogleReviewClick() {
  const analyticsWindow = window as GtagWindow;

  analyticsWindow.gtag?.("event", "click_google_review", {
    location: "reviews_section",
  });
}

export default function Reviews() {
  return (
    <section
      id="avis"
      aria-labelledby="avis-title"
      className="relative scroll-mt-[68px] overflow-hidden bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-52 w-52 rounded-full bg-cyan-100/70 blur-[95px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto flex max-w-[1180px] flex-col gap-6 overflow-hidden rounded-3xl bg-[#082E50] p-6 text-white shadow-[0_16px_45px_rgba(8,46,80,0.16)] sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-yellow-400/15 blur-[70px]"
        />

        <div className="relative flex max-w-3xl items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B]">
            <MessageSquareQuote
              size={23}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300 sm:text-sm">
              Vous avez fait appel à HomeAToutFaire&nbsp;?
            </p>

            <h2
              id="avis-title"
              className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Votre avis compte
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/75 sm:text-base sm:leading-7">
              Partagez votre expérience sur Google. Votre retour aide les
              futurs clients à choisir HomeAToutFaire en toute confiance.
            </p>
          </div>
        </div>

        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackGoogleReviewClick}
          className="relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#06192B] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300"
        >
          Déposer un avis sur Google
          <ExternalLink size={17} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
