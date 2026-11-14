import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "./",
  publicDir: "public",
  build: { outDir: "dist", emptyOutDir: true, target: "es2020" },
});
