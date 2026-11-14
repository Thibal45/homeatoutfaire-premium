"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Building2,
  Camera,
  Check,
  CheckCheck,
  ChevronRight,
  ClipboardList,
  FolderHeart,
  House,
  ImagePlus,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  WifiOff,
  X,
} from "lucide-react";
import { services } from "../../data/services";
import {
  MAX_PHOTOS,
  loadProjects,
  newProject,
  preparePhoto,
  projectText,
  projectTitle,
  saveProject,
  type MobileProject,
} from "../../lib/mobile-projects";
import {
  captureProjectPhoto,
  exportProject,
  isCancelled,
  isNativeApp,
  openBusinessPage,
  shareProject,
} from "../../lib/mobile-device";
import PrivacyContent from "./PrivacyContent";
import "./mobile.css";

const appServices = [
  ...services,
  {
    title: "Résidence secondaire / gîte",
    shortTitle: "Résidences & gîtes",
    icon: Building2,
    scope:
      "Petits travaux et entretien courant. Sans rénovation lourde, travaux structurels ni gestion locative.",
    href: "/residences-secondaires-gites",
    description:
      "Regroupez vos petits travaux et besoins d’entretien auprès du même interlocuteur local.",
    examples: [
      "Petites réparations et réglages",
      "Rafraîchissements de peinture",
      "Entretien courant de piscine",
    ],
    quoteService: "Résidence secondaire / gîte",
  },
];
type Tab = "home" | "services" | "projects" | "contact";
type SaveState = "loading" | "saved" | "saving" | "error";
const WEBSITE = "https://www.homeatoutfaire30.fr";
const HomeServiceIcon = services[0].icon;

export default function MobileApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [projects, setProjects] = useState<MobileProject[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [chosenService, setChosenService] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState("");
  const [busy, setBusy] = useState(false);
  const [native, setNative] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const projectsRef = useRef(projects);
  const screenRef = useRef({ activeId, tab, privacy });
  const queue = useRef<Promise<void>>(Promise.resolve());
  const revision = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const active = projects.find((project) => project.id === activeId);
  const visibleProjects = projects.filter((project) => !project.archived);
  const archived = projects.filter((project) => project.archived);

  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);
  useEffect(() => {
    screenRef.current = { activeId, tab, privacy };
  }, [activeId, tab, privacy]);

  const persist = useCallback((project: MobileProject) => {
    const next = { ...project, updatedAt: new Date().toISOString() };
    projectsRef.current = [
      next,
      ...projectsRef.current.filter((item) => item.id !== next.id),
    ];
    setProjects(projectsRef.current);
    const sequence = ++revision.current;
    setSaveState("saving");
    queue.current = queue.current
      .catch(() => undefined)
      .then(() => saveProject(next));
    void queue.current
      .then(() => {
        if (sequence === revision.current) {
          setSaveState("saved");
          setStorageError("");
        }
      })
      .catch((error: unknown) => {
        setSaveState("error");
        setStorageError(
          error instanceof Error
            ? error.message
            : "L’enregistrement local est indisponible. Exportez votre dossier pour le conserver.",
        );
      });
  }, []);

  useEffect(() => {
    let disposed = false;
    setNative(isNativeApp());
    void loadProjects()
      .then((items) => {
        if (!disposed) {
          projectsRef.current = items;
          setProjects(items);
          setSaveState("saved");
        }
      })
      .catch((error: unknown) => {
        if (!disposed) {
          setSaveState("error");
          setStorageError(
            error instanceof Error
              ? error.message
              : "Le carnet local est indisponible.",
          );
        }
      });
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    if (!isNativeApp()) return;
    let disposed = false;
    const cleanup: (() => Promise<void>)[] = [];
    void import("@capacitor/app").then(async ({ App }) => {
      const back = await App.addListener("backButton", () => {
        const screen = screenRef.current;
        if (screen.privacy) setPrivacy(false);
        else if (screen.activeId) setActiveId(null);
        else if (screen.tab !== "home") {
          setTab("home");
          setChosenService(null);
        } else
          void queue.current
            .catch(() => undefined)
            .then(() => App.minimizeApp());
      });
      if (disposed) await back.remove();
      else cleanup.push(() => back.remove());
      const restored = await App.addListener("appRestoredResult", (event) => {
        if (
          event.pluginId !== "Camera" ||
          !event.success ||
          !event.data?.webPath
        )
          return;
        const id = localStorage.getItem("hatf-camera-project");
        localStorage.removeItem("hatf-camera-project");
        if (!id) return;
        void (async () => {
          const photo = await preparePhoto(event.data.webPath as string);
          const items = projectsRef.current.length
            ? projectsRef.current
            : await loadProjects();
          const project = items.find((item) => item.id === id);
          if (project && project.photos.length < MAX_PHOTOS) {
            projectsRef.current = items;
            persist({ ...project, photos: [...project.photos, photo] });
            setActiveId(id);
            setNotice("La photo a été retrouvée et ajoutée à votre projet.");
          }
        })().catch(() =>
          setNotice(
            "La photo n’a pas pu être récupérée. Vous pouvez la sélectionner à nouveau.",
          ),
        );
      });
      if (disposed) await restored.remove();
      else cleanup.push(() => restored.remove());
    });
    return () => {
      disposed = true;
      cleanup.forEach((remove) => {
        void remove();
      });
    };
  }, [persist]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (activeId || privacy) titleRef.current?.focus({ preventScroll: true });
  }, [tab, activeId, privacy]);

  const go = (next: Tab) => {
    setActiveId(null);
    setPrivacy(false);
    setTab(next);
    setChosenService(null);
    setNotice("");
  };
  const start = (service = "") => {
    if (saveState === "loading") return;
    const project = newProject(service);
    persist(project);
    setActiveId(project.id);
    setNotice("");
  };
  const patch = (fields: Partial<MobileProject>) => {
    const current = projectsRef.current.find(
      (project) => project.id === activeId,
    );
    if (current) persist({ ...current, ...fields });
  };
  const addPhotos = async (sources: (Blob | string)[]) => {
    if (!active) return;
    const id = active.id;
    setBusy(true);
    setNotice("");
    try {
      const remaining = MAX_PHOTOS - active.photos.length;
      const prepared = await Promise.all(
        sources.slice(0, remaining).map(preparePhoto),
      );
      const current = projectsRef.current.find((project) => project.id === id);
      if (current)
        persist({
          ...current,
          photos: [...current.photos, ...prepared].slice(0, MAX_PHOTOS),
        });
      if (sources.length > remaining)
        setNotice(
          `Les ${remaining} premières photos ont été ajoutées. Maximum : ${MAX_PHOTOS} photos par projet.`,
        );
    } catch (error) {
      if (!isCancelled(error))
        setNotice(
          error instanceof Error
            ? error.message
            : "Cette photo n’a pas pu être ajoutée.",
        );
    } finally {
      setBusy(false);
    }
  };
  const pickPhotos = async () => {
    if (!active || busy) return;
    if (!native) {
      fileInput.current?.click();
      return;
    }
    try {
      await queue.current;
      localStorage.setItem("hatf-camera-project", active.id);
      const photo = await captureProjectPhoto();
      localStorage.removeItem("hatf-camera-project");
      await addPhotos([photo]);
    } catch (error) {
      localStorage.removeItem("hatf-camera-project");
      if (!isCancelled(error))
        setNotice(
          "La photo n’a pas été ajoutée. Vérifiez l’autorisation de l’appareil photo ou choisissez une image existante.",
        );
    }
  };
  const fileChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (files.length) void addPhotos(files);
  };
  const openPage = (path: string) => {
    void openBusinessPage(WEBSITE + path).catch(() =>
      setNotice(
        "Le lien n’a pas pu s’ouvrir. Vous pouvez appeler le 06 18 08 55 98.",
      ),
    );
  };
  const share = async () => {
    if (!active || busy) return;
    setBusy(true);
    setNotice("");
    try {
      const result = await shareProject(active);
      setNotice(
        result === "downloaded"
          ? "Dossier ZIP téléchargé : il contient le récapitulatif et vos photos. Vous pouvez le joindre à un e-mail à hatf30190@gmail.com."
          : "Le partage a été ouvert. L’application ne peut pas confirmer la réception : vérifiez l’envoi dans le service choisi.",
      );
    } catch (error) {
      if (!isCancelled(error))
        setNotice(
          "Le partage n’a pas abouti. Votre projet reste dans le carnet ; vous pouvez réessayer.",
        );
    } finally {
      setBusy(false);
    }
  };
  const copy = async () => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(projectText(active));
      setNotice(
        "Texte copié. Vous pouvez le coller dans votre message ou dans le devis sur le site.",
      );
    } catch {
      setNotice(
        "La copie est indisponible ici. Le partage du dossier reste accessible.",
      );
    }
  };
  const archive = (project: MobileProject) => {
    persist({ ...project, archived: !project.archived });
    setActiveId(null);
    setTab("projects");
    setNotice(
      project.archived
        ? "Projet restauré."
        : "Projet archivé. Vous pouvez le retrouver dans les archives.",
    );
  };
  const selected = appServices[chosenService ?? 0];
  const activeService = appServices.find(
    (service) => service.quoteService === active?.service,
  );

  return (
    <div className="hatf-app" data-native={native}>
      <header className="app-topbar">
        <button
          className="app-brand"
          onClick={() => go("home")}
          aria-label="Accueil de l’application HomeAToutFaire"
        >
          <span className="app-monogram">
            <House size={25} />
          </span>
          <span>
            Home<span className="app-brand-gold">AToutFaire</span>
            <small>Le carnet de vos petits travaux</small>
          </span>
        </button>
        <a
          className="app-icon-button"
          href="tel:0618085598"
          aria-label="Appeler Thibaut au 06 18 08 55 98"
        >
          <Phone size={20} />
        </a>
      </header>
      <main id="contenu-principal" className="app-content">
        {storageError && (
          <div className="app-warning" role="alert">
            <ShieldCheck size={20} />
            <span>
              {storageError}{" "}
              <button
                onClick={() => {
                  projectsRef.current.forEach(persist);
                }}
              >
                Réessayer l’enregistrement
              </button>
            </span>
          </div>
        )}
        {notice && (
          <div className="app-notice" role="status">
            <span>{notice}</span>
            <button
              aria-label="Fermer l’information"
              onClick={() => setNotice("")}
            >
              <X size={17} />
            </button>
          </div>
        )}
        {privacy ? (
          <section className="app-privacy">
            <button className="app-back" onClick={() => setPrivacy(false)}>
              <ArrowLeft size={18} /> Revenir au carnet
            </button>
            <p className="app-eyebrow">VOS DONNÉES</p>
            <h1 ref={titleRef} tabIndex={-1}>
              Un carnet qui reste <em>entre vos mains.</em>
            </h1>
            <div className="app-paper">
              <ShieldCheck size={30} />
              <PrivacyContent />
              <button
                className="app-text-link"
                onClick={() => openPage("/politique-confidentialite")}
              >
                Politique de confidentialité du site <ArrowRight size={16} />
              </button>
            </div>
          </section>
        ) : active ? (
          <section className="app-editor">
            <div className="app-editor-top">
              <button
                className="app-back"
                onClick={() => {
                  setActiveId(null);
                  setTab("projects");
                }}
              >
                <ArrowLeft size={18} /> Mes projets
              </button>
              <span
                className={`app-save-state ${saveState === "error" ? "is-error" : ""}`}
                role="status"
              >
                {saveState === "saving" ? (
                  "Enregistrement…"
                ) : saveState === "error" ? (
                  "Non enregistré"
                ) : (
                  <>
                    <CheckCheck size={15} /> Enregistré ici
                  </>
                )}
              </span>
            </div>
            <p className="app-eyebrow">VOTRE BROUILLON PERSONNEL</p>
            <h1 ref={titleRef} tabIndex={-1}>
              Préparons votre <em>petit projet.</em>
            </h1>
            <p className="app-lead">
              Quelques mots, une photo si utile. Vous décidez ensuite de ce que
              vous partagez.
            </p>
            <div className="app-editor-grid">
              <div className="app-paper app-fields">
                <label htmlFor="app-project-title">
                  Un nom pour le retrouver <span>facultatif</span>
                </label>
                <input
                  id="app-project-title"
                  maxLength={100}
                  placeholder="Ex. La porte du salon"
                  value={active.title}
                  onChange={(event) => patch({ title: event.target.value })}
                />
                <label htmlFor="app-service">Le sujet de votre demande</label>
                <select
                  id="app-service"
                  value={active.service}
                  onChange={(event) =>
                    patch({ service: event.target.value, examples: [] })
                  }
                >
                  <option value="">Choisir une prestation</option>
                  {appServices.map((service) => (
                    <option
                      key={service.quoteService}
                      value={service.quoteService}
                    >
                      {service.title}
                    </option>
                  ))}
                </select>
                {activeService && (
                  <>
                    <p className="app-scope">
                      <ShieldCheck size={17} />
                      <span>{activeService.scope}</span>
                    </p>
                    <fieldset className="app-examples">
                      <legend>
                        Ce qui vous concerne{" "}
                        <span>plusieurs choix possibles</span>
                      </legend>
                      {activeService.examples.map((example) => (
                        <label key={example}>
                          <input
                            type="checkbox"
                            checked={active.examples.includes(example)}
                            onChange={(event) =>
                              patch({
                                examples: event.target.checked
                                  ? [...active.examples, example]
                                  : active.examples.filter(
                                      (item) => item !== example,
                                    ),
                              })
                            }
                          />
                          <span>{example}</span>
                        </label>
                      ))}
                    </fieldset>
                  </>
                )}
                <label htmlFor="app-commune">
                  Commune du chantier <span>facultatif</span>
                </label>
                <input
                  id="app-commune"
                  maxLength={100}
                  autoComplete="address-level2"
                  placeholder="Ex. Sainte-Anastasie"
                  value={active.commune}
                  onChange={(event) => patch({ commune: event.target.value })}
                />
                <label htmlFor="app-message">Votre besoin, avec vos mots</label>
                <textarea
                  id="app-message"
                  rows={5}
                  maxLength={4000}
                  placeholder="Ce qui pose problème, ce que vous aimeriez faire…"
                  value={active.message}
                  onChange={(event) => patch({ message: event.target.value })}
                />
                <small className="app-field-hint">
                  Le travail, le tarif et le créneau seront convenus avec
                  Thibaut avant toute intervention.
                </small>
              </div>
              <div className="app-editor-side">
                <div className="app-paper app-photos">
                  <div className="app-card-heading">
                    <div>
                      <p className="app-eyebrow">POUR MIEUX COMPRENDRE</p>
                      <h2>
                        Vos photos{" "}
                        <span>
                          {active.photos.length}/{MAX_PHOTOS}
                        </span>
                      </h2>
                    </div>
                    <Camera size={24} />
                  </div>
                  <p>
                    Une vue d’ensemble et un détail peuvent suffire. Elles
                    restent dans votre carnet jusqu’au partage.
                  </p>
                  <div className="app-photo-grid">
                    {active.photos.map((photo, index) => (
                      <figure key={photo.id}>
                        <img
                          src={photo.dataUrl}
                          alt={`Photo ${index + 1} du projet`}
                        />
                        <button
                          aria-label={`Retirer la photo ${index + 1}`}
                          onClick={() =>
                            patch({
                              photos: active.photos.filter(
                                (item) => item.id !== photo.id,
                              ),
                            })
                          }
                        >
                          <X size={17} />
                        </button>
                      </figure>
                    ))}
                  </div>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={fileChanged}
                  />
                  <button
                    className="app-add-photo"
                    onClick={() => {
                      void pickPhotos();
                    }}
                    disabled={busy || active.photos.length >= MAX_PHOTOS}
                  >
                    <ImagePlus size={22} />{" "}
                    {busy ? "Préparation…" : "Ajouter une photo"}
                  </button>
                </div>
                <div className="app-share-card">
                  <Share2 size={24} />
                  <h2>Prêt à en parler ?</h2>
                  <p>
                    Partagez le récapitulatif et les photos avec le service de
                    votre choix. Destinataire :{" "}
                    <strong>hatf30190@gmail.com</strong> ou WhatsApp au{" "}
                    <strong>06 18 08 55 98</strong>.
                  </p>
                  <button
                    className="app-primary"
                    onClick={() => {
                      void share();
                    }}
                    disabled={busy}
                  >
                    <Share2 size={18} /> Partager mon dossier
                  </button>
                  <button
                    className="app-light-link"
                    onClick={() => {
                      void copy();
                    }}
                  >
                    <ClipboardList size={16} /> Copier le récapitulatif
                  </button>
                  {!native && (
                    <button
                      className="app-light-link"
                      onClick={() => {
                        try {
                          exportProject(active);
                          setNotice(
                            "Dossier exporté. Il reste à l’envoyer au destinataire choisi.",
                          );
                        } catch {
                          setNotice("L’export a échoué. Réessayez le partage.");
                        }
                      }}
                    >
                      <ArrowDownToLine size={16} /> Télécharger le dossier ZIP
                    </button>
                  )}
                  <small>
                    Rien n’est envoyé automatiquement. Votre brouillon reste
                    modifiable.
                  </small>
                </div>
                <button className="app-archive" onClick={() => archive(active)}>
                  <FolderHeart size={17} />{" "}
                  {active.archived
                    ? "Restaurer ce projet"
                    : "Archiver ce projet"}
                </button>
              </div>
            </div>
          </section>
        ) : tab === "home" ? (
          <section>
            <div className="app-welcome">
              <div>
                <p className="app-eyebrow">
                  <MapPin size={13} /> SAINTE-ANASTASIE & ALENTOURS
                </p>
                <h1>
                  La maison avance.
                  <br />
                  <em>L’esprit reste tranquille.</em>
                </h1>
                <p>
                  Un petit souci à régler, une idée à préparer : gardez vos
                  projets et vos photos au même endroit.
                </p>
                <button
                  className="app-primary"
                  onClick={() => start()}
                  disabled={saveState === "loading"}
                >
                  <Plus size={19} /> Préparer un projet <ArrowRight size={17} />
                </button>
                <span className="app-offline">
                  <WifiOff size={14} /> Carnet local · Sans compte client
                </span>
              </div>
              <div className="app-home-illustration" aria-hidden="true">
                <House size={130} strokeWidth={1} />
                <span className="app-orbit app-orbit-one">
                  <HomeServiceIcon size={25} />
                </span>
                <span className="app-orbit app-orbit-two">
                  <Camera size={25} />
                </span>
                <span className="app-orbit app-orbit-three">
                  <Check size={25} />
                </span>
              </div>
            </div>
            <div className="app-shortcuts">
              <button onClick={() => go("services")}>
                <span>
                  <Sparkles size={22} />
                </span>
                <div>
                  <strong>Les prestations</strong>
                  <small>Le bon service, le bon cadre</small>
                </div>
                <ChevronRight size={19} />
              </button>
              <button onClick={() => go("projects")}>
                <span>
                  <FolderHeart size={22} />
                </span>
                <div>
                  <strong>Mes projets</strong>
                  <small>
                    {visibleProjects.length
                      ? `${visibleProjects.length} brouillon${visibleProjects.length > 1 ? "s" : ""} sur cet appareil`
                      : "Votre carnet personnel"}
                  </small>
                </div>
                <ChevronRight size={19} />
              </button>
            </div>
            <div className="app-section-heading">
              <div>
                <p className="app-eyebrow">UN INTERLOCUTEUR LOCAL</p>
                <h2>Bonjour, c’est Thibaut.</h2>
              </div>
            </div>
            <div className="app-artisan">
              <img
                src="/images/thibaut-sachot-homeatoutfaire.webp"
                alt="Thibaut SACHOT, votre artisan multiservices"
              />
              <div>
                <p>
                  Petits travaux, dépannage et entretien courant autour de
                  Sainte-Anastasie, jusqu’à environ 50 km selon la demande.
                </p>
                <button className="app-text-link" onClick={() => go("contact")}>
                  On en parle ? <ArrowRight size={17} />
                </button>
              </div>
            </div>
            {visibleProjects.length > 0 && (
              <>
                <div className="app-section-heading">
                  <h2>À reprendre quand vous voulez</h2>
                  <button
                    className="app-text-link"
                    onClick={() => go("projects")}
                  >
                    Tout voir <ArrowRight size={16} />
                  </button>
                </div>
                <ProjectRow
                  project={visibleProjects[0]}
                  onOpen={() => {
                    setNotice("");
                    setActiveId(visibleProjects[0].id);
                  }}
                />
              </>
            )}
            <p className="app-home-footnote">
              <ShieldCheck size={16} /> Vos brouillons restent sur cet appareil.
              Un enregistrement n’est pas un envoi à l’artisan.
            </p>
          </section>
        ) : tab === "services" ? (
          <section>
            <p className="app-eyebrow">DES PETITS TRAVAUX BIEN DÉFINIS</p>
            <h1>
              De quoi avez-vous <em>besoin ?</em>
            </h1>
            <p className="app-lead">
              Choisissez un sujet pour voir les exemples et préparer votre
              demande.
            </p>
            <div className="app-service-grid">
              {appServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.quoteService}
                    className={chosenService === index ? "is-selected" : ""}
                    aria-pressed={chosenService === index}
                    onClick={() => setChosenService(index)}
                  >
                    <Icon size={27} />
                    <strong>{service.shortTitle}</strong>
                    <ChevronRight size={15} />
                  </button>
                );
              })}
            </div>
            {chosenService !== null && (
              <div className="app-paper app-service-panel" aria-live="polite">
                <h2>{selected.title}</h2>
                <p>{selected.description}</p>
                <ul>
                  {selected.examples.map((example) => (
                    <li key={example}>
                      <Check size={17} /> {example}
                    </li>
                  ))}
                </ul>
                <p className="app-scope">
                  <ShieldCheck size={18} />
                  <span>{selected.scope}</span>
                </p>
                <button
                  className="app-primary"
                  onClick={() => start(selected.quoteService)}
                >
                  <Plus size={18} /> Préparer cette demande
                </button>
                <button
                  className="app-text-link"
                  onClick={() => openPage(selected.href)}
                >
                  Tous les détails sur le site <ArrowRight size={16} />
                </button>
              </div>
            )}
          </section>
        ) : tab === "projects" ? (
          <section>
            <div className="app-section-heading">
              <div>
                <p className="app-eyebrow">CONSERVÉS SUR CET APPAREIL</p>
                <h1>
                  Mes petits <em>projets.</em>
                </h1>
              </div>
              <button
                className="app-icon-button app-new"
                aria-label="Créer un projet"
                onClick={() => start()}
                disabled={saveState === "loading"}
              >
                <Plus size={23} />
              </button>
            </div>
            <p className="app-lead">
              Retrouvez vos notes et photos. Chaque dossier reste un brouillon
              tant que vous ne le transmettez pas.
            </p>
            {saveState === "loading" ? (
              <p role="status">Ouverture de votre carnet…</p>
            ) : visibleProjects.length ? (
              <div className="app-project-list">
                {visibleProjects.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    onOpen={() => {
                      setNotice("");
                      setActiveId(project.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="app-empty">
                <FolderHeart size={42} />
                <h2>Votre première idée commence ici.</h2>
                <p>
                  Une porte à régler ou une pièce à rafraîchir ? Notez votre
                  besoin, ajoutez vos photos et reprenez-le plus tard.
                </p>
                <button className="app-primary" onClick={() => start()}>
                  <Plus size={18} /> Créer mon premier projet
                </button>
              </div>
            )}
            {archived.length > 0 && (
              <>
                <button
                  className="app-text-link app-archives-toggle"
                  onClick={() => setShowArchived(!showArchived)}
                >
                  <RotateCcw size={16} />{" "}
                  {showArchived
                    ? "Masquer les archives"
                    : `Voir les archives (${archived.length})`}
                </button>
                {showArchived && (
                  <div className="app-project-list">
                    {archived.map((project) => (
                      <ProjectRow
                        key={project.id}
                        project={project}
                        onOpen={() => setActiveId(project.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            <p className="app-home-footnote">
              <WifiOff size={16} /> Les projets Android sont consultables sans
              connexion. Le partage et les contacts nécessitent le service
              choisi.
            </p>
          </section>
        ) : (
          <section>
            <p className="app-eyebrow">HOMEATOUTFAIRE · GARD</p>
            <h1>
              Un besoin ?<br />
              <em>On en parle.</em>
            </h1>
            <div className="app-contact-person">
              <img
                src="/images/thibaut-sachot-homeatoutfaire.webp"
                alt="Thibaut SACHOT"
              />
              <div>
                <h2>Thibaut SACHOT</h2>
                <p>
                  Votre artisan multiservices
                  <br />à Sainte-Anastasie
                </p>
              </div>
            </div>
            <div className="app-contact-routes">
              <a href="tel:0618085598">
                <Phone size={23} />
                <span>
                  <small>PAR TÉLÉPHONE</small>
                  <strong>06 18 08 55 98</strong>
                </span>
                <ArrowRight size={19} />
              </a>
              <button
                onClick={() => {
                  void openBusinessPage(
                    "https://wa.me/33618085598?text=Bonjour%20Thibaut%2C%20je%20souhaite%20vous%20parler%20de%20petits%20travaux.",
                  ).catch(() =>
                    setNotice(
                      "WhatsApp n’a pas pu s’ouvrir. Vous pouvez appeler ou envoyer un e-mail.",
                    ),
                  );
                }}
              >
                <MessageCircle size={23} />
                <span>
                  <small>UN MESSAGE, UNE PHOTO</small>
                  <strong>Sur WhatsApp</strong>
                </span>
                <ArrowRight size={19} />
              </button>
              <a href="mailto:hatf30190@gmail.com">
                <Mail size={23} />
                <span>
                  <small>PAR E-MAIL</small>
                  <strong>hatf30190@gmail.com</strong>
                </span>
                <ArrowRight size={19} />
              </a>
            </div>
            <div className="app-paper app-practical">
              <h2>Avant de nous contacter</h2>
              <p>
                <strong>Lundi – samedi : 8 h – 18 h.</strong>
                <br />
                Dimanche matin : extrême urgence uniquement, selon
                disponibilité.
              </p>
              <p>
                Jusqu’à environ 50 km autour de Sainte-Anastasie, selon la
                nature du travail et les disponibilités. Entreprise mobile, sans
                accueil du public sur place.
              </p>
              <p>
                La prestation, le tarif et le créneau sont précisés ensemble
                avant l’intervention.
              </p>
              <button
                className="app-primary"
                onClick={() => openPage("/#devis")}
              >
                Demander un devis sur le site <ArrowRight size={17} />
              </button>
            </div>
            <div className="app-about-links">
              <button onClick={() => openPage("/")}>
                Voir le site et les réalisations <ArrowRight size={16} />
              </button>
              <button onClick={() => setPrivacy(true)}>
                Confidentialité du carnet <ShieldCheck size={16} />
              </button>
              <button onClick={() => openPage("/mentions-legales")}>
                Mentions légales <ArrowRight size={16} />
              </button>
            </div>
            <p className="app-version">
              HomeAToutFaire · Android 1.0.0
              {!native && " · Version web du carnet"}
            </p>
          </section>
        )}
      </main>
      {!privacy && (
        <nav
          className="app-bottom-nav"
          aria-label="Navigation de l’application"
        >
          {(
            [
              { id: "home", label: "Accueil", Icon: House },
              { id: "services", label: "Prestations", Icon: Sparkles },
              { id: "projects", label: "Mes projets", Icon: FolderHeart },
              { id: "contact", label: "Contact", Icon: MessageCircle },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              aria-current={!active && tab === id ? "page" : undefined}
              onClick={() => go(id)}
            >
              <Icon size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function ProjectRow({
  project,
  onOpen,
}: {
  project: MobileProject;
  onOpen: () => void;
}) {
  const service = appServices.find(
    (item) => item.quoteService === project.service,
  );
  const Icon = service?.icon ?? ClipboardList;
  return (
    <button className="app-project-row" onClick={onOpen}>
      <span className="app-project-icon">
        {project.photos[0] ? (
          <img src={project.photos[0].dataUrl} alt="" />
        ) : (
          <Icon size={25} />
        )}
      </span>
      <span>
        <strong>{projectTitle(project)}</strong>
        <small>
          {project.archived ? "Archivé" : "Brouillon"} · {project.photos.length}{" "}
          photo{project.photos.length > 1 ? "s" : ""}
          {project.commune ? ` · ${project.commune}` : ""}
        </small>
      </span>
      <ChevronRight size={19} />
    </button>
  );
}
