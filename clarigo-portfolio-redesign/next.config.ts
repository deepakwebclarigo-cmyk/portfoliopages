import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the IDE's development server from overwriting production artifacts.
  distDir: process.env.NODE_ENV === 'production' ? '.next-production' : '.next',
  async redirects() {
    return [
      { source: '/portfolio/app-case-managment-ase', destination: '/portfolio/app-case-management-ase', permanent: true },
      { source: '/portfolio/app-suppliment-management', destination: '/portfolio/app-supplement-management', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clarigo-voluble-youtiao-e0781d.netlify.app',
      },
    ],
  },
};

export default nextConfig;
