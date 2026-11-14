"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { trackContactClick, trackQuoteClick } from "../lib/analytics";

export default function WhatsAppButton() {
  const [scrolled, setScrolled] = useState(false);
  const [protectedArea, setProtectedArea] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const elements = [
      document.getElementById("galerie"),
      document.getElementById("devis"),
      document.getElementById("contact"),
      document.querySelector("footer"),
    ].filter((element): element is HTMLElement => element !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setProtectedArea(visible.size > 0);
      },
      { threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        {scrolled && !protectedArea && (
          <motion.a
            href="https://wa.me/33618085598?text=Bonjour%2C%20je%20souhaite%20un%20renseignement%20pour%20des%20petits%20travaux."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter HomeAToutFaire sur WhatsApp"
            title="Écrire sur WhatsApp"
            onClick={() => trackContactClick("whatsapp", "floating_button")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="desktop-contact-float fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white"
          >
            <MessageCircle size={24} strokeWidth={2} aria-hidden="true" />
          </motion.a>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {scrolled && !protectedArea && (
          <motion.nav
            key="mobile-contact"
            className="mobile-contact-dock"
            aria-label="Contact rapide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href="tel:0618085598"
              onClick={() => trackContactClick("phone", "mobile_dock")}
            >
              <Phone size={17} aria-hidden="true" /> Appeler
            </a>
            <a href="/#devis" onClick={() => trackQuoteClick("mobile_dock")}>
              Mon devis <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
