import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINT === 'true',
  },

  async redirects() {
    return [
      {
        source: '/wiki',
        destination: 'https://www.mythwarwiki.com/en/home',
        permanent: true, // 301
      },
      {
        source: '/wiki/:path*',
        destination: 'https://www.mythwarwiki.com/en/:path*',
        permanent: true, // 301
      },
    ];
  },
};

export default nextConfig;