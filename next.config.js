/** @type {import('next').NextConfig} */

const API_URL = new URL(process.env.NEXT_PUBLIC_API_URL);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "dist",
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      { 
        protocol: API_URL.protocol.split(":")[0],
        hostname: API_URL.hostname,
        port:  API_URL.port || "",
        pathname: "/**",
      },
    ],
    // unoptimized: true, // Disable Next.js image optimization
  },
};
module.exports = nextConfig;
