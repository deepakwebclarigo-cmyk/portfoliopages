import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the IDE's development server from overwriting production artifacts.
  distDir: process.env.NODE_ENV === 'production' ? '.next-production' : '.next',
  async redirects() {
    return [
      { source: '/portfolio/app-tukioconnect', destination: '/portfolio/app-tukora-connect', permanent: true },
      { source: '/portfolio/app-kegalklock', destination: '/portfolio/app-kegeltempo', permanent: true },
      { source: '/portfolio/tukioconnect', destination: '/portfolio/tukora-connect', permanent: true },
      { source: '/portfolio/alum-connect', destination: '/portfolio/alumvia', permanent: true },
      { source: '/portfolio/kegelklock', destination: '/portfolio/kegeltempo', permanent: true },
      { source: '/portfolio/whizora', destination: '/portfolio/whizlume', permanent: true },
      { source: '/portfolio/app-case-managment-ase', destination: '/portfolio/app-case-management-ase', permanent: true },
      { source: '/portfolio/app-suppliment-management', destination: '/portfolio/app-supplement-management', permanent: true },
      { source: '/portfolio/streamdatax', destination: '/portfolio/streamdexa', permanent: true },
      { source: '/portfolio/tukeeconnect', destination: '/portfolio/tukora-connect', permanent: true },
      { source: '/portfolio/app-tukeeconnect', destination: '/portfolio/app-tukora-connect', permanent: true },
      { source: '/portfolio/parachute', destination: '/portfolio/paranest', permanent: true },
      { source: '/portfolio/whizara', destination: '/portfolio/whizlume', permanent: true },
      { source: '/portfolio/es-platform', destination: '/portfolio/estrata', permanent: true },
      { source: '/portfolio/lead-management', destination: '/portfolio/leadforma', permanent: true },
      { source: '/portfolio/app-simply-recruited', destination: '/portfolio/app-simplyscouted', permanent: true },
      { source: '/portfolio/app-infiscribe', destination: '/portfolio/app-infinote', permanent: true },
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
