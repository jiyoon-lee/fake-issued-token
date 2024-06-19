/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: ".",
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
