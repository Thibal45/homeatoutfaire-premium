"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import Reveal from "./Reveal";
import { prefillQuote } from "../lib/quote-prefill";

const places = [
  "Sainte-Anastasie",
  "Dions",
  "La Calmette",
  "Saint-Chaptes",
  "Saint-Geniès-de-Malgoirès",
  "Poulx",
  "Nîmes",
  "Marguerittes",
  "Uzès",
];

export default function ServiceArea() {
  const [selected, setSelected] = useState("Sainte-Anastasie");
  return (
    <section
      id="zone-intervention"
      aria-labelledby="zone-intervention-title"
      className="section-space area-section"
    >
      <div className="site-container area-grid">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-line" /> UN ARTISAN TOUT PRÈS
          </p>
          <h2 id="zone-intervention-title" className="display-title">
            Un service d’ici.
            <br />
            <span>Près de chez vous.</span>
          </h2>
          <p className="area-intro">
            Basé à Sainte-Anastasie, je me déplace dans les communes voisines,
            jusqu’à environ 50 km selon votre besoin et mes disponibilités.
          </p>
          <div className="area-places" aria-label="Choisir une commune">
            {places.map((place) => (
              <button
                key={place}
                type="button"
                aria-pressed={selected === place}
                onClick={() => setSelected(place)}
              >
                {place}
              </button>
            ))}
          </div>
          <div className="area-selection">
            <MapPin size={19} aria-hidden="true" />
            <p>
              Vous êtes à <strong>{selected}</strong> ?<br />
              <span>
                Décrivez votre besoin pour confirmer la possibilité
                d’intervention.
              </span>
            </p>
          </div>
          <Link
            href={`/?commune=${encodeURIComponent(selected)}#devis`}
            className="btn btn-gold"
            onClick={() => prefillQuote({ commune: selected })}
          >
            Parlons de mon intervention{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <p className="area-small">
            <Navigation size={14} aria-hidden="true" /> Entreprise mobile · Sans
            accueil du public sur place.
          </p>
        </Reveal>
        <Reveal className="area-visual" delay={100}>
          <div className="area-orbit orbit-one" />
          <div className="area-orbit orbit-two" />
          <div className="area-orbit orbit-three" />
          <div className="area-visual-center">
            <MapPin size={36} strokeWidth={1.6} aria-hidden="true" />
            <span className="area-distance">
              50<small>km</small>
            </span>
            <p>
              environ, autour de
              <br />
              <strong>Sainte-Anastasie</strong>
            </p>
          </div>
          <span className="area-point point-top">Uzès</span>
          <span className="area-point point-left">La Calmette</span>
          <span className="area-point point-right">Nîmes</span>
          <span className="area-visual-note">
            Schéma de proximité, non cartographique.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
