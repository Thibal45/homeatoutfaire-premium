import test from "node:test";
import assert from "node:assert/strict";
import { indexedDB } from "fake-indexeddb";
import { unzipSync, strFromU8 } from "fflate";
import {
  loadProjects,
  newProject,
  projectArchive,
  projectText,
  projectTitle,
  saveProject,
} from "../app/lib/mobile-projects.ts";

globalThis.indexedDB = indexedDB;

test("a project is a local draft, without inferred customer or booking state", () => {
  const project = newProject("Petits travaux électriques");
  assert.equal(projectTitle(project), "Petits travaux électriques");
  assert.equal(project.archived, false);
  assert.deepEqual(project.photos, []);
  assert.ok(!("sentAt" in project));
  assert.match(projectText(project), /ne vaut pas envoi ni confirmation/);
  assert.match(projectText(project), /hatf30190@gmail.com/);
});

test("IndexedDB persists an edited project across reloads, preserving notes and photos", async () => {
  const project = {
    ...newProject("Peinture"),
    title: "Plafond du salon",
    commune: "Sainte-Anastasie",
    message: "Une retouche à étudier",
    examples: ["Murs et plafonds"],
    photos: [
      {
        id: "photo-1",
        name: "Test",
        dataUrl: "data:image/jpeg;base64,/9j/2Q==",
      },
    ],
  };
  await saveProject(project);
  const loaded = (await loadProjects()).find((p) => p.id === project.id);
  assert.deepEqual(loaded, project);
  await saveProject({ ...project, message: "Texte corrigé", archived: true });
  const archived = (await loadProjects()).find((p) => p.id === project.id);
  assert.equal(archived.archived, true);
  assert.equal(archived.message, "Texte corrigé");
  assert.deepEqual(archived.photos, project.photos);
  await saveProject({ ...archived, archived: false });
  assert.equal(
    (await loadProjects()).find((p) => p.id === project.id).archived,
    false,
  );
});

test("export contains readable French notes and exactly the selected photos in safe paths", () => {
  const project = {
    ...newProject("Menuiserie"),
    title: "Porte <script>alert(1)</script>",
    message: "Poignée à régler — côté jardin",
    examples: ["Réglages de portes et poignées"],
    photos: [
      {
        id: "../../x",
        name: "../../x.exe",
        dataUrl: "data:image/jpeg;base64,/9j/2Q==",
      },
    ],
  };
  const files = unzipSync(projectArchive(project));
  assert.deepEqual(Object.keys(files), [
    "ma-demande.txt",
    "photos/photo-01.jpg",
  ]);
  assert.match(
    strFromU8(files["ma-demande.txt"]),
    /Poignée à régler — côté jardin/,
  );
  assert.deepEqual([...files["photos/photo-01.jpg"]], [255, 216, 255, 217]);
});

test("invalid attachments and excessive photos cannot silently enter an export or storage", async () => {
  const invalid = {
    ...newProject(),
    photos: [
      { id: "x", name: "x", dataUrl: "data:text/html;base64,PHNjcmlwdD4=" },
    ],
  };
  assert.throws(() => projectArchive(invalid), /illisible/);
  await assert.rejects(
    saveProject({ ...invalid, photos: Array(7).fill(invalid.photos[0]) }),
    /6 photos/,
  );
});
