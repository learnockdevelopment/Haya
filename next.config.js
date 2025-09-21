/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api.tabby.ai','images.unsplash.com'],
  },
  experimental: {
    optimizeCss: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    TABBY_SECRET_KEY: process.env.TABBY_SECRET_KEY,
    TABBY_MERCHANT_CODE: process.env.TABBY_MERCHANT_CODE,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
