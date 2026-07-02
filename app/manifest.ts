import type { MetadataRoute } from "next";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: "rhandie.",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#1a1f35",
    theme_color: "#1a1f35",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
