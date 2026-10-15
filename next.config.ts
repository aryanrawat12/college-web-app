import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // News Tracker moved behind admin login.
  async redirects() {
    return [
      { source: "/news-tracker", destination: "/admin/news-tracker", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
