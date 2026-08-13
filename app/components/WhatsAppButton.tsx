"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  const phone = "33618085598";

  const message =
    "Bonjour, je souhaiterais obtenir un devis pour des travaux avec HomeAToutFaire.";

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message,
  )}`;

  /* ===============================================================
     AFFICHAGE APRÈS LE HERO
  =============================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
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
     DISPARITION AU NIVEAU DU FOOTER
  =============================================================== */

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ===============================================================
     DISPARITION PENDANT LA GALERIE
  =============================================================== */

  useEffect(() => {
    const gallery = document.getElementById("galerie");

    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setGalleryVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(gallery);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ===============================================================
     BULLE DE MESSAGE
  =============================================================== */

  useEffect(() => {
    /*
     * Si le bouton ne doit pas être visible,
     * aucun timer n'est créé.
     *
     * On ne fait volontairement aucun setState()
     * synchrone ici.
     */
    if (!visible || footerVisible || galleryVisible) {
      return;
    }

    const openTimer = window.setTimeout(() => {
      setMessageOpen(true);
    }, 700);

    const closeTimer = window.setTimeout(() => {
      setMessageOpen(false);
    }, 6500);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
    };
  }, [visible, footerVisible, galleryVisible]);

  /* ===============================================================
     VISIBILITÉ RÉELLE DU BOUTON ET DE LA BULLE
  =============================================================== */

  const whatsappVisible =
    visible && !footerVisible && !galleryVisible;

  const bubbleVisible =
    whatsappVisible && messageOpen;

  return (
    <AnimatePresence>
      {whatsappVisible && (
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 18,
            scale: 0.92,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="fixed bottom-5 left-5 z-50 sm:bottom-6 sm:left-6"
        >
          {/* =====================================================
              BULLE DE MESSAGE
          ===================================================== */}

          <AnimatePresence>
            {bubbleVisible && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -12,
                  y: 8,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                  y: 6,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="absolute bottom-[64px] left-0 hidden w-[280px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:block"
              >
                <button
                  type="button"
                  aria-label="Fermer le message WhatsApp"
                  onClick={() => setMessageOpen(false)}
                  className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X
                    size={15}
                    strokeWidth={2.3}
                  />
                </button>

                <div className="pr-7">
                  <p className="text-sm font-bold text-[#082E50]">
                    Besoin d’un renseignement ?
                  </p>

                  <p className="mt-1.5 text-sm leading-5 text-slate-600">
                    Écrivez-nous directement sur WhatsApp.
                  </p>
                </div>

                <div className="absolute -bottom-2 left-5 h-4 w-4 rotate-45 border-b border-r border-slate-200 bg-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* =====================================================
              BOUTON WHATSAPP
          ===================================================== */}

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter HomeAToutFaire sur WhatsApp"
            title="Contacter HomeAToutFaire sur WhatsApp"
            whileHover={{
              y: -3,
              scale: 1.07,
            }}
            whileTap={{
              scale: 0.94,
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-[#25D366] text-white shadow-[0_12px_32px_rgba(15,23,42,0.28)] ring-2 ring-white/70 transition-all duration-300 hover:bg-[#20BD5A] sm:h-13 sm:w-13"
          >
            <MessageCircle
              size={26}
              strokeWidth={2.4}
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}