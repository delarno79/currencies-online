// @ts-check

/** @type {import("next").NextConfig} */
const nextConfig = {
  cacheComponents: true,
  async rewrites() {
    // Serve legacy URLs internally to avoid loops with previously cached redirects.
    return [
      { source: "/currency-converter", destination: "/converter" },
      { source: "/currency-exchange-rates", destination: "/exchange-rates" },
      { source: "/currency-exchange-rates/:pair", destination: "/exchange-rates/:pair" },
      { source: "/country/:id-currency", destination: "/country/:id" },
    ]
  },
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
