import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
const cwd = fileURLToPath(root);
const cli = fileURLToPath(
  new URL("../node_modules/@capacitor/cli/bin/capacitor", root),
);
if (!existsSync(new URL("android/", root)))
  execFileSync(process.execPath, [cli, "add", "android"], {
    cwd,
    stdio: "inherit",
  });
execFileSync(
  process.execPath,
  [fileURLToPath(new URL("scripts/configure-android.mjs", root))],
  { cwd, stdio: "inherit" },
);
execFileSync(process.execPath, [cli, "sync", "android"], {
  cwd,
  stdio: "inherit",
});
