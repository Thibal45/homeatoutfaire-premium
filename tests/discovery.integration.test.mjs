// Real discovery components and React DOM; framework adapters only, no network.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import * as React from "react";
import * as jsx from "react/jsx-runtime";
import { JSDOM } from "jsdom";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const initial = new JSDOM('<div id="root"></div>');
globalThis.window = initial.window;
globalThis.document = initial.window.document;
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: initial.window.navigator,
});
const { createRoot } = await import("react-dom/client");
async function mount(name) {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "https://test.invalid/",
    pretendToBeVisual: true,
  });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  const prefills = [];
  dom.window.HTMLDialogElement.prototype.showModal = function(){this.open=true;};
  dom.window.HTMLDialogElement.prototype.close = function(){this.open=false;};
  const context = vm.createContext({
    window: dom.window,
    document: dom.window.document,
    console,
  });
  const cache = new Map();
  async function moduleFor(specifier) {
    if (cache.has(specifier)) return cache.get(specifier);
    let exports;
    if (specifier === "react") exports = React;
    else if (specifier === "react/jsx-runtime") exports = jsx;
    else if (specifier === "next/link")
      exports = {
        default: ({ children, ...props }) =>
          React.createElement("a", props, children),
      };
    else if (specifier === "next/image")
      exports = {
        default: ({ fill, preload, priority, ...props }) =>
          React.createElement("img", props),
      };
    else if (specifier === "./Reveal")
      exports = {
        default: ({ children, className }) =>
          React.createElement("div", { className }, children),
      };
    else if (specifier === "../lib/analytics")
      exports = { trackQuoteClick() {} };
    else if (specifier === "../lib/quote-prefill")
      exports = { prefillQuote(fields) { prefills.push(fields); } };
    else if (specifier === "lucide-react")
      exports = Object.fromEntries(
        [
          "ArrowLeft",
          "ClipboardList",
          "Pencil",
          "X",
          "ArrowRight",
          "ArrowUpRight",
          "Check",
          "House",
          "MoveUpRight",
          "Bolt",
          "Droplets",
          "Hammer",
          "PaintRoller",
          "Waves",
          "Wrench",
          "CalendarCheck",
          "ClipboardCheck",
          "MessageCircle",
          "MapPin",
          "Navigation",
        ].map((n) => [
          n,
          () => React.createElement("svg", { "aria-hidden": true }),
        ]),
      );
    if (exports) {
      const m = new vm.SyntheticModule(
        Object.keys(exports),
        function () {
          for (const [k, v] of Object.entries(exports)) this.setExport(k, v);
        },
        { context },
      );
      cache.set(specifier, m);
      await m.link(() => {});
      await m.evaluate();
      return m;
    }
    const path =
      specifier === "../data/services"
        ? "app/data/services.ts"
        : specifier.startsWith("../lib/") ? `app/lib/${specifier.slice(7)}.ts` : `app/components/${specifier}.tsx`;
    const source = await readFile(
      new URL("../" + path, import.meta.url),
      "utf8",
    );
    const code = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText;
    const m = new vm.SourceTextModule(code, { context });
    cache.set(specifier, m);
    await m.link(moduleFor);
    await m.evaluate();
    return m;
  }
  const components=[];
  for(const item of Array.isArray(name) ? name : [name]) components.push((await moduleFor(item)).namespace.default);
  const Component=()=>React.createElement(React.Fragment,null,...components.map((C,i)=>React.createElement(C,{key:i})));
  const root = createRoot(document.getElementById("root"));
  await React.act(async () => root.render(React.createElement(Component)));
  return {
    dom,
    prefills,
    click: async (e) => React.act(async () => e.click()),
    close: async () => {
      await React.act(async () => root.unmount());
      dom.window.close();
    },
  };
}

test("service discovery supports click, keyboard and the correct quote destination", async () => {
  const h = await mount("Services");
  try {
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    assert.equal(tabs.length, 6);
    assert.match(
      document.querySelector('[role="tabpanel"] h3').textContent,
      /Peinture/,
    );
    await React.act(async () =>
      tabs[2].dispatchEvent(
        new h.dom.window.KeyboardEvent("keydown", {
          key: "ArrowRight",
          bubbles: true,
          cancelable: true,
        }),
      ),
    );
    assert.equal(document.activeElement, tabs[3]);
    assert.equal(tabs[3].getAttribute("aria-selected"), "true");
    assert.equal(
      new URL(document.querySelector("a.service-quote").href).searchParams.get(
        "service",
      ),
      "Menuiserie",
    );
    const names = [
      "Petits travaux électriques",
      "Petits travaux de plomberie",
      "Peinture",
      "Menuiserie",
      "Entretien piscine - ponctuel ou régulier",
      "Petit dépannage",
    ];
    for (let i = 0; i < 6; i++) {
      await h.click(tabs[i]);
      assert.equal(tabs[i].getAttribute("aria-selected"), "true");
      assert.equal(
        document.querySelectorAll('[role="tab"][aria-selected="true"]').length,
        1,
      );
      assert.equal(
        new URL(
          document.querySelector("a.service-quote").href,
        ).searchParams.get("service"),
        names[i],
      );
    }
    await React.act(async () =>
      tabs[5].dispatchEvent(
        new h.dom.window.KeyboardEvent("keydown", {
          key: "Home",
          bubbles: true,
          cancelable: true,
        }),
      ),
    );
    assert.equal(document.activeElement, tabs[0]);
    await React.act(async () =>
      tabs[0].dispatchEvent(
        new h.dom.window.KeyboardEvent("keydown", {
          key: "End",
          bubbles: true,
          cancelable: true,
        }),
      ),
    );
    assert.equal(document.activeElement, tabs[5]);
  } finally {
    await h.close();
  }
});

test("a commune choice changes the quote destination without claiming automatic coverage", async () => {
  const h = await mount("ServiceArea");
  try {
    const button = [...document.querySelectorAll("button")].find(
      (b) => b.textContent === "Nîmes",
    );
    await h.click(button);
    assert.equal(button.getAttribute("aria-pressed"), "true");
    assert.equal(
      document.querySelectorAll('button[aria-pressed="true"]').length,
      1,
    );
    const link = document.querySelector("a.btn");
    assert.equal(new URL(link.href).searchParams.get("commune"), "Nîmes");
    assert.match(
      document.querySelector(".area-selection").textContent,
      /confirmer la possibilité/,
    );
  } finally {
    await h.close();
  }
});

test("process steps change on demand and keep their detail accessible", async () => {
  const h = await mount("Stats");
  try {
    const buttons = [...document.querySelectorAll("button")];
    await h.click(buttons[1]);
    assert.equal(buttons[1].getAttribute("aria-expanded"), "true");
    assert.match(
      document.querySelector("#process-detail").textContent,
      /tarif/,
    );
    await h.click(buttons[2]);
    assert.equal(
      document.querySelectorAll('button[aria-expanded="true"]').length,
      1,
    );
    assert.match(
      document.querySelector("#process-detail").textContent,
      /même interlocuteur/,
    );
  } finally {
    await h.close();
  }
});


test("house markers select the matching real service panel, without submitting a request", async () => {
  const h=await mount(["HouseScene","Services"]);
  try {
    const spots=[...document.querySelectorAll('.house-hotspot')];
    assert.equal(spots.length,6);
    for(let i=0;i<spots.length;i++){
      await h.click(spots[i]);
      assert.equal(spots[i].getAttribute('aria-pressed'),'true');
      await h.click(document.querySelector('.house-selection a'));
      assert.equal(document.querySelectorAll('[role="tab"]')[i].getAttribute('aria-selected'),'true');
    }
    await React.act(async()=>h.dom.window.dispatchEvent(new h.dom.window.CustomEvent('hatf:discover-service',{detail:-1})));
    assert.equal(document.querySelector('[role="tab"][aria-selected="true"]').id,'service-tab-5');
    assert.equal(h.prefills.length,0);
  } finally {await h.close();}
});

test("the optional project notebook builds an editable draft and hands it to the form only on request", async () => {
  const h=await mount('ProjectPlanner');
  try {
    await React.act(async()=>h.dom.window.dispatchEvent(new h.dom.window.CustomEvent('hatf:open-planner',{detail:'Peinture'})));
    assert.equal(document.querySelector('dialog').open,true);
    assert.equal(document.activeElement.id,'planner-title');
    await h.click(document.querySelector('.planner-examples input'));
    await h.click(document.querySelector('.planner-footer .btn'));
    assert.match(document.querySelector('#planner-draft').value,/Murs et plafonds/);
    assert.equal(h.prefills.length,0);
    const field=document.querySelector('#planner-draft');
    await React.act(async()=>{
      Object.getOwnPropertyDescriptor(h.dom.window.HTMLTextAreaElement.prototype,'value').set.call(field,'Mon récapitulatif personnalisé.');
      field.dispatchEvent(new h.dom.window.Event('input',{bubbles:true}));
    });
    await h.click(document.querySelector('.planner-footer .btn'));
    assert.equal(document.querySelector('dialog').open,false);
    assert.equal(h.prefills.length,1);assert.equal(h.prefills[0].message,'Mon récapitulatif personnalisé.');
    assert.equal(h.prefills[0].service,'Peinture');
    assert.equal(h.dom.window.location.search,'');
    assert.equal(h.dom.window.location.hash,'#devis');
  } finally {await h.close();}
});

test("closing the notebook keeps the form untouched and service changes clear incompatible examples", async()=>{
  const h=await mount('ProjectPlanner');
  try {
    await React.act(async()=>h.dom.window.dispatchEvent(new h.dom.window.CustomEvent('hatf:open-planner',{detail:'Peinture'})));
    await h.click(document.querySelector('.planner-examples input'));
    await h.click(document.querySelectorAll('.planner-services button')[1]);
    assert.equal(document.querySelectorAll('.planner-examples input:checked').length,0);
    await h.click(document.querySelector('.planner-close'));
    assert.equal(document.querySelector('dialog').open,false);assert.equal(h.prefills.length,0);
  } finally {await h.close();}
});
