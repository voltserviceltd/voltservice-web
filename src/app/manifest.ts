import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VoltService Ltd",
    short_name: "VoltService",
    description:
      "VoltService Ltd designs and develops reliable websites, applications, and digital systems for businesses that need practical software support.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#284b63",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
