"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import {
  trackContactClick,
  trackQuoteClick,
} from "../lib/analytics";

const navigation = [
  {
    label: "Services",
    href: "/#services",
    id: "services",
  },
  {
    label: "Exemples",
    href: "/#galerie",
    id: "galerie",
  },
  {
    label: "Devis",
    href: "/#devis",
    id: "devis",
  },
  {
    label: "Contact",
    href: "/#contact",
    id: "contact",
  },
];

function trackPhoneClick(location: "header_desktop" | "header_mobile") {
  trackContactClick("phone", location);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.01, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
        {/* Ligne or supérieure */}
        <div className="h-[3px] w-full bg-[#D5A52E]" />

        {/* =========================================================
            HEADER DESKTOP
        ========================================================= */}

        <div className="hidden lg:block">
          <div className="mx-auto grid h-[72px] w-full max-w-[1480px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 sm:px-8 lg:px-10 xl:px-12">
            {/* =====================================================
                GAUCHE : IDENTITÉ DE L'ENTREPRISE
            ===================================================== */}

            <div className="flex min-w-0 items-center justify-start">
              <Link
                href="/"
                aria-label="Accueil HomeAToutFaire"
                className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5A52E]"
              >
                <Image
                  src="/images/logo-homeatoutfaire.png"
                  alt="HomeAToutFaire"
                  width={1076}
                  height={287}
                  className="h-auto w-[150px] xl:w-[170px]"
                />

                <span className="hidden border-l border-slate-200 pl-3 text-[11px] font-medium leading-4 text-slate-500 xl:block">
                  Entreprise mobile
                  <br />
                  rayon d&apos;environ 50 km
                </span>
              </Link>
            </div>

            {/* =====================================================
                CENTRE : NAVIGATION
            ===================================================== */}

            <nav
              aria-label="Navigation principale"
              className="flex items-center gap-10 xl:gap-12"
            >
              {navigation.map((item) => {
                const active =
                  activeSection === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      if (item.id === "devis") {
                        trackQuoteClick("header_desktop_nav");
                      }
                    }}
                    className={`relative flex h-[72px] items-center whitespace-nowrap text-[15px] font-semibold transition-colors duration-300 ${
                      active
                        ? "text-[#06192B]"
                        : "text-slate-700 hover:text-[#082E50]"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute bottom-[22px] left-0 h-[2px] rounded-full bg-[#D5A52E] transition-all duration-300 ${
                        active
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* =====================================================
                DROITE : EMAIL + TÉLÉPHONE SUR 2 LIGNES
            ===================================================== */}

            <div className="flex min-w-0 justify-end">
              <div className="flex flex-col items-start gap-1">
                <a
                  href="mailto:hatf30190@gmail.com"
                  onClick={() => {
                    trackContactClick("email", "header_desktop");
                  }}
                  className="flex items-center gap-2 whitespace-nowrap text-xs font-medium leading-5 text-slate-700 transition-colors hover:text-[#B88311] xl:text-[13px]"
                >
                  <Mail
                    size={15}
                    strokeWidth={2.2}
                    className="shrink-0 text-[#D5A52E]"
                  />

                  <span>
                    hatf30190@gmail.com
                  </span>
                </a>

                <a
                  href="tel:0618085598"
                  onClick={() => {
                    trackPhoneClick("header_desktop");
                  }}
                  className="flex items-center gap-2 whitespace-nowrap text-xs font-medium leading-5 text-slate-700 transition-colors hover:text-[#B88311] xl:text-[13px]"
                >
                  <Phone
                    size={15}
                    strokeWidth={2.2}
                    className="shrink-0 text-[#D5A52E]"
                  />

                  <span>
                    06 18 08 55 98
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            HEADER MOBILE / TABLETTE
        ========================================================= */}

        <div className="lg:hidden">
          <div className="mx-auto flex h-[68px] w-full items-center justify-between px-5 sm:px-8">
            <Link
              href="/"
              aria-label="Accueil HomeAToutFaire"
              onClick={() => setMenuOpen(false)}
              className="min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5A52E]"
            >
              <Image
                src="/images/logo-homeatoutfaire.png"
                alt="HomeAToutFaire"
                width={1076}
                height={287}
                className="h-auto w-[142px] sm:w-[158px]"
              />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="tel:0618085598"
                onClick={() => {
                  trackPhoneClick("header_mobile");
                }}
                aria-label="Appeler HomeAToutFaire au 06 18 08 55 98"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-[#06192B] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-yellow-300"
              >
                <Phone
                  size={20}
                  strokeWidth={2.4}
                />
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                aria-label={
                  menuOpen
                    ? "Fermer le menu"
                    : "Ouvrir le menu"
                }
                aria-expanded={menuOpen}
                aria-controls="navigation-mobile"
                onClick={() => {
                  setMenuOpen((current) => !current);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#082E50] shadow-sm transition-colors hover:bg-slate-50"
              >
                {menuOpen ? (
                  <X
                    size={23}
                    strokeWidth={2.2}
                  />
                ) : (
                  <Menu
                    size={23}
                    strokeWidth={2.2}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            MENU MOBILE
        ========================================================= */}

        {menuOpen && (
          <div
            id="navigation-mobile"
            className="border-t border-slate-100 bg-white shadow-lg lg:hidden"
          >
            <nav
              aria-label="Navigation mobile"
              className="mx-auto w-full px-5 py-4 sm:px-8"
            >
              <div className="flex flex-col">
                {navigation.map((item) => {
                  const active =
                    activeSection === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setMenuOpen(false);

                        if (item.id === "devis") {
                          trackQuoteClick("header_mobile_nav");
                        }
                      }}
                      className={`rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-yellow-50 text-[#B88311]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#082E50]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="flex items-start gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-600">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-[#D5A52E]"
                  />

                  <span>
                    Sainte-Anastasie (30)
                    <br />
                    Intervention jusqu&apos;à environ 50 km
                  </span>
                </div>

                <div className="px-4 py-2 text-xs font-medium leading-5 text-slate-500">
                  Entreprise mobile — pas d&apos;accueil du public sur place
                </div>

                <a
                  href="mailto:hatf30190@gmail.com"
                  onClick={() => {
                    trackContactClick("email", "header_mobile");
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-600"
                >
                  <Mail
                    size={17}
                    className="shrink-0 text-[#D5A52E]"
                  />

                  hatf30190@gmail.com
                </a>

                <a
                  href="tel:0618085598"
                  onClick={() => {
                    trackPhoneClick("header_mobile");
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-600"
                >
                  <Phone
                    size={17}
                    className="shrink-0 text-[#D5A52E]"
                  />

                  06 18 08 55 98
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 3px ligne or + 72px header desktop */}
      <div
        aria-hidden="true"
        className="h-[71px] lg:h-[75px]"
      />
    </>
  );
}
