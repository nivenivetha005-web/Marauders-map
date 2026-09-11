import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marauder's Map",
    short_name: "Marauder's Map",
    description: "I solemnly swear that I am up to no good.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#c9a877",
    theme_color: "#c9a877",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
