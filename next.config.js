/** @type {import('next').NextConfig} */

const withLinaria = require("next-linaria");

const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kodoumo.ir',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },

  linaria: {
    // evaluate: true,
    // classNameSlug: 'TW-[title]',
    // displayName: true,
    // preprocessor: "AtomicStyledProcessor",
  },
};

module.exports = withLinaria(nextConfig);
