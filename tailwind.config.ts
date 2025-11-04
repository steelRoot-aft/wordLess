import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jersey: "var(--font-jersey-15)",
        pixels: "var(--font-pixels)",
      },
      colors: {
        black: {
          900: "#222",
        },
        white: {
          50: "#e3e3e3",
        },
      },
    },
  },
  plugins: [],
};

export default config;
