import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: process.env.NODE_ENV === "development",
  },

  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      "@react-three/fiber",
      "@react-three/drei",
      "three",
      "framer-motion",
      "lucide-react", // Tetap di optimizePackageImports, tidak perlu modularizeImports
    ],
  },

  // Hapus atau komentari modularizeImports untuk lucide-react
  modularizeImports: {
    // 'lucide-react': {  // ← HAPUS INI
    //   transform: 'lucide-react/dist/esm/icons/{{member}}',
    // },
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
    lodash: {
      transform: "lodash/{{member}}",
    },
  },

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
  ],
};

export default nextConfig;
