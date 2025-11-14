import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/landing',
  assetPrefix: '/landing',
  trailingSlash: true,
  output: 'standalone',
  transpilePackages: ['@sporton/ui', '@sporton/apis', '@sporton/interfaces', '@sporton/auth'],
  experimental: {
    optimizePackageImports: ['@sporton/ui', 'lucide-react'],
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
