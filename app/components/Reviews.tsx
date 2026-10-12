"use client";

import {
  ExternalLink,
  MessageSquareQuote,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

type GtagWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters?: Record<string, string | number | boolean>,
  ) => void;
};

const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=HomeAToutFaire%20Sainte-Anastasie%2030190";

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
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-yellow-100/70 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/15 text-[#B88311]">
            <MessageSquareQuote size={24} strokeWidth={2.2} />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#0A6587]">
            Avis clients
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#06192B] sm:text-4xl">
            Votre expérience compte
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            HomeAToutFaire démarre son activité et les premiers avis clients
            seront affichés ici au fur et à mesure de leur publication sur
            Google. Aucun témoignage n&apos;est ajouté ou inventé.
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#082E50] text-yellow-300">
                <Star size={22} strokeWidth={2.2} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#06192B]">
                  Des avis Google réels, rien de plus
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Les avis publiés par de vrais clients permettent de partager
                  leur expérience de façon transparente. Lorsque les premiers
                  avis seront disponibles, cette section pourra les présenter
                  directement.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  strokeWidth={2.2}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Les notes, le nombre d&apos;avis et les témoignages ne seront
                  affichés sur le site que lorsqu&apos;ils pourront être
                  vérifiés sur la fiche Google HomeAToutFaire.
                </p>
              </div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="flex flex-col justify-between rounded-3xl bg-[#082E50] p-6 text-white shadow-sm sm:p-8"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.13em] text-yellow-300">
                Vous avez fait appel à HomeAToutFaire ?
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Partagez votre expérience
              </h3>

              <p className="mt-4 leading-7 text-blue-100/75">
                Votre avis aide les futurs clients à se faire une idée du
                sérieux de l&apos;intervention et aide aussi HomeAToutFaire à
                améliorer continuellement son service.
              </p>
            </div>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackGoogleReviewClick}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#06192B] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              Voir ou laisser un avis sur Google
              <ExternalLink size={17} strokeWidth={2.2} />
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
