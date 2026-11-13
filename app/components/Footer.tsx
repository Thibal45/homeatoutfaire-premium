import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import TrackedSocialLink from "./TrackedSocialLink";
import TrackedContactLink from "./TrackedContactLink";

const links = [
  ["Petits travaux électriques", "/electricite"],
  ["Petits travaux de plomberie", "/plomberie"],
  ["Peinture", "/peinture"],
  ["Petite menuiserie", "/menuiserie"],
  ["Entretien de piscine", "/entretien-piscine"],
  ["Petit dépannage", "/depannage"],
  ["Résidences secondaires & gîtes", "/residences-secondaires-gites"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link
              href="/"
              className="footer-brand"
              aria-label="Accueil HomeAToutFaire"
            >
              Home<span>AToutFaire</span>
              <span className="brand-dot">.</span>
            </Link>
            <p>
              Les petits travaux.
              <br />
              La confiance en plus.
            </p>
            <span className="footer-location">
              <MapPin size={15} aria-hidden="true" /> Sainte-Anastasie · Gard
            </span>
          </div>
          <div className="footer-services">
            <h2>Un coup de main pour…</h2>
            <nav aria-label="Services HomeAToutFaire">
              {links.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-contact">
            <h2>On en parle ?</h2>
            <TrackedContactLink
              href="tel:0618085598"
              method="phone"
              location="footer"
              className="footer-phone"
            >
              06 18 08 55 98
            </TrackedContactLink>
            <TrackedContactLink
              href="mailto:hatf30190@gmail.com"
              method="email"
              location="footer"
              className="footer-email"
            >
              hatf30190@gmail.com
            </TrackedContactLink>
            <p>
              Lundi au samedi · 8 h – 18 h<br />
              Dimanche matin : extrême urgence,
              <br />
              selon disponibilité.
            </p>
            <div className="footer-socials">
              <TrackedSocialLink
                href="https://www.facebook.com/profile.php?id=61595599822418"
                platform="facebook"
                location="footer"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                Facebook <ArrowUpRight size={14} aria-hidden="true" />
              </TrackedSocialLink>
              <TrackedSocialLink
                href="https://www.instagram.com/home.atoutfaire30/"
                platform="instagram"
                location="footer"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                Instagram <ArrowUpRight size={14} aria-hidden="true" />
              </TrackedSocialLink>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} HomeAToutFaire · Thibaut SACHOT ·
            SIRET 10665167200011
          </p>
          <nav aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
