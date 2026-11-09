import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 실습3-config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "is1-ssl.mzstatic.com"}],
  },
};

export default nextConfig;