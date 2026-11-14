import { Capacitor } from "@capacitor/core";
import {
  projectArchive,
  projectText,
  type MobileProject,
} from "./mobile-projects";

export const isNativeApp = () => Capacitor.isNativePlatform();

export async function captureProjectPhoto() {
  const { Camera, CameraResultType, CameraSource } =
    await import("@capacitor/camera");
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Prompt,
    quality: 85,
    width: 1600,
    correctOrientation: true,
    saveToGallery: false,
    promptLabelHeader: "Ajouter une photo",
    promptLabelPhoto: "Choisir dans mes photos",
    promptLabelPicture: "Prendre une photo",
    promptLabelCancel: "Annuler",
  });
  if (!photo.webPath) throw new Error("La photo n’a pas pu être chargée.");
  return photo.webPath;
}

export async function openBusinessPage(url: string) {
  const parsed = new URL(url);
  if (
    parsed.protocol !== "https:" ||
    !["www.homeatoutfaire30.fr", "wa.me"].includes(parsed.hostname)
  )
    throw new Error("Ce lien n’est pas autorisé.");
  if (isNativeApp()) {
    const { Browser } = await import("@capacitor/browser");
    await Browser.open({ url, toolbarColor: "#123543" });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function download(bytes: Uint8Array, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

/** Opens the OS share sheet; it never sends automatically or marks a request as received. */
export async function shareProject(
  project: MobileProject,
): Promise<"shared" | "downloaded"> {
  const bytes = projectArchive(project);
  const filename = `HomeAToutFaire-${project.id.slice(0, 8)}.zip`;
  if (isNativeApp()) {
    const { Filesystem, Directory } = await import("@capacitor/filesystem");
    const { Share } = await import("@capacitor/share");
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
      "",
    );
    const file = await Filesystem.writeFile({
      path: filename,
      data: btoa(binary),
      directory: Directory.Cache,
    });
    await Share.share({
      title: "Ma demande HomeAToutFaire",
      text: projectText(project),
      files: [file.uri],
      dialogTitle: "Partager mon dossier",
    });
    return "shared";
  }
  const file = new File([new Uint8Array(bytes)], filename, {
    type: "application/zip",
  });
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: "Ma demande HomeAToutFaire",
      text: projectText(project),
      files: [file],
    });
    return "shared";
  }
  download(bytes, filename, "application/zip");
  return "downloaded";
}

export function exportProject(project: MobileProject) {
  download(
    projectArchive(project),
    `HomeAToutFaire-${project.id.slice(0, 8)}.zip`,
    "application/zip",
  );
}

export function isCancelled(error: unknown) {
  return (
    error instanceof Error &&
    /cancel|annul|dismiss|abort/i.test(error.message + error.name)
  );
}
