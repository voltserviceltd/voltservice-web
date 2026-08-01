import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/technology",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
