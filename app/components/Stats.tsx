"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  MessageCircle,
} from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    title: "Vous me racontez.",
    icon: MessageCircle,
    summary: "Un besoin, quelques mots, et on commence.",
    detail:
      "Décrivez le petit travail par téléphone, WhatsApp ou formulaire. Une photo peut aider à comprendre la situation. Aucune inscription à créer.",
    label: "Décrire mon besoin",
  },
  {
    title: "On fait le point.",
    icon: ClipboardCheck,
    summary: "Une prise en charge et un devis clairs.",
    detail:
      "Je vérifie que la demande entre dans mes prestations. Nous précisons ensemble le travail à réaliser et le tarif avant de convenir d’une intervention.",
    label: "Demander un devis gratuit",
  },
  {
    title: "Je m’en occupe.",
    icon: CalendarCheck,
    summary: "Un créneau convenu. Un travail soigné.",
    detail:
      "Une fois la prestation et le tarif acceptés, nous organisons l’intervention selon nos disponibilités. Vous gardez le même interlocuteur jusqu’à la fin.",
    label: "Préparer mon projet",
  },
];

export default function Stats() {
  const [active, setActive] = useState(0);
  const Icon = steps[active].icon;
  return (
    <section id="fonctionnement" className="section-space process-section">
      <div className="site-container">
        <Reveal className="process-heading">
          <p className="eyebrow">
            <span className="eyebrow-line" /> 03 / LA MÉTHODE
          </p>
          <h2 className="display-title">
            Les travaux, oui.
            <br />
            <span>Les complications, on évite.</span>
          </h2>
          <p>Trois étapes, un seul interlocuteur.</p>
        </Reveal>
        <Reveal className="process-layout">
          <div className="process-steps">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                className={`process-step ${active === index ? "is-active" : ""}`}
                aria-expanded={active === index}
                aria-controls="process-detail"
                onClick={() => setActive(index)}
              >
                <span className="process-number">0{index + 1}</span>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.summary}</small>
                </span>
                <ArrowRight size={22} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="process-detail" className="process-detail" key={active}>
            <span className="process-detail-step">ÉTAPE 0{active + 1}</span>
            <span className="process-detail-icon">
              <Icon size={40} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <h3>{steps[active].title}</h3>
            <p>{steps[active].detail}</p>
            <a href="#devis" className="text-link">
              {steps[active].label} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <span className="process-dots" aria-hidden="true">
              {steps.map((_, index) => (
                <i key={index} className={active === index ? "active" : ""} />
              ))}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
