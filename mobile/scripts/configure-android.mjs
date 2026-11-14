import { readFile, writeFile, mkdir, readdir, rm } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const project = new URL("android/", root);
const manifestPath = new URL("app/src/main/AndroidManifest.xml", project);
let manifest = await readFile(manifestPath, "utf8");
manifest = manifest.replace(
  'android:allowBackup="true"',
  'android:allowBackup="false" android:usesCleartextTraffic="false" android:fullBackupContent="false" android:dataExtractionRules="@xml/data_extraction_rules"',
);
// Keep permissions before application as recommended by Android Lint.
const permissions = manifest.match(/\s*<uses-permission[^>]+\/>/g) || [];
manifest = manifest.replace(/\s*<uses-permission[^>]+\/>/g, "").replace("    <application", permissions.join("\n") + "\n\n    <application");
await writeFile(manifestPath, manifest);
await writeFile(
  new URL("app/src/main/res/xml/data_extraction_rules.xml", project),
  `<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules><cloud-backup><exclude domain="root" path="."/><exclude domain="file" path="."/><exclude domain="database" path="."/><exclude domain="sharedpref" path="."/><exclude domain="external" path="."/></cloud-backup><device-transfer><exclude domain="root" path="."/><exclude domain="file" path="."/><exclude domain="database" path="."/><exclude domain="sharedpref" path="."/><exclude domain="external" path="."/></device-transfer></data-extraction-rules>`,
);
let gradle = await readFile(new URL("app/build.gradle", project), "utf8");
gradle = gradle.replace('versionName "1.0"', 'versionName "1.0.0"');
// The preview ID keeps unsigned-for-store test builds separate from the production package.
if (!gradle.includes('applicationIdSuffix ".preview"'))
  gradle = gradle.replace(
    "buildTypes {",
    'buildTypes {\n        debug {\n            applicationIdSuffix ".preview"\n            versionNameSuffix "-essai"\n            resValue "string", "app_name", "HomeAToutFaire · essai"\n        }',
  );
await writeFile(new URL("app/build.gradle", project), gradle);
const colors = new URL("app/src/main/res/values/colors.xml", project);
await writeFile(
  colors,
  '<?xml version="1.0" encoding="utf-8"?><resources><color name="colorPrimary">#123543</color><color name="colorPrimaryDark">#123543</color><color name="colorAccent">#edc25d</color></resources>',
);
await writeFile(new URL("app/src/main/res/values/ic_launcher_background.xml", project), '<?xml version="1.0" encoding="utf-8"?><resources><color name="ic_launcher_background">#fffefa</color></resources>');
// Vector launcher artwork follows the brand's house, H, navy and gold motif.
// Keep the mark inside Android's adaptive safe area; no clipped wordmark bitmap.
const res = new URL("app/src/main/res/", project);
for (const name of await readdir(res)) {
  if (name.startsWith("mipmap-")) {
    for (const file of ["ic_launcher.png", "ic_launcher_round.png", "ic_launcher_foreground.png"]) {
      await rm(new URL(`${name}/${file}`, res), { force: true });
    }
  }
}
const logo = (monochrome = false, size = 108) => `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="${size}dp" android:height="${size}dp" android:viewportWidth="108" android:viewportHeight="108">
<group android:pivotX="54" android:pivotY="54" android:scaleX="0.70" android:scaleY="0.70" android:translateY="-3">
<path android:fillColor="${monochrome ? "#FFFFFF" : "#123543"}" android:pathData="M17,51 L52,16 Q54,14 56,16 L73,33 L73,24 L82,24 L82,42 L92,52 L80,52 L54,27 L29,52 Z M31,56 L40,49 L40,82 L31,82 Z M69,49 L78,56 L78,82 L69,82 Z M39,63 C51,55 57,72 70,63 L70,71 C56,79 51,63 39,72 Z M24,88 C43,96 60,77 84,82 C65,80 44,104 24,91 Z"/>
<path android:fillColor="${monochrome ? "#FFFFFF" : "#BE913A"}" android:pathData="M45,40 L53,40 L53,48 L45,48 Z M56,40 L64,40 L64,48 L56,48 Z M45,51 L53,51 L53,59 L45,59 Z M56,51 L64,51 L64,59 L56,59 Z M38,97 C54,99 68,87 83,88 C67,90 55,104 38,100 Z"/>
</group></vector>`;
await writeFile(new URL("drawable/hatf_logo.xml", res), logo());
await writeFile(new URL("drawable/hatf_logo_monochrome.xml", res), logo(true));
await mkdir(new URL("mipmap-anydpi/", res), { recursive: true });
for (const name of ["ic_launcher.xml", "ic_launcher_round.xml"]) {
  await writeFile(new URL(`mipmap-anydpi/${name}`, res), logo(false, 48));
  await writeFile(new URL(`mipmap-anydpi-v26/${name}`, res), `<?xml version="1.0" encoding="utf-8"?><adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/ic_launcher_background"/><foreground android:drawable="@drawable/hatf_logo"/><monochrome android:drawable="@drawable/hatf_logo_monochrome"/></adaptive-icon>`);
}
console.log(
  "Android configured: local bundle, backup disabled, HTTPS only, separate preview ID.",
);
