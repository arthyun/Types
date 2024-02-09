/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://api.vworld.kr/:path*`,
      },
    ];
  },
};

export default nextConfig;
