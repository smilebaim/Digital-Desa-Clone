import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.replit.dev",
    "*.pike.replit.dev",
    ...(process.env.REPLIT_DOMAINS?.split(",") ?? []),
  ],
};

export default nextConfig;
