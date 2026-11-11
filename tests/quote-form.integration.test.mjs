// Component integration tests: real React + DOM, mocked Google/EmailJS, no network.
// node --experimental-vm-modules --test tests/quote-form.integration.test.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as React from "react";
import * as jsx from "react/jsx-runtime";
import { JSDOM } from "jsdom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const firstDom = new JSDOM("<!doctype html><div id='root'></div>", { url: "https://test.invalid/" });
globalThis.window = firstDom.window;
globalThis.document = firstDom.window.document;
Object.defineProperty(globalThis, "navigator", { configurable: true, value: firstDom.window.navigator });
const { createRoot } = await import("react-dom/client");

async function mount({ siteKey = "unit-test-key", script = "ready", provider = "success", storageThrows = false, previousSend = null } = {}) {
  const dom = new JSDOM("<!doctype html><div id='root'></div>", { url: "https://test.invalid/" });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  const s = { sends: [], analytics: [], scriptLoads: 0, resets: 0, widget: null, resolve: null, reject: null };
  const storage = dom.window.localStorage;
  if (previousSend) storage.setItem("hatf:last-quote-sent", previousSend);
  if (storageThrows) Object.defineProperty(dom.window, "localStorage", { get() { throw new Error("Storage disabled"); } });
  dom.window.grecaptcha = {
    ready(callback) { callback(); },
    render(element, options) { s.widget = options; element.textContent = "Mock CAPTCHA — unit test only"; return 17; },
    reset() { s.resets++; s.widget?.["expired-callback"](); },
  };
  function MockScript(props) {
    const initialProps = React.useRef(props);
    React.useEffect(() => {
      s.scriptLoads++;
      if (script === "error") initialProps.current.onError();
      else if (script === "ready") initialProps.current.onReady();
    }, []);
    return null;
  }
  const context = vm.createContext({
    window: dom.window, document: dom.window.document, FormData: dom.window.FormData,
    URLSearchParams, console, Date,
    process: { env: { NEXT_PUBLIC_RECAPTCHA_SITE_KEY: siteKey, NEXT_PUBLIC_EMAILJS_SERVICE_ID: "test-service", NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "test-template", NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "test-public-key" } },
  });
  const cache = new Map();
  async function moduleFor(specifier) {
    if (cache.has(specifier)) return cache.get(specifier);
    let exports;
    if (specifier === "react") exports = React;
    else if (specifier === "react/jsx-runtime") exports = jsx;
    else if (specifier === "next/script") exports = { default: MockScript };
    else if (specifier === "next/link") exports = { default: ({ children, ...props }) => React.createElement("a", props, children) };
    else if (specifier === "lucide-react") exports = Object.fromEntries(["CheckCircle2", "FileImage", "FileText", "LoaderCircle", "Mail", "MapPin", "MessageCircle", "Phone", "Send", "UserRound", "Wrench", "XCircle"].map(name => [name, () => React.createElement("svg", { "aria-hidden": true })]));
    else if (specifier === "../lib/analytics") exports = { trackContactClick() {}, trackQuoteSent(...args) { s.analytics.push(args); } };
    else if (specifier === "@emailjs/browser") exports = { send(...args) {
      s.sends.push(args);
      if (provider === "pending") return new Promise((resolve, reject) => { s.resolve = resolve; s.reject = reject; });
      return provider === "error" ? Promise.reject(new Error("Provider failure")) : Promise.resolve({ status: 200, text: "OK" });
    } };
    if (exports) {
      const m = new vm.SyntheticModule(Object.keys(exports), function() { for (const [key, value] of Object.entries(exports)) this.setExport(key, value); }, { context });
      cache.set(specifier, m);
      await m.link(() => {}); await m.evaluate(); return m;
    }
    const filename = specifier === "./QuoteCaptcha" ? "app/components/QuoteCaptcha.tsx" : specifier === "../lib/quote-security" ? "app/lib/quote-security.ts" : specifier === "QuoteForm" ? "app/components/QuoteForm.tsx" : null;
    if (!filename) throw new Error(`Unexpected import: ${specifier}`);
    const source = await readFile(new URL(`../${filename}`, import.meta.url), "utf8");
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    const m = new vm.SourceTextModule(compiled, { context, identifier: filename, importModuleDynamically: moduleFor });
    cache.set(specifier, m); await m.link(moduleFor); await m.evaluate(); return m;
  }
  const Form = (await moduleFor("QuoteForm")).namespace.default;
  const root = createRoot(dom.window.document.getElementById("root"));
  await React.act(async () => { root.render(React.createElement(Form)); });
  const form = dom.window.document.querySelector("form");
  const fill = (overrides = {}) => {
    const fields = { name: "  Client test  ", phone: "0600000000", email: "", address: "Dions 30190", service: "Menuiserie", message: "Une porte à ajuster.", ...overrides };
    React.act(() => {
      for (const [name, value] of Object.entries(fields)) form.elements.namedItem(name).value = value;
      form.elements.namedItem("service").dispatchEvent(new dom.window.Event("change", { bubbles: true }));
    });
  };
  const activate = async () => { await React.act(async () => { [...form.querySelectorAll("button")].find(b => b.textContent.includes("Activer"))?.click(); }); };
  const solveMock = async () => { await activate(); await React.act(async () => { s.widget.callback("unit-test-token-not-valid-at-google"); }); };
  const submit = async (times = 1) => { await React.act(async () => { for (let i = 0; i < times; i++) form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true })); await new Promise(resolve => setImmediate(resolve)); }); };
  const close = async () => { await React.act(async () => root.unmount()); dom.window.close(); };
  return { s, dom, form, storage, fill, activate, solveMock, submit, close };
}

test("component security integration (all providers mocked, no real CAPTCHA)", async t => {
  await t.test("Google script is not loaded before explicit activation", async () => {
    const h = await mount(); assert.equal(h.s.scriptLoads, 0); await h.activate(); assert.equal(h.s.scriptLoads, 1); await h.close();
  });
  await t.test("missing site key fails closed and exposes phone/email alternatives", async () => {
    const h = await mount({ siteKey: "" }); h.fill(); await h.submit(); assert.equal(h.s.sends.length, 0); assert.match(h.form.textContent, /momentanément indisponible/); assert.ok(h.form.querySelector('a[href="tel:0618085598"]')); assert.ok(h.form.querySelector('a[href="mailto:hatf30190@gmail.com"]')); await h.close();
  });
  await t.test("missing token preserves the request and focuses an accessible alert", async () => {
    const h = await mount(); h.fill(); await h.submit(); assert.equal(h.s.sends.length, 0); assert.equal(h.form.elements.name.value, "  Client test  "); assert.equal(h.dom.window.document.activeElement.getAttribute("role"), "alert"); await h.close();
  });
  await t.test("failed CAPTCHA script cannot send or record a conversion", async () => {
    const h = await mount({ script: "error" }); h.fill(); await h.activate(); assert.match(h.form.textContent, /vérification n'a pas abouti/); await h.submit(); assert.equal(h.s.sends.length, 0); assert.equal(h.s.analytics.length, 0); await h.close();
  });
  await t.test("pending CAPTCHA script remains fail-closed", async () => {
    const h = await mount({ script: "pending" }); h.fill(); await h.activate(); assert.match(h.form.textContent, /Chargement de la vérification/); await h.submit(); assert.equal(h.s.sends.length, 0); await h.close();
  });
  await t.test("expiry removes a previously received mock token", async () => {
    const h = await mount(); h.fill(); await h.solveMock(); await React.act(async () => h.s.widget["expired-callback"]()); await h.submit(); assert.equal(h.s.sends.length, 0); assert.match(h.form.textContent, /complétez la vérification/); await h.close();
  });
  await t.test("widget error removes token and shows a retry message", async () => {
    const h = await mount(); h.fill(); await h.solveMock(); await React.act(async () => h.s.widget["error-callback"]()); await h.submit(); assert.equal(h.s.sends.length, 0); assert.match(h.form.textContent, /Réessayez le contrôle/); await h.close();
  });
  await t.test("two simultaneous submissions call the provider only once", async () => {
    const h = await mount({ provider: "pending" }); h.fill(); await h.solveMock(); await h.submit(2); assert.equal(h.s.sends.length, 1); assert.equal(h.form.querySelector('button[type="submit"]').disabled, true); await React.act(async () => h.s.resolve({ status: 200, text: "OK" })); assert.equal(h.s.analytics.length, 1); await h.close();
  });
  await t.test("provider failure retains fields, resets CAPTCHA and records no conversion/cooldown", async () => {
    const h = await mount({ provider: "error" }); h.fill(); await h.solveMock(); await h.submit(); assert.equal(h.s.sends.length, 1); assert.match(h.form.textContent, /L'envoi n'a pas abouti/); assert.equal(h.form.elements.name.value, "  Client test  "); assert.equal(h.s.resets, 1); assert.equal(h.s.analytics.length, 0); assert.equal(h.storage.length, 0); assert.equal(h.form.querySelector('button[type="submit"]').disabled, false); await h.close();
  });
  await t.test("success trims fields, resets the form and stores only a timestamp", async () => {
    const h = await mount(); h.fill(); await h.solveMock(); await h.submit(); assert.equal(h.s.sends[0][2].name, "Client test"); assert.equal(h.s.sends[0][2]["g-recaptcha-response"], "unit-test-token-not-valid-at-google"); assert.equal(h.form.elements.name.value, ""); assert.match(h.form.textContent, /demande a bien été envoyée/); assert.equal(h.s.analytics.length, 1); assert.equal(h.storage.length, 1); assert.match(h.storage.getItem("hatf:last-quote-sent"), /^\d+$/); assert.equal(h.s.resets, 1); await h.close();
  });
  await t.test("successful prior submission blocks an immediate repeat", async () => {
    const h = await mount({ previousSend: String(Date.now()) }); h.fill(); await h.solveMock(); await h.submit(); assert.equal(h.s.sends.length, 0); assert.match(h.form.textContent, /Patientez/); await h.close();
  });
  await t.test("unavailable storage does not prevent a request and in-memory cooldown still works", async () => {
    const h = await mount({ storageThrows: true }); h.fill(); await h.solveMock(); await h.submit(); assert.equal(h.s.sends.length, 1); h.fill(); await h.submit(); assert.equal(h.s.sends.length, 1); assert.match(h.form.textContent, /Patientez/); await h.close();
  });
  await t.test("honeypot records neither provider call nor conversion", async () => {
    const h = await mount(); h.fill(); h.form.elements.website.value = "bot-filled"; await h.submit(); assert.equal(h.s.sends.length, 0); assert.equal(h.s.analytics.length, 0); await h.close();
  });
  await t.test("phone-only contact and a legitimate photo URL are accepted", async () => {
    const h = await mount(); h.fill({ message: "Photos : https://photos.google.com/example" }); await h.solveMock(); await h.submit(); assert.equal(h.s.sends.length, 1); assert.equal(h.s.sends[0][2].email, ""); assert.match(h.s.sends[0][2].message, /photos.google.com/); await h.close();
  });
});
