import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jersey: "var(--font-jersey-15)",
      },
    },
  },
  plugins: [],
};

export default config;
