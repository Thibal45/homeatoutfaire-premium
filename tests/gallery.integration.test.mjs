// Real Gallery + React DOM; only framework/rendering adapters are mocked.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as React from "react";
import * as jsx from "react/jsx-runtime";
import { JSDOM } from "jsdom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const dom = new JSDOM("<!doctype html><div id='root'></div>", {
  url: "https://test.invalid/", pretendToBeVisual: true,
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, "navigator", { configurable: true, value: dom.window.navigator });
const { createRoot } = await import("react-dom/client");
const context = vm.createContext({ window: dom.window, document: dom.window.document, console });
const cache = new Map();
const motionProps = new Set(["initial", "animate", "exit", "transition", "whileHover", "whileTap", "whileInView", "viewport", "drag", "dragMomentum", "dragElastic", "whileDrag"]);
const motionCache = new Map();
const motion = new Proxy({}, { get(_, tag) {
  if (!motionCache.has(tag)) motionCache.set(tag, React.forwardRef(function Motion({ children, ...props }, ref) {
    return React.createElement(tag, { ...Object.fromEntries(Object.entries(props).filter(([key]) => !motionProps.has(key))), ref }, children);
  }));
  return motionCache.get(tag);
} });

async function moduleFor(specifier) {
  if (cache.has(specifier)) return cache.get(specifier);
  let exports;
  if (specifier === "react") exports = React;
  if (specifier === "react/jsx-runtime") exports = jsx;
  if (specifier === "next/link") exports = { default: ({ children, ...props }) => React.createElement("a", props, children) };
  if (specifier === "next/image") exports = { default: (props) => React.createElement("img", Object.fromEntries(Object.entries(props).filter(([key]) => key !== "fill" && key !== "priority"))) };
  if (specifier === "framer-motion") exports = { motion, AnimatePresence: ({ children }) => children };
  if (specifier === "lucide-react") exports = Object.fromEntries(["ChevronLeft", "ChevronRight", "Maximize2", "Minus", "Plus", "X"].map(name => [name, () => React.createElement("svg", { "aria-hidden": true })]));
  if (exports) {
    const m = new vm.SyntheticModule(Object.keys(exports), function() {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
    cache.set(specifier, m); await m.link(() => {}); await m.evaluate(); return m;
  }
  const path = specifier === "../data/gallery" ? "app/data/gallery.ts" : "app/components/Gallery.tsx";
  const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX,
  } }).outputText;
  const m = new vm.SourceTextModule(compiled, { context, identifier: path });
  cache.set(specifier, m); await m.link(moduleFor); await m.evaluate(); return m;
}

test("real project and illustration gallery", async t => {
  const Gallery = (await moduleFor("Gallery")).namespace.default;
  const root = createRoot(document.getElementById("root"));
  const act = React.act;
  const click = async label => act(async () => document.querySelector(`[aria-label="${label}"]`).click());
  const key = async (value, shiftKey = false) => act(async () => {
    window.dispatchEvent(new window.KeyboardEvent("keydown", { key: value, shiftKey, cancelable: true }));
  });
  await act(async () => root.render(React.createElement(Gallery)));
  try {
    await t.test("before reconstruction and after photo have distinct provenance labels", () => {
      const article = document.querySelector('[aria-labelledby="ceiling-project-title"]');
      assert.equal(article.querySelectorAll("figure").length, 3);
      for (const img of article.querySelectorAll("img")) {
        assert.equal(img.width, 1448); assert.equal(img.height, 1086);
        assert.match(img.className, /h-auto w-full/);
        assert.doesNotMatch(img.className, /object-cover/);
      }
      assert.equal(document.querySelectorAll('[aria-haspopup="dialog"]').length, 9);
      assert.deepEqual([...document.querySelectorAll('a[aria-label^="Voir les prestations :"]')].map(a => a.getAttribute("href")), ["/peinture", "/menuiserie", "/electricite", "/plomberie", "/entretien-piscine", "/depannage"]);
      assert.match(document.body.textContent, /non des photos de chantiers réalisés/);
      assert.match(article.textContent, /Avant — reconstitution illustrative/);
      assert.match(article.textContent, /État avant travaux non photographié/);
      assert.match(article.textContent, /Après — plafond rénové/);
      assert.doesNotMatch(article.textContent, /Dions|certifi|garanti/i);
      assert.match(article.textContent, /Sainte-Anastasie/);
      assert.equal(article.querySelectorAll("li").length, 3);
      assert.match(article.textContent, /mate lessivable/);
      assert.equal(article.querySelector("a").getAttribute("href"), "/#devis");
    });
    await t.test("reconstruction opens with provenance, correct source, counter and scroll lock", async () => {
      document.querySelector('[aria-label="Agrandir la réalisation : Avant — reconstitution illustrative"]').focus();
      await click("Agrandir la réalisation : Avant — reconstitution illustrative");
      const dialog = document.querySelector('[role="dialog"]');
      assert.equal(dialog.getAttribute("aria-modal"), "true");
      assert.match(dialog.textContent, /Reconstitution illustrative · État avant travaux non photographié · 1 \/ 9/);
      assert.match(dialog.querySelector("img").src, /plafond-avant-reconstitution/);
      assert.equal(document.body.style.overflow, "hidden");
    });
    await t.test("navigation preserves real/illustration labels and wraps correctly", async () => {
      await key("ArrowRight");
      assert.match(document.querySelector('[role="dialog"] img').src, /plafond-apres-angle-comparable-retouche/);
      assert.match(document.querySelector('[role="dialog"]').textContent, /Après intervention · Photo retouchée/);
      await key("ArrowRight");
      assert.match(document.querySelector('[role="dialog"] img').src, /plafond-apres-sejour-ameliore/);
      await click("Image suivante");
      assert.match(document.querySelector('[role="dialog"]').textContent, /Illustration de prestation · 4 \/ 9/);
      assert.match(document.querySelector('[role="dialog"] img').src, /realisation1.jpg/);
      await key("ArrowLeft"); await key("ArrowLeft"); await key("ArrowLeft"); await key("ArrowLeft");
      assert.match(document.querySelector('[role="dialog"]').textContent, /9 \/ 9/);
      await key("ArrowRight");
      assert.match(document.querySelector('[role="dialog"]').textContent, /1 \/ 9/);
    });
    await t.test("keyboard focus is contained and Escape restores opener and scrolling", async () => {
      await act(async () => new Promise(resolve => setTimeout(resolve, 25)));
      const buttons = document.querySelector('[role="dialog"]').querySelectorAll("button:not([disabled])");
      buttons[buttons.length - 1].focus(); await key("Tab");
      assert.equal(document.activeElement, buttons[0]);
      await key("Tab", true); assert.equal(document.activeElement, buttons[buttons.length - 1]);
      await key("Escape");
      await act(async () => new Promise(resolve => setTimeout(resolve, 25)));
      assert.equal(document.querySelector('[role="dialog"]'), null);
      assert.equal(document.body.style.overflow, "");
      assert.equal(document.activeElement.getAttribute("aria-label"), "Agrandir la réalisation : Avant — reconstitution illustrative");
    });
    await t.test("illustration card opens at its own offset rather than a real photo", async () => {
      await click("Agrandir l'exemple de prestation : Peinture intérieure");
      assert.match(document.querySelector('[role="dialog"] img').src, /realisation1.jpg/);
      assert.match(document.querySelector('[role="dialog"]').textContent, /Illustration de prestation · 4 \/ 9/);
      await key("Escape");
    });
  } finally { await act(async () => root.unmount()); dom.window.close(); }
});
