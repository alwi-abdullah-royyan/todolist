/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // Add 'localhost' to allow images from this domain
  },
};

export default nextConfig;
