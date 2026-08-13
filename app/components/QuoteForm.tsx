"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  CheckCircle2,
  FileImage,
  FileText,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  UserRound,
  Wrench,
  XCircle,
} from "lucide-react";

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      formRef.current.reset();
      setSuccess(true);
    } catch (sendError) {
      console.error(
        "Erreur EmailJS :",
        sendError,
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.10] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:p-7 lg:p-8"
    >
      {/* =========================================================
          DÉCORATIONS
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]"
      />

      <div className="relative z-10">
        {/* =======================================================
            EN-TÊTE
        ======================================================= */}

        <div className="mb-5 flex items-start gap-3 border-b border-white/10 pb-4 sm:mb-7 sm:gap-4 sm:pb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-[#06192B] shadow-[0_8px_25px_rgba(250,204,21,0.2)] sm:h-12 sm:w-12 sm:rounded-2xl">
            <FileText
              size={21}
              strokeWidth={2.3}
              className="sm:h-6 sm:w-6"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-5 text-white sm:text-xl">
              Parlez-moi de votre projet
            </h3>

            <p className="mt-1 text-xs leading-5 text-blue-100/70 sm:text-sm sm:leading-6">
              Quelques informations suffisent pour étudier votre demande.
            </p>
          </div>
        </div>

        {/* =======================================================
            NOM + TÉLÉPHONE
        ======================================================= */}

        <div className="grid gap-3.5 sm:gap-5 md:grid-cols-2">
          <FormField
            label="Nom et prénom"
            htmlFor="name"
            icon={<UserRound size={18} />}
          >
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Votre nom et prénom"
              required
              className={inputClassName}
            />
          </FormField>

          <FormField
            label="Téléphone"
            htmlFor="phone"
            icon={<Phone size={18} />}
          >
            <input
              id="phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="06 00 00 00 00"
              required
              className={inputClassName}
            />
          </FormField>
        </div>

        {/* =======================================================
            EMAIL + ADRESSE
        ======================================================= */}

        <div className="mt-3.5 grid gap-3.5 sm:mt-5 sm:gap-5 md:grid-cols-2">
          <FormField
            label="Adresse e-mail"
            htmlFor="email"
            icon={<Mail size={18} />}
          >
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="votre@email.fr"
              required
              className={inputClassName}
            />
          </FormField>

          <FormField
            label="Adresse du chantier"
            htmlFor="address"
            icon={<MapPin size={18} />}
            optional
          >
            <input
              id="address"
              type="text"
              name="address"
              autoComplete="street-address"
              placeholder="Adresse de l'intervention"
              className={inputClassName}
            />
          </FormField>
        </div>

        {/* =======================================================
            TYPE DE PRESTATION
        ======================================================= */}

        <div className="mt-3.5 sm:mt-5">
          <FormField
            label="Type de prestation"
            htmlFor="service"
            icon={<Wrench size={18} />}
          >
            <select
              id="service"
              name="service"
              defaultValue=""
              required
              className={`${inputClassName} cursor-pointer text-white`}
            >
              <option
                value=""
                disabled
                className="bg-white text-slate-500"
              >
                Sélectionnez une prestation
              </option>

              <option
                value="Petits travaux électriques"
                className="bg-white text-slate-900"
              >
                Petits travaux électriques
              </option>

              <option
                value="Petits travaux de plomberie"
                className="bg-white text-slate-900"
              >
                Petits travaux de plomberie
              </option>

              <option
                value="Peinture"
                className="bg-white text-slate-900"
              >
                Peinture
              </option>

              <option
                value="Menuiserie"
                className="bg-white text-slate-900"
              >
                Menuiserie
              </option>

              <option
                value="Entretien piscine"
                className="bg-white text-slate-900"
              >
                Entretien piscine
              </option>

              <option
                value="Dépannage d'urgence"
                className="bg-white text-slate-900"
              >
                Dépannage d&apos;urgence
              </option>

              <option
                value="Autre"
                className="bg-white text-slate-900"
              >
                Autre demande
              </option>
            </select>
          </FormField>
        </div>

        {/* =======================================================
            PROJET
        ======================================================= */}

        <div className="mt-3.5 sm:mt-5">
          <FormField
            label="Votre projet"
            htmlFor="message"
            icon={<FileText size={18} />}
          >
            <textarea
              id="message"
              rows={5}
              name="message"
              placeholder="Décrivez les travaux souhaités, le problème rencontré, les dimensions éventuelles ou toute information utile..."
              required
              className={`${inputClassName} min-h-[125px] resize-y leading-5 sm:min-h-[160px] sm:leading-6`}
            />
          </FormField>
        </div>

        {/* =======================================================
            PHOTOS — INFORMATION
        ======================================================= */}

        <div
          className="mt-4 rounded-2xl border border-yellow-300/20 bg-yellow-400/[0.07] sm:mt-5"
          style={{
            boxSizing: "border-box",
            paddingTop: "13px",
            paddingRight: "14px",
            paddingBottom: "13px",
            paddingLeft: "14px",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-300 sm:h-10 sm:w-10">
              <FileImage
                size={19}
                strokeWidth={2.2}
                className="sm:h-[21px] sm:w-[21px]"
              />
            </div>

            <div className="min-w-0">
              <p className="m-0 text-[13px] font-semibold leading-5 text-white sm:text-sm">
                Vous souhaitez transmettre des photos ?
              </p>

              <p className="mt-1 text-[11px] leading-4.5 text-blue-100/65 sm:text-sm sm:leading-5">
                Envoyez d&apos;abord votre demande de devis. Les photos pourront
                ensuite être transmises directement par e-mail ou WhatsApp lors
                de notre échange.
              </p>

              <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3 sm:gap-3">
                <a
                  href="mailto:hatf30190@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:border-yellow-300/40 hover:bg-white/12 sm:px-3.5 sm:py-2 sm:text-xs"
                >
                  <Mail
                    size={14}
                    className="text-yellow-300"
                  />

                  Par e-mail
                </a>

                <a
                  href="https://wa.me/33618085598?text=Bonjour%2C%20je%20souhaite%20vous%20transmettre%20des%20photos%20concernant%20ma%20demande%20de%20devis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:border-yellow-300/40 hover:bg-white/12 sm:px-3.5 sm:py-2 sm:text-xs"
                >
                  <Phone
                    size={14}
                    className="text-yellow-300"
                  />

                  Par WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            SUCCÈS
        ======================================================= */}

        {success && (
          <div
            role="status"
            className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-3.5 py-3 text-emerald-100 sm:mt-6 sm:px-4 sm:py-3.5"
          >
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-300"
            />

            <div>
              <p className="text-sm font-semibold">
                Votre demande a bien été envoyée.
              </p>

              <p className="mt-0.5 text-xs text-emerald-100/75 sm:text-sm">
                Merci. Je reviendrai vers vous dès que possible.
              </p>
            </div>
          </div>
        )}

        {/* =======================================================
            ERREUR
        ======================================================= */}

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-3 rounded-2xl border border-red-300/20 bg-red-400/10 px-3.5 py-3 text-red-100 sm:mt-6 sm:px-4 sm:py-3.5"
          >
            <XCircle
              size={20}
              className="mt-0.5 shrink-0 text-red-300"
            />

            <div>
              <p className="text-sm font-semibold">
                L&apos;envoi n&apos;a pas abouti.
              </p>

              <p className="mt-0.5 text-xs text-red-100/75 sm:text-sm">
                Vérifiez vos informations puis réessayez.
              </p>
            </div>
          </div>
        )}

        {/* =======================================================
            BAS DU FORMULAIRE
        ======================================================= */}

        <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 sm:mt-7 sm:gap-4 sm:pt-6 sm:flex-row">
          <p className="max-w-md text-center text-[11px] leading-4.5 text-blue-100/55 sm:text-left sm:text-xs sm:leading-5">
            Les informations saisies servent uniquement à traiter votre demande
            de devis.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-yellow-400 px-6 py-2.5 text-sm font-bold text-[#06192B] shadow-[0_12px_34px_rgba(250,204,21,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_18px_42px_rgba(250,204,21,0.38)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:min-h-13 sm:w-auto sm:px-7 sm:py-3 sm:text-base"
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={19}
                  className="animate-spin"
                />

                Envoi en cours...
              </>
            ) : (
              <>
                <Send
                  size={18}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />

                Envoyer ma demande
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ===============================================================
   CHAMP DE FORMULAIRE
================================================================ */

type FormFieldProps = {
  label: string;
  htmlFor: string;
  icon: ReactNode;
  children: ReactNode;
  optional?: boolean;
};

function FormField({
  label,
  htmlFor,
  icon,
  children,
  optional = false,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center gap-2 text-[13px] font-semibold text-white sm:mb-2.5 sm:text-sm"
      >
        <span className="text-yellow-300">
          {icon}
        </span>

        <span>
          {label}
        </span>

        {optional && (
          <span className="font-normal text-blue-100/50">
            (facultatif)
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

/* ===============================================================
   STYLE COMMUN DES CHAMPS
================================================================ */

const inputClassName =
  "w-full rounded-xl border border-white/20 bg-white/[0.12] px-3.5 py-2.5 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/45 hover:border-white/30 hover:bg-white/[0.14] focus:border-yellow-300/80 focus:bg-white/[0.15] focus:ring-4 focus:ring-yellow-300/10 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-[15px]";