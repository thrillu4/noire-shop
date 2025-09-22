import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'picsum.photos',
      'images.pexels.com',
      'static.staff-clothes.com',
      'static.zara.net',
    ],
  },
}

export default nextConfig
