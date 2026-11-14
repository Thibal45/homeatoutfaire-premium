"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
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
    <div className="local-area">
      <p>
        Jusqu’à environ <strong>50 km autour de Sainte-Anastasie</strong>, selon
        la nature du travail, la distance et mes disponibilités. Entreprise
        mobile, sans accueil du public sur place.
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
      <p className="area-selection">
        <MapPin size={16} aria-hidden="true" />
        <span>
          À <strong>{selected}</strong> : décrivez votre besoin pour confirmer
          la possibilité d’intervention.
        </span>
      </p>
      <Link
        href={`/?commune=${encodeURIComponent(selected)}#devis`}
        className="btn btn-navy"
        onClick={() => prefillQuote({ commune: selected })}
      >
        Parlons de mon intervention{" "}
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
