import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import ServiceContactCta from "./ServiceContactCta";
import ServiceStructuredData from "./ServiceStructuredData";
import { serviceAreaNames } from "../data/service-areas";

type Props = {
  name: string;
  breadcrumbName: string;
  path: string;
  description: string;
  title: string;
  intro: string;
  image: string;
  quoteService: string;
  items: string[];
  scope: string;
  exclusions: string;
};
const otherServices = [
  ["Électricité", "/electricite"],
  ["Plomberie", "/plomberie"],
  ["Peinture", "/peinture"],
  ["Menuiserie", "/menuiserie"],
  ["Piscine", "/entretien-piscine"],
  ["Dépannage", "/depannage"],
  ["Résidences & gîtes", "/residences-secondaires-gites"],
];
export default function ServiceDetail(props: Props) {
  return (
    <>
      <Header />
      <ServiceStructuredData
        name={props.name}
        description={props.description}
        path={props.path}
        breadcrumbName={props.breadcrumbName}
      />
      <main id="contenu-principal" className="compact-detail">
        <section className="compact-detail-hero">
          <div className="site-container">
            <nav aria-label="Fil d’Ariane" className="service-breadcrumb">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{props.breadcrumbName}</span>
            </nav>
            <div className="compact-detail-hero-grid">
              <div>
                <p className="eyebrow">HOMEATOUTFAIRE · SAINTE-ANASTASIE</p>
                <h1>{props.title}</h1>
                <p>{props.intro}</p>
                <ServiceContactCta
                  location={`${props.path.slice(1)}_page`}
                  service={props.quoteService}
                />
              </div>
              <div className="compact-detail-photo">
                <Image
                  src={props.image}
                  alt={`Illustration de prestation : ${props.name}`}
                  fill
                  sizes="(max-width:767px) 100vw, 35vw"
                  preload
                />
                <span className="image-provenance">
                  Illustration de prestation
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="compact-detail-content">
          <div className="site-container">
            <div className="compact-detail-grid">
              <div>
                <h2>Les interventions proposées</h2>
                <ul className="detail-interventions">
                  {props.items.map((item) => (
                    <li key={item}>
                      <Check size={17} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="detail-scope">{props.scope}</p>
              </div>
              <aside className="detail-boundaries">
                <p className="eyebrow">LE CADRE DE MON INTERVENTION</p>
                <p>{props.exclusions}</p>
                <p className="detail-local">
                  <MapPin size={18} aria-hidden="true" />
                  <span>
                    Jusqu’à environ 50 km de Sainte-Anastasie, selon le travail
                    et les disponibilités.
                  </span>
                </p>
                <details>
                  <summary>Les communes desservies</summary>
                  <p>{serviceAreaNames.slice(0, -1).join(" · ")}</p>
                </details>
              </aside>
            </div>
            <div className="detail-next">
              <p>
                La prestation et le tarif sont convenus avant de planifier
                l’intervention.
              </p>
              <Link
                href={`/?service=${encodeURIComponent(props.quoteService)}#devis`}
                className="text-link"
              >
                Parlons de votre besoin{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <nav
              aria-label="Autres prestations"
              className="detail-other-services"
            >
              {otherServices
                .filter(([, href]) => href !== props.path)
                .map(([label, href]) => (
                  <Link key={href} href={href}>
                    {label}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ))}
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
