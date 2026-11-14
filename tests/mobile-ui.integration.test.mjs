import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as React from "react";
import * as jsx from "react/jsx-runtime";
import * as fflate from "fflate";
import { IDBFactory } from "fake-indexeddb";
import { JSDOM } from "jsdom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const first = new JSDOM("<div></div>");
globalThis.window = first.window;
globalThis.document = first.window.document;
Object.defineProperty(globalThis, "navigator", { value: first.window.navigator, configurable: true });
const { createRoot } = await import("react-dom/client");
const repo = fileURLToPath(new URL("../", import.meta.url));

async function mount(indexedDB = new IDBFactory()) {
  const dom = new JSDOM('<div id="root"></div>', { url: "https://test.invalid/application", pretendToBeVisual: true });
  globalThis.window = dom.window; globalThis.document = dom.window.document;
  Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
  dom.window.scrollTo = () => {};
  const calls = [];
  const context = vm.createContext({ window:dom.window, document:dom.window.document, navigator:dom.window.navigator, indexedDB, crypto:globalThis.crypto, URL, console, setTimeout, clearTimeout, Uint8Array, atob, btoa });
  const cache = new Map();
  async function load(specifier, parent = path.join(repo, "app/components/mobile/MobileApp.tsx")) {
    let exported;
    let key = specifier;
    if (specifier === "react") exported = React;
    else if (specifier === "react/jsx-runtime") exported = jsx;
    else if (specifier === "fflate") exported = fflate;
    else if (specifier.endsWith(".css")) exported = {};
    else if (specifier.endsWith("mobile-device")) exported = { isNativeApp:()=>false, captureProjectPhoto:async()=>{throw Error("unused");}, isCancelled:()=>false, openBusinessPage:async(url)=>{calls.push(["page",url]);}, shareProject:async(project)=>{calls.push(["share",structuredClone(project)]);return "downloaded";}, exportProject:(project)=>calls.push(["export",structuredClone(project)]) };
    else if (specifier === "lucide-react") exported = Object.fromEntries(["ArrowDownToLine","ArrowLeft","ArrowRight","Building2","Camera","Check","CheckCheck","ChevronRight","ClipboardList","FolderHeart","House","ImagePlus","Mail","MapPin","MessageCircle","Phone","Plus","RotateCcw","Share2","ShieldCheck","Sparkles","WifiOff","X"].map(n=>[n,()=>React.createElement("svg",{"aria-hidden":true})]));
    else {
      key=path.resolve(path.dirname(parent),specifier);
      if (!path.extname(key)) key += existsSync(key+".tsx") ? ".tsx" : ".ts";
    }
    if(cache.has(key)) return cache.get(key);
    let module;
    if(exported){
      module=new vm.SyntheticModule(Object.keys(exported),function(){for(const [k,v] of Object.entries(exported))this.setExport(k,v);},{context});
    }else{
      const source=await readFile(key,"utf8");
      const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText;
      module=new vm.SourceTextModule(code,{context,identifier:key});
    }
    cache.set(key,module);
    await module.link((child)=>load(child,key));
    await module.evaluate();
    return module;
  }
  const Component=(await load("./MobileApp")).namespace.default;
  const root=createRoot(document.getElementById("root"));
  await React.act(async()=>root.render(React.createElement(Component)));
  const until=async(check)=>{for(let i=0;i<100;i++){if(check())return;await React.act(async()=>new Promise(resolve=>setTimeout(resolve,5)));}assert.fail("UI did not reach the expected state");};
  const button=(text)=>[...document.querySelectorAll("button")].find(e=>e.textContent.trim().includes(text));
  await until(()=>button("Préparer un projet")?.disabled===false);
  return { dom,calls,indexedDB,button,until,click:async(e)=>React.act(async()=>e.click()),change:async(selector,value)=>{const e=document.querySelector(selector);await React.act(async()=>{Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value").set.call(e,value);e.dispatchEvent(new dom.window.Event(e.tagName==="SELECT"?"change":"input",{bubbles:true}));});},close:async()=>{await React.act(async()=>root.unmount());dom.window.close();} };
}

test("the actual app selects bounded services and creates a retained local draft",async()=>{
  const h=await mount();
  try {
    await h.click(h.button("Prestations"));
    assert.equal(document.querySelectorAll(".app-service-grid>button").length,7);
    await h.click([...document.querySelectorAll(".app-service-grid button")][0]);
    assert.match(document.querySelector(".app-scope").textContent,/Sans création de circuits/);
    await h.click(h.button("Préparer cette demande"));
    assert.equal(document.querySelector("#app-service").value,"Petits travaux électriques");
    await h.change("#app-project-title","Luminaire du salon");
    await h.change("#app-message","Remplacer le luminaire sur l’alimentation existante.");
    await h.until(()=>document.querySelector(".app-save-state").textContent.includes("Enregistré ici"));
    await h.click(h.button("Mes projets"));
    assert.match(document.querySelector(".app-project-row").textContent,/Luminaire du salon/);
    assert.equal(h.calls.length,0);
    await h.close();
    const resumed=await mount(h.indexedDB);
    try {
      await resumed.click(resumed.button("Mes projets"));
      await resumed.click(document.querySelector(".app-project-row"));
      assert.equal(document.querySelector("#app-message").value,"Remplacer le luminaire sur l’alimentation existante.");
      await resumed.click(resumed.button("Partager mon dossier"));
      assert.equal(resumed.calls[0][0],"share");
      assert.match(document.querySelector(".app-notice").textContent,/il contient le récapitulatif/);
      assert.match(document.querySelector(".app-share-card small").textContent,/Rien n’est envoyé automatiquement/);
      await resumed.click(resumed.button("Archiver ce projet"));
      assert.equal(document.querySelectorAll(".app-project-row").length,0);
      await resumed.click(resumed.button("Voir les archives"));
      await resumed.click(document.querySelector(".app-project-row"));
      await resumed.click(resumed.button("Restaurer ce projet"));
      assert.match(document.querySelector(".app-project-row").textContent,/Brouillon/);
    } finally {await resumed.close();}
  } catch(error) {try{await h.close();}catch{}throw error;}
});

test("contact and privacy keep real business details and do not imply a booking",async()=>{
  const h=await mount();
  try {
    await h.click(h.button("Contact"));
    assert.equal(document.querySelector('a[href="tel:0618085598"]').getAttribute("href"),"tel:0618085598");
    assert.match(document.querySelector(".app-practical").textContent,/extrême urgence uniquement/);
    await h.click(h.button("Demander un devis sur le site"));
    assert.deepEqual(h.calls,[["page","https://www.homeatoutfaire30.fr/#devis"]]);
    await h.click(h.button("Confidentialité du carnet"));
    assert.match(document.querySelector(".app-privacy").textContent,/ne les envoie pas automatiquement/);
    assert.equal(document.querySelectorAll(".app-bottom-nav").length,0);
    await h.click(h.button("Revenir au carnet"));
    assert.equal(document.querySelectorAll(".app-bottom-nav button").length,4);
  }finally {await h.close();}
});
