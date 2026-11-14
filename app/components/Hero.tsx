"use client";

import Image from "next/image";
import {
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
    <section id="accueil" className="compact-hero">
      <div className="site-container compact-hero-grid">
        <div className="compact-hero-copy hero-enter">
          <p className="eyebrow">
            <MapPin size={15} aria-hidden="true" /> SAINTE-ANASTASIE & ALENTOURS
          </p>
          <h1>
            Vos petits travaux.
            <br />
            L’esprit <em>tranquille.</em>
          </h1>
          <p className="compact-lead">
            Un robinet à changer, une pièce à rafraîchir, une porte à régler.{" "}
            <strong>
              Un seul interlocuteur pour vos petits travaux et votre entretien.
            </strong>
          </p>
          <div className="compact-hero-actions">
            <a
              href="#devis"
              className="btn btn-gold"
              onClick={() => trackQuoteClick("hero")}
            >
              Parlons de votre projet{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="compact-planner-link"
              onClick={() => openPlanner()}
            >
              <ClipboardList size={17} aria-hidden="true" /> Préparer ma demande
            </button>
          </div>
          <div className="compact-person">
            <a href="#a-propos">
              <Image
                src="/images/thibaut-sachot-homeatoutfaire.webp"
                alt=""
                width={46}
                height={46}
                preload
              />
              <span>
                <strong>Thibaut SACHOT</strong>
                <small>Votre artisan multiservices dans le Gard</small>
              </span>
            </a>
            <a
              href="tel:0618085598"
              onClick={() => trackContactClick("phone", "hero")}
            >
              <Phone size={16} aria-hidden="true" /> 06 18 08 55 98
            </a>
          </div>
          <p className="compact-assurances">
            <span>
              <Check size={14} aria-hidden="true" /> Devis gratuit
            </span>
            <span>
              <Check size={14} aria-hidden="true" /> Jusqu’à environ 50 km
            </span>
          </p>
        </div>
        <div className="compact-hero-art hero-enter">
          <HouseScene />
        </div>
      </div>
    </section>
  );
}
