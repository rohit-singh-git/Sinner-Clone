import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    black: "#0a0a0a",
                    white: "#f5f5f5",
                    accent: "#c8a97e", // adjust after checking site
                },
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)"],
                mono: ["var(--font-geist-mono)"],
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                marquee: "marquee 20s linear infinite",
            },
        },
    },
    plugins: [],
};

export default config;
