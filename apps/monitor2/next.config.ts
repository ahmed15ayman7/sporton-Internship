import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: '/mo/',
  basePath: '/mo',
  trailingSlash: true,
  output: 'standalone',
  transpilePackages: ['@sporton/ui', '@sporton/apis', '@sporton/interfaces', '@sporton/auth-admin'],
  experimental: {
    optimizePackageImports: ['@sporton/ui', 'lucide-react'],
  },
  images: {
    domains: ['localhost', 'sporton.club'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.sporton.club',
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-3de-school-2024',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-jwt-key-for-3de-school-2024',
    NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'sporton.club',
    NEXT_PUBLIC_COOKIE_SECURE: process.env.NEXT_PUBLIC_COOKIE_SECURE || 'false',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@sporton/assets': require('path').resolve(__dirname, '../../packages/assets'),
    };
    return config;
  },
};

export default nextConfig;
