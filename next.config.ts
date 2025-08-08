import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'tc0rnqbnn5.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
