/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
