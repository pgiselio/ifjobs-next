/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "dist",
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig;
