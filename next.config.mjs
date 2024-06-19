/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: ".",
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  async rewrites() {
    if (process.env.NEXT_PUBLIC_EXPORT !== "true") {
      return [
        {
          source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
          destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
