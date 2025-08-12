import type { NextConfig } from "next";
// @ts-ignore - importar dinámico opcional
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const baseConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Necesario para usar <Image /> con export estático
  },
  trailingSlash: true, // opcional: mejora rutas estáticas en algunos hostings
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders }
    ];
  },
};

module.exports = withBundleAnalyzer(baseConfig);
