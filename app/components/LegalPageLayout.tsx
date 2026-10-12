import type { ReactNode } from "react";
import Link from "next/link";

import Footer from "./Footer";
import Header from "./Header";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  eyebrow,
  title,
  description,
  updatedAt,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <Header />

      <main className="bg-slate-50">
        <section className="relative overflow-hidden bg-[#06192B] px-5 pb-14 pt-28 text-white sm:px-8 sm:pb-16 sm:pt-32 lg:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-yellow-400/10 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]"
          />

          <div className="relative mx-auto max-w-[980px]">
            <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-blue-100/65">
              <Link href="/" className="transition-colors hover:text-yellow-300">
                Accueil
              </Link>

              <span className="mx-2" aria-hidden="true">
                /
              </span>

              <span className="text-white">{eyebrow}</span>
            </nav>

            <p className="text-sm font-bold uppercase tracking-[0.14em] text-yellow-300">
              {eyebrow}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-[780px] text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
              {description}
            </p>

            <p className="mt-5 text-sm text-blue-100/55">
              Dernière mise à jour : {updatedAt}
            </p>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <article className="legal-content mx-auto max-w-[980px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9 lg:p-12">
            {children}
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}
