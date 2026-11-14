"use client";
import {
  ArrowUpRight,
  ClipboardList,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
} from "lucide-react";
import QuoteForm from "./QuoteForm";
import About from "./About";
import Stats from "./Stats";
import ServiceArea from "./ServiceArea";
import { trackContactClick } from "../lib/analytics";
import useDisclosureAnchors from "../lib/use-disclosure-anchors";

export default function Quote() {
  useDisclosureAnchors();
  return (
    <section id="contact" className="contact-hub">
      <div className="site-container">
        <div className="compact-section-heading">
          <div>
            <p className="eyebrow">CONTACT & DEVIS</p>
            <h2>
              On en <em>parle ?</em>
            </h2>
          </div>
          <p>
            Votre besoin, une réponse directe. Demande gratuite et sans
            engagement.
          </p>
        </div>
        <div className="hub-contact-options">
          <a
            href="tel:0618085598"
            onClick={() => trackContactClick("phone", "contact")}
          >
            <Phone size={22} aria-hidden="true" />
            <span>
              <small>PAR TÉLÉPHONE</small>
              <strong>06 18 08 55 98</strong>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/33618085598?text=Bonjour%2C%20je%20souhaite%20vous%20parler%20de%20petits%20travaux."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("whatsapp", "contact")}
          >
            <MessageCircle size={22} aria-hidden="true" />
            <span>
              <small>UN MESSAGE, UNE PHOTO</small>
              <strong>Sur WhatsApp</strong>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            href="mailto:hatf30190@gmail.com"
            onClick={() => trackContactClick("email", "contact")}
          >
            <Mail size={22} aria-hidden="true" />
            <span>
              <small>PAR E-MAIL</small>
              <strong>hatf30190@gmail.com</strong>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <p className="hub-hours">
          Lundi – samedi : <strong>8 h – 18 h</strong>. Dimanche matin : extrême
          urgence uniquement, selon disponibilité.
        </p>
        <div className="hub-essentials">
          <About />
          <div className="hub-details">
            <details id="fonctionnement">
              <summary>
                Comment se passe une intervention ?{" "}
                <Plus size={17} aria-hidden="true" />
              </summary>
              <Stats />
            </details>
            <details id="zone-intervention">
              <summary>
                <span>
                  <MapPin size={16} aria-hidden="true" /> Jusqu’à environ 50 km
                  de Sainte-Anastasie
                </span>
                <Plus size={17} aria-hidden="true" />
              </summary>
              <ServiceArea />
            </details>
            <details id="questions">
              <summary>
                Photos, tarif, petite urgence : les réponses{" "}
                <Plus size={17} aria-hidden="true" />
              </summary>
              <div className="hub-answers">
                <h4>Faut-il envoyer des photos ?</h4>
                <p>
                  Ce n’est pas obligatoire. Elles peuvent aider à comprendre
                  votre besoin. Vous pourrez les transmettre par e-mail ou
                  WhatsApp lors de notre échange.
                </p>
                <h4>Comment le prix est-il défini ?</h4>
                <p>
                  La prestation et le tarif sont convenus ensemble avant de
                  planifier l’intervention.
                </p>
                <h4>Et pour une petite urgence ?</h4>
                <p>
                  Appelez-moi pour vérifier la prise en charge et mes
                  disponibilités. Le dimanche matin est réservé aux dépannages
                  d’extrême urgence, selon disponibilité.
                </p>
              </div>
            </details>
          </div>
        </div>
        <details id="devis" className="quote-disclosure">
          <summary>
            <span className="quote-summary-icon">
              <ClipboardList size={25} aria-hidden="true" />
            </span>
            <span>
              <strong>Demander un devis gratuit</strong>
              <small>
                Un téléphone ou un e-mail suffit pour vous recontacter.
              </small>
            </span>
            <Plus size={23} aria-hidden="true" />
          </summary>
          <div className="quote-frame">
            <QuoteForm />
          </div>
        </details>
      </div>
    </section>
  );
}
