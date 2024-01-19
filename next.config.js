/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'img.freepik.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'w7.pngwing.com',
      'www.freepik.com',
      'cdn-icons-png.flaticon.com',
    ],
  },
};

module.exports = nextConfig;
