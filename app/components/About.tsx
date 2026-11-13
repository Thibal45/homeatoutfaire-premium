"use client";

import Image from "next/image";
import { ArrowUpRight, Check, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { trackContactClick, trackQuoteClick } from "../lib/analytics";

export default function About() {
  return (
    <section id="a-propos" className="section-space about-section">
      <div className="site-container about-grid">
        <Reveal className="about-photo-block">
          <div className="about-photo">
            <Image
              src="/images/thibaut-sachot-homeatoutfaire.webp"
              alt="Thibaut SACHOT, votre interlocuteur HomeAToutFaire"
              width={320}
              height={480}
              sizes="(max-width: 767px) 75vw, 330px"
            />
            <span className="about-photo-note">
              Le plaisir du travail bien fait.
            </span>
          </div>
          <div className="about-signature">
            <span>Thibaut</span>
            <p>
              SACHOT
              <br />
              <small>Votre interlocuteur, tout simplement.</small>
            </p>
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={80}>
          <p className="eyebrow">
            <span className="eyebrow-line" /> LE VISAGE DERRIÈRE HOMEATOUTFAIRE
          </p>
          <h2 className="display-title">
            On fait connaissance ?<br />
            <span>Moi, c’est Thibaut.</span>
          </h2>
          <p className="large-copy">
            Derrière chaque demande, il y a votre maison, vos habitudes et votre
            confiance.
          </p>
          <p>
            Installé à Sainte-Anastasie, je prends directement en charge vos
            petits travaux, dépannages et entretiens courants. Du premier
            échange aux dernières finitions, vous savez à qui vous adresser.
          </p>
          <div className="about-promises">
            <p>
              <Check size={18} aria-hidden="true" />
              <span>
                <strong>Un échange clair.</strong> Votre besoin est étudié avant
                déplacement.
              </span>
            </p>
            <p>
              <Check size={18} aria-hidden="true" />
              <span>
                <strong>Le respect de chez vous.</strong> De l’attention, de la
                propreté et des finitions soignées.
              </span>
            </p>
            <p>
              <Check size={18} aria-hidden="true" />
              <span>
                <strong>Un contact direct.</strong> Vous échangez avec la
                personne qui intervient.
              </span>
            </p>
          </div>
          <div className="about-ctas">
            <a
              href="#devis"
              className="btn btn-navy"
              onClick={() => trackQuoteClick("about")}
            >
              Parlons de votre projet{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a
              href="tel:0618085598"
              className="about-phone"
              onClick={() => trackContactClick("phone", "about")}
            >
              <Phone size={17} aria-hidden="true" />
              06 18 08 55 98
            </a>
          </div>
          <span className="about-detail">
            <MessageCircle size={15} aria-hidden="true" /> Pas de plateforme.
            Pas d’intermédiaire.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
