/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/SignalCrew',        // your repo name
  assetPrefix: '/SignalCrew/',    // your repo name
};
module.exports = nextConfig
