import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "www.officialsinner.com",
            "cdn.shopify.com",
            "www.instagram.com",
            "cloudinary.com",
            "res.cloudinary.com",
        ], // Add other domains as needed
    },
};

export default nextConfig;
