"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  House,
  ClipboardList,
} from "lucide-react";
import { services } from "../data/services";
import { trackQuoteClick } from "../lib/analytics";
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
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % services.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + services.length) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <section id="services" className="compact-services">
      <div className="site-container">
        <div className="compact-section-heading">
          <div>
            <p className="eyebrow">LES PRESTATIONS</p>
            <h2>
              De quoi avez-vous <em>besoin ?</em>
            </h2>
          </div>
          <p>Choisissez un sujet. Les exemples et le cadre sont juste ici.</p>
        </div>
        <div
          className="catalog-tabs"
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
              >
                <TabIcon size={24} aria-hidden="true" />
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>
        <div
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${selected}`}
          tabIndex={0}
          className="catalog-panel"
        >
          <div className="catalog-intro">
            <span className="catalog-icon">
              <Icon size={28} aria-hidden="true" />
            </span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
          <ul className="catalog-examples">
            {service.examples.map((example) => (
              <li key={example}>
                <Check size={16} aria-hidden="true" />
                {example}
              </li>
            ))}
          </ul>
          <p className="catalog-scope">
            <strong>Le cadre :</strong> {service.scope}
          </p>
          <div className="catalog-actions">
            <Link href={service.href} className="text-link">
              Toutes les prestations en détail{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="catalog-prepare"
              onClick={() => openPlanner(service.quoteService)}
            >
              <ClipboardList size={16} aria-hidden="true" /> Préparer ma demande
            </button>
            <Link
              href={`/?service=${encodeURIComponent(service.quoteService)}#devis`}
              className="btn btn-navy service-quote"
              onClick={() => {
                prefillQuote({ service: service.quoteService });
                trackQuoteClick("service_explorer", service.quoteService);
              }}
            >
              Demander un devis <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <Link
          href="/residences-secondaires-gites"
          className="catalog-second-home"
        >
          <House size={21} aria-hidden="true" />
          <span>
            <strong>Résidences secondaires & gîtes</strong>{" "}
            <span>
              Petits travaux et entretien courant, avec le même interlocuteur.
            </span>
          </span>
          <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
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
