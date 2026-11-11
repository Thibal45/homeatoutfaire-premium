// Real consent component and portal. Analytics scripts are inert test doubles.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as jsx from "react/jsx-runtime";
import { JSDOM } from "jsdom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const firstDom = new JSDOM("<div></div>");
globalThis.window = firstDom.window;
globalThis.document = firstDom.window.document;
Object.defineProperty(globalThis, "navigator", { configurable: true, value: firstDom.window.navigator });
const { createRoot } = await import("react-dom/client");
const key = "homeatoutfaire-cookie-consent";

async function mount({ hostname = "www.homeatoutfaire30.fr", saved = null, withHost = true } = {}) {
  const dom = new JSDOM(`<header>${withHost ? '<div id="cookie-consent-slot"></div>' : ''}</header><main>Page content</main><div id="root"></div>`, { url: `https://${hostname}/`, pretendToBeVisual: true });
  globalThis.window = dom.window; globalThis.document = dom.window.document;
  if (saved) dom.window.localStorage.setItem(key, saved);
  let pathname = "/";
  const context = vm.createContext({ window: dom.window, document: dom.window.document, console });
  const exportsByModule = {
    react: React, "react-dom": ReactDOM, "react/jsx-runtime": jsx,
    "next/link": { default: ({ children, ...props }) => React.createElement("a", props, children) },
    "next/navigation": { usePathname: () => pathname },
    "next/script": { default: (props) => React.createElement("span", { "data-script-id": props.id }) },
    "lucide-react": { Cookie: () => React.createElement("svg", { "aria-hidden": true }) },
  };
  const source = await readFile(new URL("../app/components/CookieConsent.tsx", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const component = new vm.SourceTextModule(compiled, { context });
  await component.link(async specifier => {
    const exports = exportsByModule[specifier];
    assert.ok(exports, `Unexpected import ${specifier}`);
    const m = new vm.SyntheticModule(Object.keys(exports), function() {
      for (const [name, value] of Object.entries(exports)) this.setExport(name, value);
    }, { context });
    await m.link(() => {}); await m.evaluate(); return m;
  });
  await component.evaluate();
  const Component = component.namespace.default;
  const root = createRoot(document.getElementById("root"));
  const render = async () => {
    await React.act(async () => root.render(React.createElement(Component)));
    await React.act(async () => new Promise(resolve => setTimeout(resolve, 15)));
  };
  await render();
  return {
    dom,
    banner: () => dom.window.document.querySelector('[aria-labelledby="cookie-consent-title"]'),
    scripts: () => [...dom.window.document.querySelectorAll("[data-script-id]")],
    async click(text) { await React.act(async () => [...dom.window.document.querySelectorAll("button")].find(b => b.textContent.trim() === text).click()); },
    async navigate() {
      document.getElementById("cookie-consent-slot")?.remove();
      const slot = document.createElement("div"); slot.id = "cookie-consent-slot";
      document.querySelector("header").append(slot);
      pathname = "/peinture"; await render();
    },
    async close() { await React.act(async () => root.unmount()); dom.window.close(); },
  };
}

test("consent banner presentation and consent preservation", async t => {
  await t.test("initial undecided visit renders in the header slot, never as an overlay", async () => {
    const h = await mount();
    assert.equal(h.banner().parentElement.id, "cookie-consent-slot");
    assert.doesNotMatch(h.banner().className, /\b(fixed|absolute|sticky)\b/);
    assert.equal(h.banner().querySelectorAll("button").length, 2);
    for (const b of h.banner().querySelectorAll("button")) assert.match(b.className, /min-h-12/);
    assert.equal(h.scripts().length, 0);
    assert.equal(h.dom.window.localStorage.getItem(key), null);
    assert.match(h.banner().textContent, /continuer votre visite sans accepter/);
    await h.close();
  });
  await t.test("refusal stores only denied, removes GA cookies and never loads analytics", async () => {
    const h = await mount();
    h.dom.window.document.cookie = "_ga=unit-test; path=/";
    h.dom.window.document.cookie = "unrelated=keep; path=/";
    await h.click("Tout refuser");
    assert.equal(h.banner(), null); assert.equal(h.scripts().length, 0);
    assert.equal(h.dom.window.localStorage.getItem(key), "denied");
    assert.doesNotMatch(h.dom.window.document.cookie, /_ga=/);
    assert.match(h.dom.window.document.cookie, /unrelated=keep/);
    await h.close();
  });
  await t.test("only explicit acceptance on a production hostname mounts the GA scripts", async () => {
    const h = await mount(); await h.click("Tout accepter");
    assert.equal(h.dom.window.localStorage.getItem(key), "granted");
    assert.equal(h.banner(), null); assert.equal(h.scripts().length, 2);
    await h.close();
  });
  await t.test("a preview does not load analytics, even after acceptance", async () => {
    const h = await mount({ hostname: "test-preview.vercel.app" });
    await h.click("Tout accepter"); assert.equal(h.scripts().length, 0); await h.close();
  });
  await t.test("footer preference control stays in flow and reopens with focus without changing consent", async () => {
    const h = await mount({ saved: "denied" });
    const button = document.querySelector('[aria-label="Gérer mes préférences de cookies"]');
    assert.doesNotMatch(button.className, /\bfixed\b/);
    await h.click("Gérer mes cookies");
    assert.equal(document.activeElement, h.banner());
    assert.equal(h.dom.window.localStorage.getItem(key), "denied");
    assert.equal(h.scripts().length, 0); await h.close();
  });
  await t.test("no automatic scrolling or preference decision on initial display", async () => {
    const h = await mount();
    assert.notEqual(document.activeElement, h.banner());
    await h.click("Gérer mes cookies");
    assert.equal(document.activeElement, h.banner());
    assert.equal(h.dom.window.localStorage.getItem(key), null);
    await h.close();
  });
  await t.test("client navigation replaces the portal host without losing the banner", async () => {
    const h = await mount(); const oldHost = h.banner().parentElement;
    await h.navigate();
    assert.notEqual(h.banner().parentElement, oldHost);
    assert.equal(h.banner().parentElement, document.getElementById("cookie-consent-slot"));
    assert.equal(h.scripts().length, 0); await h.close();
  });
  await t.test("a saved acceptance is respected and an absent header has a non-overlay fallback", async () => {
    const accepted = await mount({ saved: "granted" });
    assert.equal(accepted.banner(), null); assert.equal(accepted.scripts().length, 2); await accepted.close();
    const fallback = await mount({ withHost: false });
    assert.ok(fallback.banner());
    assert.doesNotMatch(fallback.banner().className, /\b(fixed|absolute|sticky)\b/);
    await fallback.close();
  });
});
