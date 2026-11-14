"use client";
import { useEffect } from "react";
import { QUOTE_PREFILL_EVENT } from "./quote-prefill";

/** Open the relevant detail before anchor navigation, without altering the URL or form. */
export default function useDisclosureAnchors() {
  useEffect(() => {
    function reveal(hash: string) {
      let id: string;
      try {
        id = decodeURIComponent(hash.replace(/^#/, ""));
      } catch {
        return;
      }
      let target = document.getElementById(id);
      while (target) {
        if (target.tagName === "DETAILS")
          (target as HTMLDetailsElement).open = true;
        target = target.parentElement;
      }
    }
    const readHash = () => reveal(window.location.hash);
    const openQuote = () => reveal("#devis");
    function onLink(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const url = new URL(
        link.getAttribute("href") ?? "",
        window.location.href,
      );
      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.hash
      )
        reveal(url.hash);
    }
    const timer = window.setTimeout(readHash, 0);
    document.addEventListener("click", onLink, true);
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    window.addEventListener(QUOTE_PREFILL_EVENT, openQuote);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onLink, true);
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
      window.removeEventListener(QUOTE_PREFILL_EVENT, openQuote);
    };
  }, []);
}
