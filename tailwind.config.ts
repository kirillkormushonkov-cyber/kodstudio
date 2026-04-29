import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: "#6B5BFF",
          purple: "#8B5CF6",
          magenta: "#C084FC",
          pink: "#E879F9",
        },
        bg: {
          base: "#0A0A14",
          elevated: "#12121F",
          overlay: "#1A1A2E",
        },
        text: {
          primary: "#F4F4F8",
          secondary: "#A1A1B5",
          muted: "#6B6B7E",
        },
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #6B5BFF 0%, #8B5CF6 50%, #E879F9 100%)",
        "gradient-hero":
          "radial-gradient(ellipse at top, rgba(107,91,255,0.18) 0%, rgba(10,10,20,0) 55%), radial-gradient(ellipse at bottom right, rgba(232,121,249,0.14) 0%, rgba(10,10,20,0) 55%)",
      },
      boxShadow: {
        glow: "0 0 48px -8px rgba(139, 92, 246, 0.55)",
        card: "0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px 0 rgba(0,0,0,0.3)",
        brand: "0 8px 32px -8px rgba(107, 91, 255, 0.45)",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px -5px rgba(139,92,246,0.4)" },
          "50%": { boxShadow: "0 0 48px -5px rgba(139,92,246,0.75)" },
        },
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
      },
    },
  },
};

export default config;
