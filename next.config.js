/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/v0/b/**', // Allows images from any bucket in your Firebase project
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
        ],
      },
};

module.exports = nextConfig;
