import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the IDE's development server from overwriting production artifacts.
  distDir: process.env.NODE_ENV === 'production' ? '.next-production' : '.next',
  async redirects() {
    return [
      { source: '/portfolio/app-case-managment-ase', destination: '/portfolio/app-case-management-ase', permanent: true },
      { source: '/portfolio/app-suppliment-management', destination: '/portfolio/app-supplement-management', permanent: true },
      { source: '/portfolio/streamdatax', destination: '/portfolio/streamdexa', permanent: true },
      { source: '/portfolio/tukeeconnect', destination: '/portfolio/tukioconnect', permanent: true },
      { source: '/portfolio/app-tukeeconnect', destination: '/portfolio/app-tukioconnect', permanent: true },
      { source: '/portfolio/parachute', destination: '/portfolio/paranest', permanent: true },
      { source: '/portfolio/whizara', destination: '/portfolio/whizora', permanent: true },
      { source: '/portfolio/es-platform', destination: '/portfolio/estrata', permanent: true },
      { source: '/portfolio/lead-management', destination: '/portfolio/leadforma', permanent: true },
      { source: '/portfolio/app-simply-recruited', destination: '/portfolio/app-simplyscouted', permanent: true },
      { source: '/portfolio/app-infinote', destination: '/portfolio/app-infiscribe', permanent: true },
      { source: '/portfolio/app-silasync', destination: '/portfolio/app-silaflow', permanent: true },
      { source: '/portfolio/app-digital-habit-tracker', destination: '/portfolio/app-habitstride', permanent: true },
      { source: '/portfolio/app-one-pantry', destination: '/portfolio/app-pantryone', permanent: true },
      { source: '/portfolio/app-street-sheets', destination: '/portfolio/app-streetslate', permanent: true },
      { source: '/portfolio/br-tennis', destination: '/portfolio/rallybridge', permanent: true },
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
