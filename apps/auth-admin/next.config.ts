import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: '/auth-admin/',
  basePath: '/auth-admin',
  trailingSlash: true,
  output: 'standalone',
  transpilePackages: ['@sporton/ui', '@sporton/apis', '@sporton/interfaces', '@sporton/auth-admin'],
  experimental: {
    optimizePackageImports: ['@sporton/ui', 'lucide-react'],
  },
  images: {
    domains: ['localhost', 'sporton.club',"cloudinary.com"],
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
      // '@sporton/assets': require('path').resolve(__dirname, '../../packages/assets'),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ]
  }
};

export default nextConfig;
