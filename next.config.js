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
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_URL.split("://")[0],
        hostname: process.env.NEXT_PUBLIC_API_URL.split("://")[1].split(":")[0],
        port:  process.env.NEXT_PUBLIC_API_URL.split("://")[1].split("/")[0].split(":")[1] || "",
        pathname: "/**",
      },
    ],
    // unoptimized: true, // Disable Next.js image optimization
  },
};
module.exports = nextConfig;
