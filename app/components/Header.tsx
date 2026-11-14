"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { trackContactClick, trackQuoteClick } from "../lib/analytics";

const navigation = [
  { label: "Prestations", href: "/#services", id: "services" },
  { label: "Réalisations", href: "/#galerie", id: "galerie" },
  { label: "La méthode", href: "/#fonctionnement", id: "fonctionnement" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActiveSection(entry.target.id);
        else
          setActiveSection((current) =>
            entries.some(
              (item) => item.target.id === current && !item.isIntersecting,
            )
              ? ""
              : current,
          );
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    navigation.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-header-inner">
          <Link
            href="/"
            aria-label="Accueil HomeAToutFaire"
            className="site-logo"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/logo-homeatoutfaire.png"
              alt="HomeAToutFaire"
              width={1076}
              height={287}
              sizes="(max-width: 639px) 156px, 190px"
              priority
            />
          </Link>
          <nav
            aria-label="Navigation principale"
            className="desktop-navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <a
              href="tel:0618085598"
              className="header-phone"
              aria-label="Appeler HomeAToutFaire au 06 18 08 55 98"
              onClick={() => trackContactClick("phone", "header")}
            >
              <Phone size={18} aria-hidden="true" />
              <span>06 18 08 55 98</span>
            </a>
            <Link
              href="/#devis"
              className="header-quote"
              onClick={() => trackQuoteClick("header")}
            >
              <span>Parlons de votre projet</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="mobile-menu-toggle"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="navigation-mobile"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div id="navigation-mobile" className="mobile-navigation-panel">
            <nav aria-label="Navigation mobile">
              {navigation.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-index">0{index + 1}</span>
                  {item.label}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
              <Link
                href="/#devis"
                className="mobile-quote"
                onClick={() => {
                  setMenuOpen(false);
                  trackQuoteClick("header_mobile");
                }}
              >
                Demander un devis gratuit{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </nav>
            <p>
              Sainte-Anastasie · Jusqu’à environ 50 km
              <br />
              <span>Entreprise mobile, sans accueil du public sur place.</span>
            </p>
          </div>
        )}
      </header>
      <div className="site-header-spacer" aria-hidden="true" />
      <div id="cookie-consent-slot" />
    </>
  );
}
