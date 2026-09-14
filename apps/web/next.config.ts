import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@aspekt/types', '@aspekt/core', '@aspekt/api-client', '@aspekt/ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
