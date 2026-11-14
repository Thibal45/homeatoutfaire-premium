import Image from "next/image";

export default function About() {
  return (
    <div id="a-propos" className="artisan-card">
      <Image
        src="/images/thibaut-sachot-homeatoutfaire.webp"
        width={90}
        height={108}
        sizes="90px"
        alt="Thibaut SACHOT, votre interlocuteur HomeAToutFaire"
      />
      <div>
        <p className="eyebrow">VOTRE INTERLOCUTEUR</p>
        <h3>Thibaut SACHOT</h3>
        <p>
          Installé à Sainte-Anastasie, je prends directement en charge vos
          petits travaux, dépannages et entretiens courants. Du premier échange
          aux finitions, vous échangez avec la personne qui intervient.
        </p>
      </div>
    </div>
  );
}
