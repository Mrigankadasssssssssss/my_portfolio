/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "*",
          protocol: "https",
          port: "",
        },
      ],
    },
  };
  
  export default nextConfig;