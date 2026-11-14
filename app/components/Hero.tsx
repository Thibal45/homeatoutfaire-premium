"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ClipboardList,
  MapPin,
  Phone,
} from "lucide-react";
import { trackContactClick, trackQuoteClick } from "../lib/analytics";
import { openPlanner } from "../lib/discovery";
import HouseScene from "./HouseScene";

export default function Hero() {
  return (
    <section id="accueil" className="atelier-hero">
      <div className="site-container atelier-hero-grid">
        <div className="atelier-hero-copy">
          <p className="eyebrow hero-enter">
            <span className="status-dot" /> UN ARTISAN D’ICI. POUR VOTRE
            CHEZ-VOUS.
          </p>
          <h1 className="atelier-title hero-enter">
            Vos petits travaux.
            <br />
            L’esprit <span>tranquille.</span>
          </h1>
          <p className="atelier-intro hero-enter">
            Il y a ces petites choses qu’on remet à plus tard.
            <br className="desktop-break" /> Et le plaisir de les voir enfin
            réglées.
          </p>
          <p className="atelier-intro-detail hero-enter">
            Peinture, petite plomberie, électricité sur existant, menuiserie,
            entretien… <strong>On en parle, je m’en occupe.</strong>
          </p>
          <div className="atelier-actions hero-enter">
            <a
              href="#devis"
              className="btn btn-gold"
              onClick={() => trackQuoteClick("hero")}
            >
              Parlons de votre projet{" "}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="atelier-planner-trigger"
              onClick={() => openPlanner()}
            >
              <ClipboardList size={18} aria-hidden="true" /> Préparer ma demande
            </button>
          </div>
          <div className="atelier-person hero-enter">
            <a href="#a-propos" className="atelier-person-link">
              <Image
                src="/images/thibaut-sachot-homeatoutfaire.webp"
                alt=""
                width={54}
                height={54}
                preload
              />
              <span>
                <small>Votre interlocuteur, du début à la fin.</small>
                <strong>
                  Thibaut SACHOT <ArrowUpRight size={14} aria-hidden="true" />
                </strong>
              </span>
            </a>
            <a
              href="tel:0618085598"
              className="atelier-person-phone"
              onClick={() => trackContactClick("phone", "hero")}
            >
              <Phone size={16} aria-hidden="true" />
              <span>06 18 08 55 98</span>
            </a>
          </div>
          <p className="atelier-local hero-enter">
            <MapPin size={16} aria-hidden="true" /> Sainte-Anastasie · Environ
            50 km autour
          </p>
        </div>
        <div className="atelier-hero-art hero-enter">
          <HouseScene />
        </div>
      </div>
      <div className="site-container atelier-proof-strip">
        <div className="atelier-proof-promises">
          <span>
            <Check size={17} aria-hidden="true" /> Devis gratuit
          </span>
          <span>
            <Check size={17} aria-hidden="true" /> Un contact direct
          </span>
          <span>
            <Check size={17} aria-hidden="true" /> Un besoin étudié avant
            déplacement
          </span>
        </div>
        <a href="#galerie" className="atelier-project-peek">
          <Image
            src="/images/realisations/plafond-apres-angle-comparable-retouche.jpg"
            width={76}
            height={58}
            alt=""
          />
          <span>
            <small>DU CONCRET, PRÈS DE CHEZ VOUS</small>
            <strong>Un plafond, un nouveau départ.</strong>
            <em>Photo après travaux retouchée</em>
          </span>
          <ArrowDown size={19} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
