"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { trackContactClick } from "../lib/analytics";

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
          className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white"
        >
          <MessageCircle size={24} strokeWidth={2} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
