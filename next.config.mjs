/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    return [
      // Alias for the all-add-ons thank-you page (query string is kept).
      { source: '/thank-you-everything', destination: '/thank-you-all-addons', permanent: false },
    ];
  },
};

export default nextConfig;
