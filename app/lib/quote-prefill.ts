/** Local UI handoff only; no network request and no personal-data persistence. */
export const QUOTE_PREFILL_EVENT = "hatf:quote-prefill";
export function prefillQuote(fields: {
  service?: string;
  commune?: string;
  message?: string;
}) {
  window.dispatchEvent(
    new window.CustomEvent(QUOTE_PREFILL_EVENT, { detail: fields }),
  );
}
