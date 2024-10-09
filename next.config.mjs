/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.ibb.co.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
