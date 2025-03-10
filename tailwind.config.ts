import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'lobster': "url('/AbstractLobster.png')",
        'crab': "url('/crab2.png')",
        'oysters': "url('/Oysters.png')"
      },
    },

  },
  plugins: [],
} satisfies Config;
