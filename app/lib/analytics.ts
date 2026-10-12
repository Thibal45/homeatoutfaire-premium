type GtagParameters = Record<string, string | number | boolean>;

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters?: GtagParameters,
  ) => void;
};

export type ContactMethod = "email" | "phone" | "whatsapp";

function trackEvent(eventName: string, parameters?: GtagParameters) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.("event", eventName, parameters);
}

export function trackContactClick(
  method: ContactMethod,
  location: string,
  service?: string,
) {
  trackEvent(`click_${method}`, {
    contact_method: method,
    location,
    ...(service ? { service } : {}),
  });
}

export function trackQuoteClick(location: string, service?: string) {
  trackEvent("click_quote", {
    location,
    ...(service ? { service } : {}),
  });
}

export function trackQuoteSent(
  service?: string,
  contactMethod?: string,
) {
  const details = {
    form_name: "quote_form",
    ...(service ? { service } : {}),
    ...(contactMethod ? { contact_method: contactMethod } : {}),
  };

  // Conserve l'événement historique et ajoute l'événement recommandé par GA4.
  trackEvent("quote_sent", details);
  trackEvent("generate_lead", {
    ...details,
    lead_source: "website_quote_form",
  });
}
