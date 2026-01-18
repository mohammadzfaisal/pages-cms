import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './fields/**/*.{js,ts,jsx,tsx}'
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        primary: [
          "var(--font-serif)",
          "Crimson Pro",
          "Georgia",
          "ui-serif",
          "serif"
        ],
        secondary: [
          "var(--font-serif)",
          "Crimson Pro",
          "Georgia",
          "ui-serif",
          "serif"
        ],
        heading: [
          "var(--font-serif)",
          "Crimson Pro",
          "Georgia",
          "ui-serif",
          "serif"
        ],
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        serif: [
          "var(--font-serif)",
          "Crimson Pro",
          "Georgia",
          "ui-serif",
          "serif"
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
        button: ["var(--font-serif)", "Crimson Pro", "Georgia", "ui-serif", "serif"]
      },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        base: "16px",
        "base-sm": "12.8px",
        h6: "1.2rem",
        "h6-sm": "1.08rem",
        h5: "1.44rem",
        "h5-sm": "1.296rem",
        h4: "1.728rem",
        "h4-sm": "1.5552rem",
        h3: "2.0736rem",
        "h3-sm": "1.86624rem",
        h2: "2.48832rem",
        "h2-sm": "2.239488rem",
        h1: "2.985984rem",
        "h1-sm": "2.6873856rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
