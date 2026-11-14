"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  House,
  MoveUpRight,
} from "lucide-react";
import { services } from "../data/services";
import { trackQuoteClick } from "../lib/analytics";
import Reveal from "./Reveal";
import { prefillQuote } from "../lib/quote-prefill";
import { DISCOVER_SERVICE_EVENT, openPlanner } from "../lib/discovery";

export default function Services() {
  const [selected, setSelected] = useState(2);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const service = services[selected];
  const Icon = service.icon;
  useEffect(() => {
    function receive(event: Event) {
      const index = (event as CustomEvent).detail;
      if (Number.isInteger(index) && index >= 0 && index < services.length)
        setSelected(index);
    }
    window.addEventListener(DISCOVER_SERVICE_EVENT, receive);
    return () => window.removeEventListener(DISCOVER_SERVICE_EVENT, receive);
  }, []);
  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % services.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + services.length) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <section id="services" className="section-space services-section">
      <div className="site-container">
        <Reveal className="section-heading split-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> 01 / LES PRESTATIONS
            </p>
            <h2 className="display-title">
              Une maison.
              <br />
              <span>Plein de petits besoins.</span>
            </h2>
          </div>
          <p>
            Choisissez ce qui vous concerne.
            <br />
            Je vous aide à y voir plus clair.
          </p>
        </Reveal>
        <Reveal className="service-explorer">
          <div
            className="service-tabs"
            role="tablist"
            aria-label="Choisir une prestation"
          >
            {services.map((item, index) => {
              const TabIcon = item.icon;
              return (
                <button
                  key={item.href}
                  ref={(el) => {
                    tabs.current[index] = el;
                  }}
                  id={`service-tab-${index}`}
                  role="tab"
                  type="button"
                  aria-selected={selected === index}
                  aria-controls="service-panel"
                  tabIndex={selected === index ? 0 : -1}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => navigateTabs(event, index)}
                  className={`service-tab ${selected === index ? "is-selected" : ""}`}
                >
                  <span className="service-tab-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <TabIcon size={22} aria-hidden="true" />
                  <span>{item.shortTitle}</span>
                  <ArrowUpRight
                    size={18}
                    className="service-tab-arrow"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${selected}`}
            tabIndex={0}
            className="service-stage"
          >
            <div className="service-stage-photo" key={service.image}>
              <Image
                src={service.image}
                alt={`Illustration de prestation : ${service.title}`}
                fill
                sizes="(max-width: 767px) 100vw, 32vw"
              />
              <span className="image-provenance">
                Illustration de prestation
              </span>
              <span className="service-photo-index">
                0{selected + 1}
                <small>/ 06</small>
              </span>
            </div>
            <div className="service-stage-content" key={service.href}>
              <span className="service-stage-icon">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.examples.map((example) => (
                  <li key={example}>
                    <Check size={16} aria-hidden="true" />
                    {example}
                  </li>
                ))}
              </ul>
              <Link href={service.href} className="text-link">
                Découvrir les prestations{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href={`/?service=${encodeURIComponent(service.quoteService)}#devis`}
                className="btn btn-navy service-quote"
                onClick={() => {
                  prefillQuote({ service: service.quoteService });
                  trackQuoteClick("service_explorer", service.quoteService);
                }}
              >
                Demander un devis <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="service-plan-link"
                onClick={() => openPlanner(service.quoteService)}
              >
                Besoin d’aide pour décrire votre projet ?{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
        <Reveal className="second-home-banner">
          <span className="second-home-icon">
            <House size={25} aria-hidden="true" />
          </span>
          <div>
            <h3>Une résidence secondaire ou un gîte ?</h3>
            <p>
              Regroupez vos petits travaux et votre entretien courant auprès
              d’un seul interlocuteur.
            </p>
          </div>
          <Link href="/residences-secondaires-gites" className="text-link">
            Découvrir l’accompagnement{" "}
            <MoveUpRight size={19} aria-hidden="true" />
          </Link>
        </Reveal>
        <noscript>
          <p className="service-noscript">
            Toutes les prestations :{" "}
            {services.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.title} ·{" "}
              </Link>
            ))}
          </p>
        </noscript>
      </div>
    </section>
  );
}
