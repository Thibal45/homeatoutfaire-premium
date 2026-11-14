import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "fr.homeatoutfaire30.app",
  appName: "HomeAToutFaire",
  webDir: "dist",
  backgroundColor: "#f5f3ea",
  server: { androidScheme: "https", cleartext: false },
  android: {
    allowMixedContent: false,
    webContentsDebuggingEnabled: false,
    backgroundColor: "#f5f3ea",
  },
};
export default config;
