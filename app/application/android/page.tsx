import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  Camera,
  Check,
  ClipboardList,
  House,
  ShieldCheck,
  WifiOff,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import release from "../../data/android-release.json";
import "./download.css";

export const metadata: Metadata = {
  title: "L’application Android HomeAToutFaire",
  description:
    "Le carnet Android HomeAToutFaire : préparez vos petits travaux, conservez vos notes et photos sur votre téléphone et partagez votre demande.",
  alternates: { canonical: "/application/android" },
};

export default function AndroidPage() {
  return (
    <>
      <Header />
      <main id="contenu-principal" className="android-download">
        <div className="site-container android-download-grid">
          <div className="android-download-copy">
            <Link href="/" className="android-back">
              ← Retour au site
            </Link>
            <p className="android-eyebrow">HOMEATOUTFAIRE · ANDROID</p>
            <h1>
              Vos petits projets.
              <br />
              <em>Dans votre poche.</em>
            </h1>
            <p className="android-intro">
              Préparez vos travaux, gardez vos notes et vos photos, puis
              parlez-en à Thibaut. Votre carnet vous accompagne, même quand la
              connexion ne suit pas.
            </p>
            <div className="android-benefits">
              <span>
                <WifiOff size={18} /> Carnet hors connexion
              </span>
              <span>
                <Camera size={18} /> Photos choisies par vous
              </span>
              <span>
                <ShieldCheck size={18} /> Sans compte client
              </span>
            </div>
            {release.available ? (
              <>
                <a
                  className="btn btn-primary android-download-button"
                  href={release.apkPath}
                  download="HomeAToutFaire-Android-1.0.0.apk"
                >
                  <ArrowDownToLine size={20} /> Télécharger pour Android
                </a>
                <p className="android-file-meta">
                  Première version à tester · {release.version} ·{" "}
                  {(release.bytes / 1048576).toLocaleString("fr-FR", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  Mo · Android 7 ou ultérieur
                </p>
                <p className="android-download-note">
                  Fichier d’installation fourni directement par HomeAToutFaire.
                  La version Google Play n’est pas encore publiée.
                </p>
              </>
            ) : (
              <p className="android-pending">
                Le fichier Android est en cours de préparation. Vous pouvez déjà
                découvrir le carnet en ligne.
              </p>
            )}
            <Link className="android-web-link" href="/application">
              Découvrir le carnet en ligne <ArrowRight size={17} />
            </Link>
          </div>
          <div className="android-phone-wrap">
            <div className="android-phone">
              <div className="android-phone-camera" />
              <div className="android-preview-brand">
                <House size={23} />
                <strong>HomeAToutFaire</strong>
              </div>
              <p className="android-preview-label">
                APERÇU DU CARNET · EXEMPLE
              </p>
              <h2>
                Un petit projet,
                <br />
                <em>un esprit tranquille.</em>
              </h2>
              <div className="android-preview-project">
                <span>
                  <ClipboardList size={25} />
                </span>
                <div>
                  <strong>La porte du salon</strong>
                  <small>Brouillon sur mon appareil</small>
                </div>
                <Check size={18} />
              </div>
              <div className="android-preview-notes">
                <span>MON BESOIN</span>
                <p>Régler la porte et vérifier sa poignée.</p>
                <span>POUR EN PARLER</span>
                <p>Mes notes, mes photos et le même interlocuteur.</p>
              </div>
              <div className="android-preview-action">
                Préparer ma demande <ArrowRight size={17} />
              </div>
              <div className="android-preview-foot">
                <WifiOff size={15} /> Conservé sur mon appareil
              </div>
            </div>
            <span className="android-phone-caption">
              L’essentiel de votre projet, au même endroit.
            </span>
          </div>
        </div>
        <div className="site-container android-download-bottom">
          <div>
            <h2>Vous gardez la main.</h2>
            <p>
              Un brouillon enregistré n’est pas une demande envoyée. Vous
              choisissez ce que vous partagez et le destinataire. La prestation,
              le tarif et le créneau se confirment directement avec Thibaut.
            </p>
            <Link href="/application/confidentialite">
              Confidentialité du carnet <ArrowRight size={15} />
            </Link>
          </div>
          {release.available && (
            <details>
              <summary>Informations sur le fichier</summary>
              <p>
                Version {release.version}. Application signée HomeAToutFaire.
              </p>
              <p>Empreinte SHA-256 :</p>
              <code>{release.sha256}</code>
              <p>
                Les projets du navigateur et ceux de l’application Android sont
                conservés séparément. Exportez vos dossiers importants pour en
                garder une copie.
              </p>
            </details>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
