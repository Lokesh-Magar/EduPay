/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

    async rewrites(){
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:3000/api/:path*', // Proxy to backend
      },
  ]


  }
};

module.exports = nextConfig;
