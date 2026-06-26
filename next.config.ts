import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  allowedDevOrigins: ["*.ngrok-free.app", "localhost:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

export default nextConfig
