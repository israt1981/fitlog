import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // সব ডোমেইন সাপোর্ট করবে
      },
    ],
  },
};

export default nextConfig;