import Link from "next/link";
import { CheckCircle2, MapPinned, Navigation } from "lucide-react";

const mainAreas = [
  "Sainte-Anastasie",
  "Dions",
  "La Calmette",
  "Saint-Chaptes",
  "Poulx",
  "Nîmes",
  "Marguerittes",
  "Uzès",
];

export default function ServiceArea() {
  return (
    <section
      id="zone-intervention"
      aria-labelledby="zone-intervention-title"
      className="relative scroll-mt-[78px] overflow-hidden bg-slate-50 px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-8 h-72 w-72 rounded-full bg-yellow-200/35 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <span className="inline-flex rounded-full border border-yellow-300/70 bg-yellow-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B88311] sm:text-xs">
            Zone d&apos;intervention
          </span>

          <h2
            id="zone-intervention-title"
            className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#082E50] sm:text-4xl"
          >
            Un service de proximité autour de Sainte-Anastasie
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            HomeAToutFaire se déplace jusqu&apos;à environ 50 km, selon la nature
            de l&apos;intervention, la distance et les disponibilités.
          </p>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
            <Navigation
              size={20}
              strokeWidth={2.2}
              className="mt-0.5 shrink-0 text-[#D5A52E]"
              aria-hidden="true"
            />

            <p>
              Entreprise mobile : aucun accueil du public n&apos;est assuré à
              l&apos;adresse administrative.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#082E50] text-yellow-300">
              <MapPinned size={22} strokeWidth={2.2} aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#082E50] sm:text-base">
                Principales communes desservies
              </p>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Liste indicative, non limitative
              </p>
            </div>
          </div>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {mainAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-700"
              >
                <CheckCircle2
                  size={17}
                  strokeWidth={2.2}
                  className="shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                {area}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-sm leading-6 text-slate-600">
              Votre commune n&apos;apparaît pas ? Indiquez simplement votre code
              postal pour vérifier la possibilité d&apos;intervention.
            </p>

            <Link
              href="/#devis"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#082E50] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0B3A63] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D5A52E]"
            >
              Vérifier ma commune
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
