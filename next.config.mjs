// @ts-check

/** @type {import("next").NextConfig} */
const nextConfig = {
  cacheComponents: true,
  async redirects() {
    // Preserve public URLs from the previously deployed release.
    return [
      { source: "/currency-converter", destination: "/converter", permanent: true },
      { source: "/currency-exchange-rates", destination: "/exchange-rates", permanent: true },
      { source: "/currency-exchange-rates/:pair", destination: "/exchange-rates/:pair", permanent: true },
      { source: "/country/:id-currency", destination: "/country/:id", permanent: true },
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
