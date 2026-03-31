import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"]
  },
  outputFileTracingRoot: path.join(__dirname)
};

export default nextConfig;
