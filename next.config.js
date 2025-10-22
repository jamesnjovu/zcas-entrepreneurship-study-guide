/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: process.env.NODE_ENV === 'production' ? 'dist' : '.next',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/zcas-entrepreneurship-study-guide' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/zcas-entrepreneurship-study-guide' : '',
};

module.exports = nextConfig;