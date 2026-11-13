"use client";

import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { trackContactClick } from "../lib/analytics";

export default function Contact() {
  return (
    <section id="contact" className="section-space contact-section">
      <div className="site-container">
        <Reveal className="contact-heading">
          <p className="eyebrow">
            <span className="eyebrow-line" /> RESTONS SIMPLES
          </p>
          <h2 className="display-title">
            Le bon contact.
            <br />
            <span>Au bout du fil.</span>
          </h2>
          <p>Une question ? Choisissez ce qui vous convient.</p>
        </Reveal>
        <Reveal className="contact-grid">
          <a
            href="tel:0618085598"
            onClick={() => trackContactClick("phone", "contact")}
            className="contact-choice"
          >
            <span className="contact-choice-icon">
              <Phone size={26} aria-hidden="true" />
            </span>
            <small>UN ÉCHANGE DE VIVE VOIX</small>
            <h3>Appelez-moi</h3>
            <p>06 18 08 55 98</p>
            <ArrowUpRight
              className="contact-choice-arrow"
              size={25}
              aria-hidden="true"
            />
          </a>
          <a
            href="https://wa.me/33618085598?text=Bonjour%2C%20je%20souhaite%20vous%20parler%20de%20petits%20travaux."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("whatsapp", "contact")}
            className="contact-choice"
          >
            <span className="contact-choice-icon whatsapp-icon">
              <MessageCircle size={26} aria-hidden="true" />
            </span>
            <small>UN MESSAGE, UNE PHOTO</small>
            <h3>Sur WhatsApp</h3>
            <p>Écrivez-moi directement</p>
            <ArrowUpRight
              className="contact-choice-arrow"
              size={25}
              aria-hidden="true"
            />
          </a>
          <a
            href="mailto:hatf30190@gmail.com"
            onClick={() => trackContactClick("email", "contact")}
            className="contact-choice"
          >
            <span className="contact-choice-icon">
              <Mail size={26} aria-hidden="true" />
            </span>
            <small>À VOTRE RYTHME</small>
            <h3>Par e-mail</h3>
            <p>hatf30190@gmail.com</p>
            <ArrowUpRight
              className="contact-choice-arrow"
              size={25}
              aria-hidden="true"
            />
          </a>
        </Reveal>
        <div className="contact-hours">
          <p>
            <span className="status-dot" /> Lundi au samedi{" "}
            <strong>8 h – 18 h</strong>
          </p>
          <p>
            Dimanche matin : extrême urgence uniquement, selon disponibilité.
          </p>
        </div>
      </div>
    </section>
  );
}
