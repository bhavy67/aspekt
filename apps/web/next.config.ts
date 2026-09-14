import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile workspace packages — Next.js cannot consume TypeScript source
  // from node_modules without this configuration.
  transpilePackages: ['@aspekt/types', '@aspekt/core', '@aspekt/api-client'],
};

export default nextConfig;
