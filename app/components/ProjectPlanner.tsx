"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  Pencil,
  X,
} from "lucide-react";
import { services } from "../data/services";
import { OPEN_PLANNER_EVENT } from "../lib/discovery";
import { prefillQuote } from "../lib/quote-prefill";

export default function ProjectPlanner() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [tasks, setTasks] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const service = selected === null ? null : services[selected];

  useEffect(() => {
    function open(event: Event) {
      const requested = (event as CustomEvent).detail;
      const index = services.findIndex(
        (item) => item.quoteService === requested,
      );
      if (index >= 0) {
        setSelected(index);
        setTasks([]);
      }
      setStep(0);
      if (!dialog.current?.open) dialog.current?.showModal();
      heading.current?.focus();
    }
    window.addEventListener(OPEN_PLANNER_EVENT, open);
    return () => window.removeEventListener(OPEN_PLANNER_EVENT, open);
  }, []);

  useEffect(() => {
    if (dialog.current?.open) heading.current?.focus();
  }, [step]);

  function choose(index: number) {
    setSelected(index);
    setTasks([]);
  }
  function prepare() {
    if (!service) return;
    const text = [
      `Bonjour Thibaut,`,
      `Je souhaite vous contacter pour : ${service.title.toLowerCase()}.`,
      tasks.length
        ? `Mon besoin :\n${tasks.map((task) => `• ${task}`).join("\n")}`
        : "",
      note.trim() ? `Quelques précisions :\n${note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
    setDraft(text);
    setStep(1);
  }
  function useDraft() {
    if (!service || !draft.trim()) return;
    prefillQuote({ service: service.quoteService, message: draft.trim() });
    dialog.current?.close();
    // A plain fragment keeps the editable description out of the URL/history.
    window.location.hash = "devis";
    window.requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>("#quote-project-notice")
        ?.focus({ preventScroll: true }),
    );
  }

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = dialog.current?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]",
    );
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <dialog
      ref={dialog}
      className="project-planner"
      aria-labelledby="planner-title"
      aria-describedby="planner-intro"
      onKeyDown={containFocus}
    >
      <div className="planner-shell">
        <div className="planner-header">
          <span className="planner-brand">
            <ClipboardList size={20} aria-hidden="true" /> LE CARNET DE VOTRE
            PROJET
          </span>
          <button
            type="button"
            className="planner-close"
            onClick={() => dialog.current?.close()}
            aria-label="Fermer le carnet de projet"
          >
            <X size={22} aria-hidden="true" />
          </button>
          <div
            className="planner-progress"
            aria-label={`Étape ${step + 1} sur 2`}
          >
            <span className="is-current">
              01 <span>Votre besoin</span>
            </span>
            <i />
            <span className={step === 1 ? "is-current" : ""}>
              02 <span>Votre récapitulatif</span>
            </span>
          </div>
        </div>
        <div className="planner-body">
          <h2 ref={heading} id="planner-title" tabIndex={-1}>
            {step === 0 ? (
              <>
                Un petit projet ?<br />
                <em>Mettons-le au clair.</em>
              </>
            ) : (
              <>
                C’est un bon début.
                <br />
                <em>À vous de le personnaliser.</em>
              </>
            )}
          </h2>
          <p id="planner-intro">
            {step === 0
              ? "Choisissez un sujet et les exemples qui vous correspondent. Rien n’est envoyé à cette étape."
              : "Relisez ce texte, modifiez-le si besoin, puis ajoutez-le au formulaire. Vous y indiquerez vos coordonnées."}
          </p>
          {step === 0 ? (
            <>
              <fieldset className="planner-fieldset">
                <legend>De quoi avez-vous besoin ?</legend>
                <div className="planner-services">
                  {services.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href}
                        type="button"
                        aria-pressed={selected === index}
                        onClick={() => choose(index)}
                      >
                        <Icon size={21} aria-hidden="true" />
                        <span>{item.shortTitle}</span>
                        {selected === index && (
                          <Check size={16} aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              {service && (
                <fieldset className="planner-fieldset planner-examples">
                  <legend>
                    Ce qui vous concerne{" "}
                    <small>Plusieurs choix possibles</small>
                  </legend>
                  {service.examples.map((task) => (
                    <label key={task}>
                      <input
                        type="checkbox"
                        checked={tasks.includes(task)}
                        onChange={() =>
                          setTasks((current) =>
                            current.includes(task)
                              ? current.filter((item) => item !== task)
                              : [...current, task],
                          )
                        }
                      />
                      <span>{task}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              <label className="planner-note-label" htmlFor="planner-note">
                Un détail à ajouter ? <small>Facultatif</small>
              </label>
              <textarea
                id="planner-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={900}
                rows={3}
                placeholder="La pièce concernée, ce qui ne fonctionne plus, ce que vous souhaitez changer…"
              />
            </>
          ) : (
            <div className="planner-draft">
              <label htmlFor="planner-draft">
                <Pencil size={16} aria-hidden="true" /> Votre texte, librement
                modifiable
              </label>
              <textarea
                id="planner-draft"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={1800}
                rows={10}
              />
              <p>
                La prise en charge et le tarif seront précisés ensemble avant
                toute intervention.
              </p>
            </div>
          )}
        </div>
        <div className="planner-footer">
          {step === 1 ? (
            <button
              type="button"
              className="text-link"
              onClick={() => setStep(0)}
            >
              <ArrowLeft size={16} aria-hidden="true" /> Revenir
            </button>
          ) : (
            <span>
              Sans inscription.
              <br />
              Vous gardez la main.
            </span>
          )}
          <button
            type="button"
            className="btn btn-navy"
            disabled={step === 0 ? !service : !draft.trim()}
            onClick={step === 0 ? prepare : useDraft}
          >
            {step === 0 ? (
              <>
                Voir mon récapitulatif{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </>
            ) : (
              <>
                Ajouter au formulaire{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}
