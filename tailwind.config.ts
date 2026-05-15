import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        ocean: {
          DEFAULT: "#0B3D5C",
          50: "#F0F6FB",
          100: "#D9E8F2",
          200: "#B0CFE0",
          300: "#7DAFC9",
          400: "#4A8EAF",
          500: "#1F6E94",
          600: "#0B3D5C",
          700: "#093150",
          800: "#062642",
          900: "#041A2E",
        },
        cyan: {
          DEFAULT: "#00B4D8",
          50: "#E6F9FD",
          100: "#BDEEF8",
          200: "#7BDCF1",
          300: "#3FCBEA",
          400: "#00B4D8",
          500: "#0090AF",
          600: "#006D86",
        },
        amber: {
          DEFAULT: "#F59E0B",
          50: "#FEF8E7",
          100: "#FCEDB8",
          200: "#FADC85",
          300: "#F7C752",
          400: "#F59E0B",
          500: "#C57F08",
          600: "#8E5C06",
        },
        brass: {
          DEFAULT: "#C9A663",
          100: "#F5EBD3",
          200: "#E8D49E",
          300: "#D9BB7E",
          400: "#C9A663",
          500: "#A88947",
          600: "#7D6531",
        },
        canvas: "#FAFBFC",
        ink: "#1A1A2E",
        muted: "#5C6470",
        line: "#E5E8EC",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.022em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.018em" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 61, 92, 0.04), 0 8px 24px rgba(11, 61, 92, 0.06)",
        lift: "0 4px 8px rgba(11, 61, 92, 0.05), 0 20px 40px rgba(11, 61, 92, 0.10)",
        glass: "inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 12px 32px rgba(11, 61, 92, 0.12)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
        "3xl": "28px",
      },
      backgroundImage: {
        "ocean-fade": "linear-gradient(180deg, #FAFBFC 0%, #EAF3F9 100%)",
        "depth-fade": "linear-gradient(180deg, rgba(11,61,92,0) 0%, rgba(11,61,92,0.85) 100%)",
        "hero-wash": "radial-gradient(ellipse at 30% 20%, rgba(0,180,216,0.10), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(11,61,92,0.10), transparent 60%)",
        "ocean-wash": "linear-gradient(180deg, #F0F6FB 0%, #D9E8F2 100%)",
        "ocean-deep": "linear-gradient(180deg, #093150 0%, #062642 100%)",
        "midnight": "linear-gradient(135deg, #062642 0%, #0B3D5C 40%, #093150 100%)",
        "brass-line": "linear-gradient(90deg, transparent, rgba(201,166,99,0.5), transparent)",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        ripple: "ripple 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
