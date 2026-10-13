import Link from "next/link";
import { ArrowRight, MapPin, Navigation, Radar } from "lucide-react";

const nearbyAreas = [
  { name: "Uzès", className: "left-[42%] top-[8%]" },
  { name: "Dions", className: "left-[10%] top-[27%]" },
  { name: "La Calmette", className: "right-[6%] top-[24%]" },
  { name: "Saint-Chaptes", className: "right-[2%] top-[51%]" },
  { name: "Poulx", className: "right-[13%] bottom-[12%]" },
  { name: "Nîmes", className: "left-[8%] bottom-[14%]" },
  { name: "Marguerittes", className: "left-[2%] top-[53%]" },
];

export default function ServiceArea() {
  return (
    <section
      id="zone-intervention"
      aria-labelledby="zone-intervention-title"
      className="relative scroll-mt-[78px] overflow-hidden bg-[#071F35] px-5 py-14 text-white sm:px-8 sm:py-18 lg:px-10 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-yellow-400/10 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16">
        <div>
          <span className="inline-flex rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-yellow-300 sm:text-xs">
            Zone d&apos;intervention
          </span>

          <h2
            id="zone-intervention-title"
            className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.55rem]"
          >
            Autour de Sainte-Anastasie, jusqu&apos;à environ 50 km
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-blue-100/75 sm:text-lg sm:leading-8">
            La possibilité d&apos;intervention dépend du type de travaux, de la
            distance et des disponibilités. Un code postal suffit pour vérifier.
          </p>

          <div className="mt-6 flex items-start gap-3 border-l-2 border-yellow-300/70 pl-4 text-sm leading-6 text-blue-100/70">
            <Navigation
              size={20}
              strokeWidth={2.2}
              className="mt-0.5 shrink-0 text-yellow-300"
              aria-hidden="true"
            />
            <p>
              Entreprise mobile : aucun accueil du public n&apos;est assuré à
              l&apos;adresse administrative.
            </p>
          </div>

          <Link
            href="/#devis"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-[#06192B] shadow-[0_14px_35px_rgba(250,204,21,.18)] transition-all hover:-translate-y-0.5 hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300"
          >
            Vérifier ma commune
            <ArrowRight size={17} strokeWidth={2.3} aria-hidden="true" />
          </Link>
        </div>

        <div className="relative mx-auto aspect-[1.2/1] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-[0_24px_70px_rgba(0,0,0,.24)] backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[82%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-200/12"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[58%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-200/18"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[35%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-yellow-300/30 bg-yellow-300/[0.035]"
          />

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-[#06192B] shadow-[0_0_35px_rgba(250,204,21,.34)] sm:h-16 sm:w-16">
              <MapPin size={28} strokeWidth={2.3} aria-hidden="true" />
            </div>
            <p className="mt-2 whitespace-nowrap text-sm font-bold sm:text-base">
              Sainte-Anastasie
            </p>
            <p className="mt-0.5 whitespace-nowrap text-[11px] text-blue-100/55 sm:text-xs">
              point de départ
            </p>
          </div>

          {nearbyAreas.map((area) => (
            <span
              key={area.name}
              className={`absolute ${area.className} inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0A3153]/92 px-2.5 py-1.5 text-[10px] font-semibold text-blue-50 shadow-lg sm:px-3 sm:text-xs`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {area.name}
            </span>
          ))}

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#06192B]/75 px-3 py-1.5 text-[10px] text-blue-100/60 sm:bottom-4 sm:text-xs">
            <Radar size={14} strokeWidth={2.2} aria-hidden="true" />
            Représentation indicative, non cartographique
          </div>
        </div>
      </div>
    </section>
  );
}
