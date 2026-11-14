import { strToU8, zipSync } from "fflate";

export type ProjectPhoto = { id: string; dataUrl: string; name: string };
export type MobileProject = {
  id: string;
  title: string;
  service: string;
  commune: string;
  message: string;
  examples: string[];
  photos: ProjectPhoto[];
  createdAt: string;
  updatedAt: string;
  archived: boolean;
};

export const MAX_PHOTOS = 6;
const DATABASE = "homeatoutfaire-carnet-v1";

export function newProject(service = ""): MobileProject {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "",
    service,
    commune: "",
    message: "",
    examples: [],
    photos: [],
    createdAt: now,
    updatedAt: now,
    archived: false,
  };
}

export function projectTitle(project: MobileProject) {
  return project.title.trim() || project.service || "Mon petit projet";
}

export function projectText(project: MobileProject) {
  return [
    "DEMANDE HOMEATOUTFAIRE",
    `Destinataire : Thibaut SACHOT · hatf30190@gmail.com · 06 18 08 55 98`,
    "",
    projectTitle(project),
    project.service && `Prestation : ${project.service}`,
    project.commune.trim() && `Commune : ${project.commune.trim()}`,
    "",
    ...project.examples.map((example) => `• ${example}`),
    project.message.trim(),
    "",
    `${project.photos.length} photo(s) jointe(s) au dossier.`,
    "La prise en charge, le tarif et le créneau sont à convenir avec HomeAToutFaire.",
    "Ce document est un brouillon : son export ne vaut pas envoi ni confirmation d’intervention.",
  ].join("\n");
}

async function database() {
  if (typeof indexedDB === "undefined")
    throw new Error("Le stockage local n’est pas disponible sur cet appareil.");
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore("projects", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(new Error("Impossible d’ouvrir le carnet local."));
    request.onblocked = () =>
      reject(new Error("Fermez les autres fenêtres du carnet puis réessayez."));
  });
}

export async function loadProjects(): Promise<MobileProject[]> {
  const db = await database();
  try {
    return await new Promise((resolve, reject) => {
      const request = db
        .transaction("projects", "readonly")
        .objectStore("projects")
        .getAll();
      request.onsuccess = () =>
        resolve(
          (request.result as MobileProject[]).sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt),
          ),
        );
      request.onerror = () =>
        reject(new Error("Impossible de lire les projets enregistrés."));
    });
  } finally {
    db.close();
  }
}

export async function saveProject(project: MobileProject) {
  if (project.photos.length > MAX_PHOTOS)
    throw new Error(`Le dossier est limité à ${MAX_PHOTOS} photos.`);
  const db = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("projects", "readwrite");
      transaction.objectStore("projects").put(project);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(
          new Error(
            "Le carnet n’a pas pu être enregistré. Exportez votre dossier pour le conserver.",
          ),
        );
      transaction.onabort = () =>
        reject(
          new Error(
            "Stockage insuffisant ou indisponible. Exportez votre dossier avant de quitter.",
          ),
        );
    });
  } finally {
    db.close();
  }
}

export function projectArchive(project: MobileProject): Uint8Array {
  const files: Record<string, Uint8Array> = {
    "ma-demande.txt": strToU8(projectText(project)),
  };
  project.photos.forEach((photo, index) => {
    if (!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(photo.dataUrl))
      throw new Error("Une photo du dossier est illisible.");
    const binary = atob(photo.dataUrl.split(",")[1]);
    files[`photos/photo-${String(index + 1).padStart(2, "0")}.jpg`] =
      Uint8Array.from(binary, (character) => character.charCodeAt(0));
  });
  return zipSync(files, { level: 0 });
}

/** Re-encode user-selected images locally: bounded size, JPEG and no copied EXIF metadata. */
export async function preparePhoto(
  source: Blob | string,
): Promise<ProjectPhoto> {
  if (
    source instanceof Blob &&
    (!source.type.startsWith("image/") || source.size > 25 * 1024 * 1024)
  )
    throw new Error("Choisissez une image de moins de 25 Mo.");
  const temporaryUrl =
    typeof source === "string" ? null : URL.createObjectURL(source);
  try {
    const image = new Image();
    image.src = typeof source === "string" ? source : temporaryUrl!;
    await image.decode();
    if (
      !image.naturalWidth ||
      image.naturalWidth * image.naturalHeight > 80_000_000
    )
      throw new Error("Cette image est trop grande pour le carnet.");
    const scale = Math.min(
      1,
      1600 / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error("La préparation de la photo est indisponible.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return {
      id: crypto.randomUUID(),
      name: "Photo du projet",
      dataUrl: canvas.toDataURL("image/jpeg", 0.82),
    };
  } finally {
    if (temporaryUrl) URL.revokeObjectURL(temporaryUrl);
  }
}
