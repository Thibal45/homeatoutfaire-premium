import Link from "next/link";
import { ArrowRight, House, Phone } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenu-principal" className="bg-[#F5F7FA] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-7 text-center shadow-[0_20px_70px_rgba(8,46,80,0.08)] sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-[#082E50]">
            <House size={30} aria-hidden="true" />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#86600D]">Erreur 404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#082E50] sm:text-4xl">Cette page est introuvable</h1>
          <p className="mt-4 leading-7 text-slate-600">Le lien a peut-être changé. Retrouvez les prestations HomeAToutFaire ou contactez-moi pour votre besoin.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/#services" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-[#06192B] hover:bg-yellow-300">
              Découvrir les prestations <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="tel:0618085598" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-[#082E50] hover:bg-slate-50">
              <Phone size={18} aria-hidden="true" /> 06 18 08 55 98
            </a>
          </div>
          <Link href="/" className="mt-6 inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-[#0A6587] underline underline-offset-4">Revenir à l&apos;accueil</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
