"use client";

import type { ReactNode, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Plus,
  X,
} from "lucide-react";

import { ceilingProject, gallery, illustrations } from "../data/gallery";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [comparison, setComparison] = useState(50);
  const cardButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastOpenedIndex = useRef<number | null>(null);
  const isOpen = selectedIndex !== null;

  /* =========================================================
     FERMETURE LIGHTBOX
  ========================================================= */

  const closeGallery = useCallback(() => {
    setZoom(1);
    setSelectedIndex(null);
  }, []);

  const openGallery = useCallback((index: number) => {
    lastOpenedIndex.current = index;
    setZoom(1);
    setSelectedIndex(index);
  }, []);

  /* =========================================================
     IMAGE SUIVANTE
  ========================================================= */

  const nextImage = useCallback(() => {
    if (selectedIndex === null) return;

    setZoom(1);

    setSelectedIndex((selectedIndex + 1) % gallery.length);
  }, [selectedIndex]);

  /* =========================================================
     IMAGE PRÉCÉDENTE
  ========================================================= */

  const previousImage = useCallback(() => {
    if (selectedIndex === null) return;

    setZoom(1);

    setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length);
  }, [selectedIndex]);

  /* =========================================================
     ZOOM
  ========================================================= */

  const zoomIn = useCallback(() => {
    setZoom((current) => Math.min(current + 0.2, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((current) => Math.max(current - 0.2, 1));
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

      if (event.key === "Tab") {
        const focusableElements =
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
          );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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

  useEffect(() => {
    if (!isOpen) return;

    const cardButtons = cardButtonRefs.current;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);

      const previousIndex = lastOpenedIndex.current;

      if (previousIndex !== null) {
        window.requestAnimationFrame(() => {
          cardButtons[previousIndex]?.focus();
        });
      }
    };
  }, [isOpen]);

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
    <section id="galerie" className="section-space gallery-section showcase-section">
      <div className="site-container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> 02 / LE SOIN DU DÉTAIL
            </p>
            <h2 className="display-title">
              Du concret.
              <br />
              <span>Et ça se voit.</span>
            </h2>
          </div>
          <p>
            Un plafond remis à neuf à Sainte-Anastasie.
            <br />
            Découvrez l’intervention, du support à la finition.
          </p>
        </div>
        <article
          aria-labelledby="ceiling-project-title"
          className="project-feature"
        >
          <div className="project-showcase">
            <div className="project-comparison-block">
              <div
                className="project-comparison"
                style={
                  { "--comparison": `${comparison}%` } as React.CSSProperties
                }
              >
                <Image
                  src={ceilingProject.photos[0].image}
                  alt={ceilingProject.photos[0].alt}
                  width={1448}
                  height={1086}
                  sizes="(max-width: 767px) 100vw, 55vw"
                  className="comparison-image h-auto w-full"
                />
                <div
                  className="comparison-after"
                  style={{ clipPath: `inset(0 0 0 ${comparison}%)` }}
                >
                  <Image
                    src={ceilingProject.photos[1].image}
                    alt={ceilingProject.photos[1].alt}
                    width={1448}
                    height={1086}
                    sizes="(max-width: 767px) 100vw, 55vw"
                    className="comparison-image h-auto w-full"
                  />
                </div>
                <span className="comparison-tag comparison-tag-before">
                  AVANT RECONSTITUÉ
                </span>
                <span className="comparison-tag comparison-tag-after">
                  APRÈS
                </span>
                <span className="comparison-line" aria-hidden="true">
                  <span>
                    <ChevronLeft size={17} />
                    <ChevronRight size={17} />
                  </span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={comparison}
                  onChange={(event) =>
                    setComparison(Number(event.target.value))
                  }
                  aria-label="Comparer l’avant reconstitué et l’après du plafond"
                  aria-valuetext={`Avant ${comparison} %, après ${100 - comparison} %`}
                  className="comparison-input"
                />
              </div>
              <p className="comparison-instruction">
                <ChevronLeft size={15} aria-hidden="true" /> Faites glisser pour
                comparer <ChevronRight size={15} aria-hidden="true" />
              </p>
              <p className="comparison-provenance">
                Avant : reconstitution illustrative, l’état initial n’ayant pas
                été photographié. Après : photo retouchée, luminosité et blanc
                harmonisés.
              </p>
            </div>
            <div className="project-story">
              <p className="eyebrow">CHANTIER RÉALISÉ · PEINTURE</p>
              <span className="project-location">
                {ceilingProject.location}
              </span>
              <h3 id="ceiling-project-title">
                Un plafond.
                <br />
                Un nouveau départ.
              </h3>
              <p>{ceilingProject.description}</p>
              <ul>
                {ceilingProject.steps.map((step, index) => (
                  <li key={step}>
                    <span>0{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ul>
              <Link href="/#devis" className="text-link">
                Parler de mon projet{" "}
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <details className="project-photo-details">
            <summary>
              Voir les 3 photos et leurs détails{" "}
              <Plus size={18} aria-hidden="true" />
            </summary>
            <div className="project-photo-grid">
              {ceilingProject.photos.map((photo, index) => (
                <figure key={photo.image}>
                  <button
                    ref={(element) => {
                      cardButtonRefs.current[index] = element;
                    }}
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`Agrandir la réalisation : ${photo.title}`}
                    onClick={() => openGallery(index)}
                    className="project-photo-button"
                  >
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="h-auto w-full"
                    />
                    <span>
                      Voir la photo en entier{" "}
                      <Maximize2 size={16} aria-hidden="true" />
                    </span>
                  </button>
                  <figcaption>
                    <strong>{photo.title}</strong>
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </details>
        </article>
        <details className="illustration-details">
          <summary>
            <span>
              Et pour vos autres petits travaux ?
              <small>
                Explorer les illustrations des 6 types de prestation
              </small>
            </span>
            <Plus size={23} aria-hidden="true" />
          </summary>
          <p className="illustration-disclaimer">
            Les images ci-dessous sont des illustrations de prestations, et non
            des photos de chantiers réalisés par HomeAToutFaire.
          </p>
          <div className="illustration-grid">
            {illustrations.map((photo, illustrationIndex) => {
              const index = ceilingProject.photos.length + illustrationIndex;
              return (
                <article key={photo.image} className="illustration-card">
                  <div className="illustration-photo">
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, 33vw"
                    />
                    <span className="image-provenance">Illustration</span>
                    <button
                      ref={(element) => {
                        cardButtonRefs.current[index] = element;
                      }}
                      type="button"
                      aria-haspopup="dialog"
                      aria-label={`Agrandir l'exemple de prestation : ${photo.title}`}
                      onClick={() => openGallery(index)}
                    >
                      <Maximize2 size={20} aria-hidden="true" />
                    </button>
                  </div>
                  <Link
                    href={photo.href}
                    aria-label={`Voir les prestations : ${photo.title}`}
                  >
                    <h3>{photo.title}</h3>
                    <ChevronRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </details>
      </div>

      {/* =========================================================
          LIGHTBOX
      ========================================================= */}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-dialog-title"
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

            <div className="absolute inset-x-4 top-4 z-30 flex flex-wrap items-center justify-between gap-2 sm:inset-x-6 sm:top-6 sm:flex-nowrap">
              {/* TITRE */}

              <div className="min-w-0 max-w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-2.5 text-white backdrop-blur-xl sm:max-w-[55%]">
                <p
                  id="gallery-dialog-title"
                  className="text-sm font-semibold sm:text-base"
                >
                  {gallery[selectedIndex].title}
                </p>

                <p className="mt-0.5 text-xs text-white/55">
                  {gallery[selectedIndex].label}
                  {" · "}
                  {selectedIndex + 1} / {gallery.length}
                </p>
              </div>

              {/* OUTILS */}

              <div
                className="flex items-center gap-2"
                onClick={(event) => event.stopPropagation()}
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
                  buttonRef={closeButtonRef}
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
              <ChevronLeft size={28} strokeWidth={2.2} />
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

                setZoom((current) => (current === 1 ? 2 : 1));
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[78vh] max-w-[84vw] items-center justify-center"
              style={{
                touchAction: "none",
              }}
            >
              <Image
                src={gallery[selectedIndex].image}
                alt={gallery[selectedIndex].alt}
                width={1400}
                height={1050}
                sizes="84vw"
                priority
                draggable={false}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "84vw",
                  maxHeight: "78vh",
                  transform: `scale(${zoom})`,
                  transition: "transform 0.2s ease",
                  cursor: zoom > 1 ? "grab" : "zoom-in",
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
              <ChevronRight size={28} strokeWidth={2.2} />
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
  buttonRef?: RefObject<HTMLButtonElement | null>;
};

function LightboxButton({
  label,
  onClick,
  children,
  disabled = false,
  danger = false,
  buttonRef,
}: LightboxButtonProps) {
  return (
    <motion.button
      ref={buttonRef}
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
