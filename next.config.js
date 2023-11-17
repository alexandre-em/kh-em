/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: 'dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/khindelvert-af786.appspot.com/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
