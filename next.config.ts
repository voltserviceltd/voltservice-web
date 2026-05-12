import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const configDirectory = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typedRoutes: true,
  turbopack: {
    root: configDirectory,
  },
  allowedDevOrigins: ["192.168.1.230"],
};

export default nextConfig;
