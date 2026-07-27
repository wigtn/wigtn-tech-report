import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mockups/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#0A0A0A",
        background: "#FAFAFA",
        violet: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
        },
        /* Pantone 265 C (standard conversion) — research-led mockup accent.
         * Swap these three hexes if the exact brand spec differs. */
        brand: {
          DEFAULT: "#753BBD",
          light: "#9D7BE0",
          dark: "#5A2E97",
        },
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"],
        report: ['"Source Sans 3"', '"Pretendard Variable"', "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        "report-display": ['"Inter Tight"', '"Pretendard Variable"', "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        "report-mono": ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
