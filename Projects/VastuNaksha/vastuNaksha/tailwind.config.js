/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Elegant Modern Palette - Deep Blues & Golds
        primary: {
          50: "#f0f7ff",
          100: "#e0f0fe",
          200: "#bae1fd",
          300: "#7cc8fc",
          400: "#36a9f7",
          500: "#0c8ce9", // Main primary
          600: "#0070c7",
          700: "#0158a1",
          800: "#064c85",
          900: "#0b406e",
          950: "#07274a",
        },
        secondary: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308", // Golden yellow
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        accent: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef", // Electric purple
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        neutral: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        // Premium surface colors
        surface: {
          50: "#ffffff",
          100: "#fafbfc",
          200: "#f1f3f4",
          300: "#e8eaed",
          400: "#bdc1c6",
          500: "#9aa0a6",
          600: "#80868b",
          700: "#5f6368",
          800: "#3c4043",
          900: "#202124",
          950: "#0d0d0d",
        },
        // Special glass and gradient colors
        glass: {
          light: "rgba(255, 255, 255, 0.15)",
          dark: "rgba(0, 0, 0, 0.15)",
          primary: "rgba(12, 140, 233, 0.1)",
          accent: "rgba(217, 70, 239, 0.1)",
        },
        // Gradient definitions
        gradient: {
          primary: "linear-gradient(135deg, #0c8ce9 0%, #d946ef 100%)",
          secondary: "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
          surface: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          dark: "linear-gradient(135deg, #0b406e 0%, #4a044e 100%)",
          hero: "linear-gradient(135deg, rgba(12, 140, 233, 0.9) 0%, rgba(217, 70, 239, 0.9) 50%, rgba(234, 179, 8, 0.8) 100%)",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0c8ce9 0%, #d946ef 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
        "gradient-surface": "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        "gradient-dark": "linear-gradient(135deg, #0b406e 0%, #4a044e 100%)",
        "gradient-hero":
          "linear-gradient(135deg, rgba(12, 140, 233, 0.9) 0%, rgba(217, 70, 239, 0.9) 50%, rgba(234, 179, 8, 0.8) 100%)",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.8s ease-out",
        "slide-down": "slide-down 0.8s ease-out",
        "fade-in": "fade-in 1s ease-out",
        "fade-in-up": "fade-in-up 1s ease-out",
        "scale-in": "scale-in 0.6s ease-out",
        "bounce-gentle": "bounce-gentle 2s infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        morph: "morph 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "slide-up": {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(12, 140, 233, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(217, 70, 239, 0.5)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(31, 38, 135, 0.2)",
        "glass-lg": "0 20px 40px 0 rgba(31, 38, 135, 0.5)",
        modern:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "modern-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "glow-primary": "0 0 20px rgba(12, 140, 233, 0.3)",
        "glow-accent": "0 0 20px rgba(217, 70, 239, 0.3)",
        "glow-secondary": "0 0 20px rgba(234, 179, 8, 0.3)",
        elegant:
          "0 10px 30px -5px rgba(12, 140, 233, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
