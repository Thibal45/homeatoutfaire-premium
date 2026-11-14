import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import TrackedSocialLink from "./TrackedSocialLink";
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
    <footer className="compact-footer">
      <div className="site-container">
        <div className="compact-footer-top">
          <Link
            href="/"
            aria-label="Accueil HomeAToutFaire"
            className="footer-brand"
          >
            Home<span>AToutFaire</span>
            <span className="brand-dot">.</span>
          </Link>
          <a
            href="https://g.page/r/Cf0mvGh1AFkOECE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-review"
          >
            Après une intervention : partager mon avis sur Google{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <details className="footer-directory">
          <summary>
            Les 7 prestations <Plus size={16} aria-hidden="true" />
          </summary>
          <nav aria-label="Services HomeAToutFaire">
            {links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </details>
        <div className="compact-footer-bottom">
          <p>
            © {new Date().getFullYear()} HomeAToutFaire · Thibaut SACHOT ·
            SIRET 10665167200011
          </p>
          <nav aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
          </nav>
          <div className="compact-socials">
            <TrackedSocialLink
              href="https://www.facebook.com/profile.php?id=61595599822418"
              platform="facebook"
              location="footer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </TrackedSocialLink>
            <TrackedSocialLink
              href="https://www.instagram.com/home.atoutfaire30/"
              platform="instagram"
              location="footer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </TrackedSocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
