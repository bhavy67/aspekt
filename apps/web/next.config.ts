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
      // Supabase Storage — wallpaper CDN (Phase 7+)
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
