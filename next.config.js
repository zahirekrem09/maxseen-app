/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'maxseen.com', 'lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/login',
      },
    ]
  },
}

module.exports = nextConfig
