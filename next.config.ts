import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export', // <=== enables static exports
  images: {
    domains: ['cdn.dummyjson.com'],
    unoptimized: true,
  },
};

export default nextConfig;
