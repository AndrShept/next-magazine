/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      images: {
        domains: ['images.unsplash.com', 'plus.unsplash.com', 'img.freepik.com', "lh3.googleusercontent.com", "res.cloudinary.com"]
      }
}

module.exports = nextConfig
