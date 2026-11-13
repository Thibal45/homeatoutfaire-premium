"use client";

import { ArrowUpRight, MessageSquareQuote } from "lucide-react";
import Reveal from "./Reveal";

export default function Reviews() {
  return (
    <section id="avis" aria-labelledby="avis-title" className="review-section">
      <Reveal className="site-container review-content">
        <span className="review-icon">
          <MessageSquareQuote size={32} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow">APRÈS UNE INTERVENTION</p>
          <h2 id="avis-title">Votre expérience compte.</h2>
          <p>
            Votre avis aide d’autres voisins à faire leur choix en confiance.
          </p>
        </div>
        <a
          href="https://g.page/r/Cf0mvGh1AFkOECE/review"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
          onClick={() => {
            (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
              "event",
              "click_google_review",
              { location: "reviews_section" },
            );
          }}
        >
          Partager mon avis sur Google{" "}
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
