/** Supplemental browser checks. EmailJS must ALSO enforce reCAPTCHA on the template. */
export const QUOTE_LIMITS = { name: 120, phone: 40, email: 254, address: 200, message: 5000 };
export const QUOTE_COOLDOWN_MS = 60_000;
export const QUOTE_COOLDOWN_KEY = "hatf:last-quote-sent";

export const QUOTE_SERVICES = [
  "Petits travaux électriques", "Petits travaux de plomberie", "Peinture", "Menuiserie",
  "Entretien piscine - ponctuel ou régulier", "Petit dépannage", "Résidence secondaire / gîte", "Autre",
] as const;

// Exact domains reported in the November 2026 fake-quote campaign, not people's names.
const blockedDomains = [
  "probox.my.id", "onpartage.online", "gopartage.online", "partagepro.online",
  "monpartage.online", "mondocs.my.id",
];

export function containsBlockedDomain(value: string) {
  const normalized = value.normalize("NFKC").replace(/[\u200B-\u200D\uFEFF]/g, "").toLowerCase();
  return blockedDomains.some((domain) => {
    const escaped = domain.replace(/\./g, "\\.");
    return new RegExp(`(?:^|[^a-z0-9_-])${escaped}(?=$|[^a-z0-9_.-]|\\.(?:$|\\s))`, "i").test(normalized);
  });
}

export type QuoteFields = {
  name: string; phone: string; email: string; address: string; service: string; message: string;
};

export function validateQuote(fields: QuoteFields): string | null {
  for (const field of Object.keys(QUOTE_LIMITS) as (keyof typeof QUOTE_LIMITS)[]) {
    if (fields[field].length > QUOTE_LIMITS[field]) return "Votre demande est trop longue. Merci de raccourcir les informations saisies.";
  }
  if (!fields.name.trim() || !fields.message.trim()) return "Indiquez votre nom et décrivez votre besoin.";
  if (!QUOTE_SERVICES.some((service) => service === fields.service)) return "Sélectionnez une prestation dans la liste.";
  if (!fields.phone.trim() && !fields.email.trim()) return "Indiquez au moins un moyen de contact : téléphone ou adresse e-mail.";
  if (fields.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return "Vérifiez le format de votre adresse e-mail.";
  if (Object.entries(fields).some(([field, value]) => field !== "message" && /[\r\n]/.test(value))) return "Vérifiez les informations saisies dans les champs de contact.";
  if (Object.values(fields).some(containsBlockedDomain)) return "Cette demande contient une adresse ou un lien signalé comme suspect. Retirez-le ou contactez-moi directement par téléphone.";
  return null;
}

export function cooldownRemaining(lastSent: string | null, now = Date.now()) {
  const timestamp = Number(lastSent);
  if (!Number.isFinite(timestamp) || timestamp <= 0 || timestamp > now) return 0;
  return Math.max(0, QUOTE_COOLDOWN_MS - (now - timestamp));
}
