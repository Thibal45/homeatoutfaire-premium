"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [protectedSectionVisible, setProtectedSectionVisible] =
    useState(false);

  /* ===============================================================
     APPARITION APRÈS LE DÉBUT DE PAGE
  =============================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ===============================================================
     MASQUAGE SUR GALERIE + DEVIS UNIQUEMENT
  =============================================================== */

  useEffect(() => {
    const selectors = [
      "#galerie",
      "#devis",
    ];

    const elements = selectors
      .map((selector) => document.querySelector(selector))
      .filter((element): element is Element => element !== null);

    if (elements.length === 0) return;

    const visibleSections = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target);
          } else {
            visibleSections.delete(entry.target);
          }
        });

        setProtectedSectionVisible(visibleSections.size > 0);
      },
      {
        threshold: 0.08,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ===============================================================
     RETOUR EN HAUT
  =============================================================== */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ===============================================================
     VISIBILITÉ FINALE
  =============================================================== */

  const showButton =
    visible && !protectedSectionVisible;

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{
            opacity: 0,
            y: 16,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 16,
            scale: 0.9,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          whileHover={{
            y: -4,
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.94,
          }}
          aria-label="Retour en haut de la page"
          title="Retour en haut"
          className="
            fixed
            bottom-5
            right-5
            z-50
            flex
            h-13
            w-13
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-300
            sm:bottom-6
            sm:right-6
            sm:h-14
            sm:w-14
          "
          style={{
            backgroundColor: "#D5A52E",
            borderColor: "#9A6D0A",
            color: "#082E50",
            boxShadow:
              "0 10px 30px rgba(15, 23, 42, 0.38)",
          }}
        >
          <ChevronUp
            size={28}
            strokeWidth={3}
            color="#082E50"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}