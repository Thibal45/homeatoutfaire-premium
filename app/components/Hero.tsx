"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import { trackContactClick, trackQuoteClick } from "../lib/analytics";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  return (
    <section id="accueil" ref={section} className="home-hero">
      <div className="hero-grid site-container">
        <div className="hero-copy">
          <p className="eyebrow hero-enter">
            <span className="status-dot" /> VOTRE ARTISAN MULTISERVICES DANS LE
            GARD
          </p>
          <h1 className="hero-title hero-enter">
            Vos petits travaux.
            <br />
            L’esprit <span>tranquille.</span>
            <svg viewBox="0 0 330 18" fill="none" aria-hidden="true">
              <path
                d="M4 13C80 1 226 0 325 8M31 17C139 7 242 8 294 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </h1>
          <p className="hero-description hero-enter">
            Un robinet à remplacer, une pièce à rafraîchir, une maison à
            entretenir. <strong>Thibaut vous accompagne, simplement.</strong>
          </p>
          <p className="hero-location hero-enter">
            <MapPin size={17} aria-hidden="true" /> Sainte-Anastasie, près de
            Nîmes · Environ 50 km autour
          </p>
          <div className="hero-ctas hero-enter">
            <a
              href="#devis"
              className="btn btn-gold"
              onClick={() => trackQuoteClick("hero")}
            >
              <span>Parlez-moi de votre besoin</span>
              <span className="btn-arrow">
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </a>
            <a
              href="tel:0618085598"
              className="hero-call"
              onClick={() => trackContactClick("phone", "hero")}
            >
              <span className="call-icon">
                <Phone size={18} aria-hidden="true" />
              </span>
              <span>
                <small>Un échange direct</small>
                <strong>06 18 08 55 98</strong>
              </span>
            </a>
          </div>
          <div className="hero-reassurance hero-enter">
            <span>
              <Check size={15} aria-hidden="true" /> Devis gratuit
            </span>
            <span>
              <Check size={15} aria-hidden="true" /> Un seul interlocuteur
            </span>
          </div>
        </div>
        <div className="hero-visual hero-enter">
          <div className="hero-photo-frame">
            <motion.div
              className="hero-photo"
              style={{ y: reducedMotion ? 0 : photoY }}
            >
              <Image
                src="/images/hero.jpg"
                alt=""
                fill
                preload
                sizes="(max-width: 767px) 100vw, 50vw"
                className="hero-image"
              />
            </motion.div>
            <div className="hero-photo-shade" />
            <p className="hero-photo-caption">
              Profitez de votre maison.
              <br />
              <span>Je m’occupe des petits travaux.</span>
            </p>
          </div>
          <div className="hero-local-stamp" aria-hidden="true">
            <MapPin size={22} />
            <span>
              LOCAL
              <br />
              <strong>ET À VOS CÔTÉS</strong>
            </span>
          </div>
          <a href="#a-propos" className="hero-person-card">
            <Image
              src="/images/thibaut-sachot-homeatoutfaire.webp"
              alt=""
              width={64}
              height={64}
            />
            <span>
              <small>Un visage, un contact.</small>
              <strong>Thibaut SACHOT</strong>
              <span>
                Faisons connaissance{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </span>
          </a>
          <span className="hero-visual-corner" aria-hidden="true">
            LE SOIN DU DÉTAIL, AU QUOTIDIEN.
          </span>
        </div>
      </div>
      <div className="hero-bottom site-container">
        <a href="#services">
          Découvrez ce que je peux faire pour vous{" "}
          <ArrowDown size={17} aria-hidden="true" />
        </a>
        <span>
          Lundi – samedi · Dimanche matin : extrême urgence, selon disponibilité
        </span>
      </div>
    </section>
  );
}
