/** @type {import('next').NextConfig} */

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
    unoptimized: true, // Disable Next.js image optimization
  },
};
module.exports = nextConfig;
