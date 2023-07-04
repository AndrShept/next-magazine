/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      images: {
        domains: ['https://unsplash.com/']
      }
}

module.exports = nextConfig
