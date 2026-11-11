import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/lib/quote-security.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { validateQuote, containsBlockedDomain, cooldownRemaining } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const valid = { name: "Client test", phone: "06 00 00 00 00", email: "", address: "Dions 30190", service: "Menuiserie", message: "Une porte à ajuster, merci." };

test("a real phone-only request works without WhatsApp or email", () => assert.equal(validateQuote(valid), null));
test("email-only request and legitimate photo links are allowed", () => assert.equal(validateQuote({ ...valid, phone: "", email: "client@example.fr", message: "Photos : https://photos.google.com/example" }), null));
test("people's names and distant contact addresses are never banned", () => assert.equal(validateQuote({ ...valid, name: "Alexis Felten", address: "75002" }), null));
test("the actual fake quote is blocked", () => assert.match(validateQuote({ ...valid, email: "alexis.felten9021@probox.my.id", message: "Travaux : https://onpartage.online/fr/loc/homeatoutfaire30" }), /suspect/));
test("known malicious domains are matched independently of identity", () => {
  for (const value of ["https://ONPARTAGE.ONLINE/fr/test", "https://sub.gopartage.online/file", "https://onpar\u200btage.online/file", "Documents : onpartage.online."]) assert.equal(containsBlockedDomain(value), true, value);
});
test("unrelated domains and spelling substrings are not blocked", () => {
  for (const value of ["https://mon-onpartage.online/", "https://onpartage.online.example.fr/", "contact@example.fr", "https://exemple.online/"]) assert.equal(containsBlockedDomain(value), false, value);
});
test("empty, whitespace-only and oversized fields are rejected", () => {
  assert.notEqual(validateQuote({ ...valid, name: "  " }), null);
  assert.notEqual(validateQuote({ ...valid, message: "  " }), null);
  assert.notEqual(validateQuote({ ...valid, message: "a".repeat(5001) }), null);
});
test("a reply method and an approved service are required", () => {
  assert.notEqual(validateQuote({ ...valid, phone: "" }), null);
  assert.notEqual(validateQuote({ ...valid, service: "Invalid" }), null);
  assert.notEqual(validateQuote({ ...valid, email: "not-an-email" }), null);
});
test("multiline messages are allowed but header-like contact fields are not", () => {
  assert.equal(validateQuote({ ...valid, message: "Bonjour,\nUne porte à ajuster." }), null);
  assert.notEqual(validateQuote({ ...valid, name: "Client\r\nBcc: test@example.fr" }), null);
});
test("cooldown expires and invalid storage cannot trap a client", () => {
  assert.equal(cooldownRemaining("100000", 130000), 30000);
  assert.equal(cooldownRemaining("100000", 160000), 0);
  for (const value of [null, "bad", "Infinity", "-1", "99999999"]) assert.equal(cooldownRemaining(value, 160000), 0);
});
