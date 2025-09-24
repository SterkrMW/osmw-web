import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINT === 'true',
  },
};

export default nextConfig;
