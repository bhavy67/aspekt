import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@aspekt/types', '@aspekt/core', '@aspekt/api-client', '@aspekt/ui'],
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Supabase Storage — direct objects and image transforms
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'ypppcbxjowvbnzvvkmpe.supabase.co' },
    ],
  },
};

export default nextConfig;
