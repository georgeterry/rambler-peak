/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1536, 1920, 2048],
  },
  async redirects() {
    return [
      // Product renamed from "sleeping mat" to "camping mat" (July 2026);
      // permanent redirect preserves old links and any indexed URLs.
      {
        source: '/products/dreamlite-sleeping-mat',
        destination: '/products/dreamlite-camping-mat',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
