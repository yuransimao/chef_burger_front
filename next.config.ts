import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
  /* config options here */
};

export default nextConfig;
