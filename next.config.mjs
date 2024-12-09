/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname:"**",
          },
           {
            protocol: 'https',
            hostname: 'example.com', // Replace this with your actual hostname
          },
          {
            protocol: 'https',
            hostname: '*.example.com', // Use subdomain patterns if necessary
          },
        ],
        
      },
};

export default nextConfig;
