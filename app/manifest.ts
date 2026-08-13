import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HomeAToutFaire",
    short_name: "HomeAToutFaire",
    description: "Auto-entrepreneur multi-services à Sainte-Anastasie",
    start_url: "/",
    display: "standalone",
    background_color: "#082640",
    theme_color: "#082640",
    lang: "fr",
    icons: [
      {
        src: "/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
