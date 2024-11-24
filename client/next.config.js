/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

    async rewrites(){
    return [
       // Proxy requests starting with `/api/flask` to the Flask backend
       {
        source: '/api/flask/:path*',
        destination: 'http://127.0.0.1:5000/:path*', // Flask server
      },
      // Proxy requests starting with `/api/node` to the Node.js backend
      {
        source: '/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to backend
      },
  ]


  }
};

module.exports = nextConfig;
// export default nextConfig;
