/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "dist",
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
}
module.exports = nextConfig;
