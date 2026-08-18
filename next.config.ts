import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: this landing has no server-side data or API routes, so it
  // ships as plain HTML/CSS/JS — no Node runtime needed on Cloudflare Pages.
  output: "export",
  // Static export has no image-optimization server to call at request time.
  images: { unoptimized: true },
};

export default nextConfig;
