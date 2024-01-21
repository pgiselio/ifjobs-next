/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  swcMinify: true,
  distDir: "dist",
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig;
