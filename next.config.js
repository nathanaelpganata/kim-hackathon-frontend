/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'i.imgur.com',
      'imgur.com',
      'hackthon.fly.dev',
      'drive.google.com',
    ], // Add 'imgur.com' here
  },
};

module.exports = nextConfig;
