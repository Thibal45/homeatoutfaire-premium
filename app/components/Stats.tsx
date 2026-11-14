const steps = [
  [
    "Vous décrivez votre besoin.",
    "Par téléphone, WhatsApp ou formulaire. Une photo peut aider, sans être obligatoire.",
  ],
  [
    "Nous précisons la prise en charge.",
    "Le travail et le tarif sont convenus avant de planifier l’intervention.",
  ],
  [
    "Nous fixons un créneau.",
    "Selon nos disponibilités, avec le même interlocuteur jusqu’à la fin.",
  ],
];
export default function Stats() {
  return (
    <ol className="work-steps">
      {steps.map(([title, detail], index) => (
        <li key={title}>
          <span aria-hidden="true">0{index + 1}</span>
          <div>
            <h4>{title}</h4>
            <p>{detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
