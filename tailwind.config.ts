import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        green: {
          400: "#00ff00",
          900: "#003300",
        },
        purple: {
          400: "#ff00ff",
          700: "#660066",
          900: "#330033",
          950: "#1a001a",
        },
        cyan: {
          400: "#00ffff",
          700: "#006666",
          900: "#003333",
          950: "#001a1a",
        },
      },
      fontFamily: {
        mono: ["var(--font-vt323)", "monospace"],
        pixel: ["var(--font-press-start)", "monospace"],
        marker: ["var(--font-permanent-marker)", "cursive"],
        stencil: ["var(--font-black-ops)", "cursive"],
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "0" },
          "50%, 100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
