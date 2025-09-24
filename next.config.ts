import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'static.staff-clothes.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'static.zara.net',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
