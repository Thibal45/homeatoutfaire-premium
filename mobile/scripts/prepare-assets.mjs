import { mkdir, copyFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
await mkdir(new URL("public/images/", root), { recursive: true });
await copyFile(
  new URL("../public/images/thibaut-sachot-homeatoutfaire.webp", root),
  new URL("public/images/thibaut-sachot-homeatoutfaire.webp", root),
);
