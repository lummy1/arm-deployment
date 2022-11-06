/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // reactStrictMode: true,
    optimizeFonts: true,
    reactStrictMode: true,
    
    swcMinify: true,
    env: {
      BASE_URL: process.env.BASE_URL,
      API_KEY: process.env.API_KEY,
    },
    // images: {
    //     deviceSizes: [360, 480, 576, 768, 1200, 1920, 2048, 3840],
    //     domains: ['res.cloudinary.com'],
    //     loader: 'akamai',
    //     path: '/',
    // },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },

      
};

module.exports = nextConfig;
