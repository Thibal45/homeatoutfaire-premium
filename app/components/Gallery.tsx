"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Plus,
  X,
} from "lucide-react";

import { gallery } from "../data/gallery";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  /* =========================================================
     FERMETURE LIGHTBOX
  ========================================================= */

  const closeGallery = useCallback(() => {
    setZoom(1);
    setSelectedIndex(null);
  }, []);

  /* =========================================================
     IMAGE SUIVANTE
  ========================================================= */

  const nextImage = useCallback(() => {
    if (selectedIndex === null) return;

    setZoom(1);

    setSelectedIndex(
      (selectedIndex + 1) % gallery.length,
    );
  }, [selectedIndex]);

  /* =========================================================
     IMAGE PRÉCÉDENTE
  ========================================================= */

  const previousImage = useCallback(() => {
    if (selectedIndex === null) return;

    setZoom(1);

    setSelectedIndex(
      (selectedIndex - 1 + gallery.length) % gallery.length,
    );
  }, [selectedIndex]);

  /* =========================================================
     ZOOM
  ========================================================= */

  const zoomIn = useCallback(() => {
    setZoom((current) =>
      Math.min(current + 0.2, 3),
    );
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) =>
      Math.max(current - 0.2, 1),
    );
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  /* =========================================================
     NAVIGATION CLAVIER
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "+" || event.key === "=") {
        zoomIn();
      }

      if (event.key === "-") {
        zoomOut();
      }

      if (event.key === "0") {
        resetZoom();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    closeGallery,
    nextImage,
    previousImage,
    resetZoom,
    selectedIndex,
    zoomIn,
    zoomOut,
  ]);

  /* =========================================================
     BLOQUER LE SCROLL QUAND LE LIGHTBOX EST OUVERT
  ========================================================= */

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section
      id="galerie"
      className="relative scroll-mt-[68px] overflow-hidden bg-[#F7F9FC] py-14 sm:py-16 lg:py-18"
    >
      {/* =========================================================
          FOND DÉCORATIF
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-sky-200/25 blur-[110px]" />

        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-yellow-200/25 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,46,80,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(8,46,80,0.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* =========================================================
          CONTENEUR PRINCIPAL
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-10 xl:px-12">
        {/* =======================================================
            LARGEUR COMMUNE EN-TÊTE + PHOTOS
        ======================================================= */}

        <div
          className="w-full"
          style={{
            width: "100%",
            maxWidth: "1360px",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* =====================================================
              EN-TÊTE PARFAITEMENT CENTRÉ
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mb-11 flex w-full flex-col items-center justify-center sm:mb-12"
            style={{
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            {/* BADGE */}

            <span
              className="inline-flex rounded-full border border-yellow-300/70 bg-yellow-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#B88311]"
              style={{
                alignSelf: "center",
              }}
            >
              Nos réalisations
            </span>

            {/* TITRE */}

            <h2
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#082E50] sm:text-[2.15rem] lg:text-[2.35rem]"
              style={{
                width: "100%",
                maxWidth: "960px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
                textAlign: "center",
                textIndent: 0,
                boxSizing: "border-box",
              }}
            >
              Quelques exemples de nos interventions
            </h2>

            {/* SOUS-TITRE */}

            <p
              className="mt-3 text-base leading-7 text-slate-600 sm:text-lg"
              style={{
                width: "100%",
                maxWidth: "960px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
                textAlign: "center",
                textIndent: 0,
                boxSizing: "border-box",
              }}
            >
              Découvrez quelques réalisations représentatives du savoir-faire
              HomeAToutFaire.
            </p>

            {/* BARRE JAUNE */}

            <div
              className="mt-4 h-1 w-16 rounded-full bg-[#D5A52E]"
              style={{
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </motion.div>

          {/* =====================================================
              GRILLE DES RÉALISATIONS
          ===================================================== */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {gallery.map((photo, index) => (
              <motion.article
                key={photo.image}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                }}
                onClick={() => {
                  setZoom(1);
                  setSelectedIndex(index);
                }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-yellow-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.15)]"
              >
                {/* PHOTO PLUS COMPACTE */}

                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  {/* DÉGRADÉ */}

                  <div className="absolute inset-0 bg-linear-to-t from-[#06192B]/90 via-[#06192B]/15 to-transparent" />

                  {/* BADGE */}

                  <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-[#082E50] shadow-lg backdrop-blur-md">
                    Réalisation
                  </div>

                  {/* ICÔNE ZOOM */}

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[#06192B]/60 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                    <Maximize2
                      size={17}
                      strokeWidth={2.3}
                    />
                  </div>

                  {/* INFORMATIONS */}

                  <div className="absolute inset-x-3.5 bottom-3.5 rounded-2xl border border-white/20 bg-[#06192B]/35 px-4 py-3 backdrop-blur-xl sm:px-4 sm:py-3.5">
                    <h3 className="text-lg font-bold leading-tight text-white sm:text-xl">
                      {photo.title}
                    </h3>

                    <p className="mt-1 text-xs text-blue-100/75 sm:text-sm">
                      Travail réalisé par HomeAToutFaire
                    </p>

                    <div className="mt-2 flex items-center justify-between text-xs font-semibold text-yellow-300 sm:text-sm">
                      <span>
                        Voir la réalisation
                      </span>

                      <ChevronRight
                        size={18}
                        strokeWidth={2.4}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          LIGHTBOX
      ========================================================= */}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Réalisation : ${gallery[selectedIndex].title}`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={closeGallery}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020811]/95 p-4 backdrop-blur-lg sm:p-6"
          >
            {/* ===================================================
                BARRE SUPÉRIEURE
            =================================================== */}

            <div className="absolute inset-x-4 top-4 z-30 flex items-center justify-between sm:inset-x-6 sm:top-6">
              {/* TITRE */}

              <div className="max-w-[55%] rounded-2xl border border-white/10 bg-white/8 px-4 py-2.5 text-white backdrop-blur-xl">
                <p className="truncate text-sm font-semibold sm:text-base">
                  {gallery[selectedIndex].title}
                </p>

                <p className="mt-0.5 text-xs text-white/55">
                  {selectedIndex + 1} / {gallery.length}
                </p>
              </div>

              {/* OUTILS */}

              <div
                className="flex items-center gap-2"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                <LightboxButton
                  label="Zoom arrière"
                  onClick={zoomOut}
                  disabled={zoom <= 1}
                >
                  <Minus size={20} />
                </LightboxButton>

                <LightboxButton
                  label="Réinitialiser le zoom"
                  onClick={resetZoom}
                >
                  <Maximize2 size={18} />
                </LightboxButton>

                <LightboxButton
                  label="Zoom avant"
                  onClick={zoomIn}
                  disabled={zoom >= 3}
                >
                  <Plus size={20} />
                </LightboxButton>

                <LightboxButton
                  label="Fermer la galerie"
                  onClick={closeGallery}
                  danger
                >
                  <X size={21} />
                </LightboxButton>
              </div>
            </div>

            {/* ===================================================
                BOUTON PRÉCÉDENT
            =================================================== */}

            <motion.button
              type="button"
              aria-label="Image précédente"
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-3 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-xl transition-colors hover:bg-yellow-400 hover:text-[#06192B] sm:left-6 sm:h-14 sm:w-14"
            >
              <ChevronLeft
                size={28}
                strokeWidth={2.2}
              />
            </motion.button>

            {/* ===================================================
                IMAGE PRINCIPALE
            =================================================== */}

            <motion.div
              drag={zoom > 1}
              dragMomentum={false}
              dragElastic={0.05}
              whileDrag={{
                cursor: "grabbing",
              }}
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              onWheel={(event) => {
                event.stopPropagation();

                if (event.deltaY < 0) {
                  zoomIn();
                } else {
                  zoomOut();
                }
              }}
              onDoubleClick={(event) => {
                event.stopPropagation();

                setZoom((current) =>
                  current === 1 ? 2 : 1,
                );
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="relative flex max-h-[78vh] max-w-[84vw] items-center justify-center"
              style={{
                touchAction: "none",
              }}
            >
              <Image
                src={gallery[selectedIndex].image}
                alt={gallery[selectedIndex].title}
                width={1400}
                height={1050}
                priority
                draggable={false}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "84vw",
                  maxHeight: "78vh",
                  transform: `scale(${zoom})`,
                  transition: "transform 0.2s ease",
                  cursor:
                    zoom > 1
                      ? "grab"
                      : "zoom-in",
                }}
                className="select-none rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            {/* ===================================================
                BOUTON SUIVANT
            =================================================== */}

            <motion.button
              type="button"
              aria-label="Image suivante"
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-xl transition-colors hover:bg-yellow-400 hover:text-[#06192B] sm:right-6 sm:h-14 sm:w-14"
            >
              <ChevronRight
                size={28}
                strokeWidth={2.2}
              />
            </motion.button>

            {/* ===================================================
                AIDE
            =================================================== */}

            <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs text-white/55 backdrop-blur-xl sm:block">
              Molette : zoom • Double clic : zoom rapide • ← → : navigation •
              Échap : fermer
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===============================================================
   BOUTON DU LIGHTBOX
================================================================ */

type LightboxButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  danger?: boolean;
};

function LightboxButton({
  label,
  onClick,
  children,
  disabled = false,
  danger = false,
}: LightboxButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.06,
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.95,
            }
      }
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-xl transition-colors sm:h-11 sm:w-11 ${
        disabled
          ? "cursor-not-allowed border-white/5 bg-white/5 text-white/25"
          : danger
            ? "border-red-300/20 bg-red-500/15 text-white hover:bg-red-500"
            : "border-white/15 bg-white/10 text-white hover:bg-yellow-400 hover:text-[#06192B]"
      }`}
    >
      {children}
    </motion.button>
  );
}