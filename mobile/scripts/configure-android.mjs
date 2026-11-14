import { readFile, writeFile, copyFile, mkdir } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const project = new URL("android/", root);
const manifestPath = new URL("app/src/main/AndroidManifest.xml", project);
let manifest = await readFile(manifestPath, "utf8");
manifest = manifest.replace(
  'android:allowBackup="true"',
  'android:allowBackup="false" android:usesCleartextTraffic="false" android:fullBackupContent="false" android:dataExtractionRules="@xml/data_extraction_rules"',
);
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
  '<?xml version="1.0" encoding="utf-8"?><resources><color name="colorPrimary">#123543</color><color name="colorPrimaryDark">#123543</color><color name="colorAccent">#edc25d</color><color name="ic_launcher_background">#fffefa</color></resources>',
);
// Keep the user's existing logo unchanged; Android scales these original resources.
for (const density of ["mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"]) {
  const directory = new URL(`app/src/main/res/mipmap-${density}/`, project);
  await mkdir(directory, { recursive: true });
  for (const name of [
    "ic_launcher.png",
    "ic_launcher_round.png",
    "ic_launcher_foreground.png",
  ]) {
    await copyFile(
      new URL("../../public/images/android-chrome-512x512.png", project),
      new URL(name, directory),
    );
  }
}
console.log(
  "Android configured: local bundle, backup disabled, HTTPS only, separate preview ID.",
);
