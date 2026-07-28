/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase body size limit for media upload API (individual 360° texture images)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Allow serving images from the media API route
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
