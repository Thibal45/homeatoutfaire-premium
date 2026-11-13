import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
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
  ["Petits travaux électriques", "/electricite"],
  ["Petits travaux de plomberie", "/plomberie"],
  ["Peinture", "/peinture"],
  ["Petite menuiserie", "/menuiserie"],
  ["Entretien de piscine", "/entretien-piscine"],
  ["Petit dépannage", "/depannage"],
  ["Résidences secondaires & gîtes", "/residences-secondaires-gites"],
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
      <main id="contenu-principal" className="service-detail-page">
        <section className="service-detail-hero">
          <div className="site-container">
            <nav aria-label="Fil d’Ariane" className="service-breadcrumb">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{props.breadcrumbName}</span>
            </nav>
            <div className="service-detail-hero-grid">
              <div className="service-detail-hero-copy hero-enter">
                <p className="eyebrow">
                  <span className="eyebrow-line" /> HOMEATOUTFAIRE ·
                  SAINTE-ANASTASIE
                </p>
                <h1>{props.title}</h1>
                <p>{props.intro}</p>
                <div className="service-detail-badges">
                  <span>
                    <Check size={14} aria-hidden="true" /> Devis gratuit
                  </span>
                  <span>
                    <MapPin size={14} aria-hidden="true" /> Près de Nîmes
                  </span>
                  <span>Environ 50 km autour</span>
                </div>
                <ServiceContactCta
                  location={`${props.path.slice(1)}_page`}
                  service={props.quoteService}
                />
              </div>
              <div className="service-detail-photo hero-enter">
                <Image
                  src={props.image}
                  alt={`Illustration de prestation : ${props.name}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 42vw"
                  preload
                />
                <span className="image-provenance">
                  Illustration de prestation
                </span>
                <span className="service-detail-photo-caption">
                  Les petits travaux.
                  <br />
                  <strong>Le soin en plus.</strong>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="section-space service-detail-work">
          <div className="site-container">
            <Reveal className="section-heading split-heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" /> VOTRE BESOIN, CONCRÈTEMENT
                </p>
                <h2 className="display-title">
                  Ce que je peux
                  <br />
                  <span>faire pour vous.</span>
                </h2>
              </div>
              <p>
                Des exemples pour vous repérer.
                <br />
                Chaque demande est étudiée avant déplacement.
              </p>
            </Reveal>
            <Reveal className="service-work-grid">
              {props.items.map((item, index) => (
                <div key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                  <Check size={18} aria-hidden="true" />
                </div>
              ))}
            </Reveal>
            <Reveal className="service-scope">
              <ClipboardCheck size={28} aria-hidden="true" />
              <div>
                <h3>Une intervention adaptée à votre situation.</h3>
                <p>{props.scope}</p>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="service-boundary">
          <div className="site-container service-boundary-content">
            <span>
              <ShieldCheck size={36} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">UN CADRE CLAIR, DÈS LE DÉPART</p>
              <h2>Les bonnes interventions, au bon endroit.</h2>
              <p>{props.exclusions}</p>
            </div>
          </div>
        </section>
        <section className="section-space service-detail-next">
          <div className="site-container">
            <Reveal className="service-next-layout">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" /> ET ENSUITE ?
                </p>
                <h2 className="display-title">
                  On commence
                  <br />
                  <span>par un échange.</span>
                </h2>
                <p>
                  Votre besoin, une photo si nécessaire, et nous vérifions
                  ensemble la prise en charge. La prestation et le tarif sont
                  convenus avant de planifier l’intervention.
                </p>
                <ServiceContactCta
                  location={`${props.path.slice(1)}_page_bottom`}
                  service={props.quoteService}
                />
              </div>
              <div className="service-local-note">
                <MapPin size={28} aria-hidden="true" />
                <h3>
                  À Sainte-Anastasie
                  <br />
                  et aux alentours.
                </h3>
                <p>
                  Interventions jusqu’à environ 50 km, selon la nature du
                  travail, la distance et les disponibilités.
                </p>
                <ul>
                  {serviceAreaNames.slice(0, -1).map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
                <Link href="/#zone-intervention" className="text-link">
                  Voir la zone d’intervention{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <div className="service-more">
              <p>Un autre petit besoin ?</p>
              <nav aria-label="Autres prestations">
                {otherServices
                  .filter(([, href]) => href !== props.path)
                  .map(([label, href]) => (
                    <Link href={href} key={href}>
                      {label}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ))}
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
