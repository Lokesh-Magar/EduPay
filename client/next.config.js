/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

    async rewrites(){
    return [
      
      // Proxy requests starting with `/api/node` to the Node.js backend
      {
        source: '/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to backend
      },
  ]

  }
};
module.exports = nextConfig;

