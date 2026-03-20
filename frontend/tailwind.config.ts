export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
      },
      boxShadow: {
        corporate: "0 18px 48px -24px rgba(37, 99, 235, 0.18)",
        "corporate-lg": "0 28px 80px -28px rgba(37, 99, 235, 0.26)",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
    },
  },
  plugins: [],
}
