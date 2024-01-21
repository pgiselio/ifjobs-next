/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "dist",
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
