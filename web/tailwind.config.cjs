/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff1f1f",
        "primary-dark": "#a01515",
        "text-primary": "#101828",
        "text-muted": "#667085",
        "text-muted-light": "#94a3b8",
        "text-light": "#cbd5f5",
        "bg-primary": "#f6f7fb",
        "bg-secondary": "#f6f7fb",
        "bg-light": "#eff4ff",
        "bg-lighter": "#f8fafc",
        "bg-light-blue": "#eef2ff",
        "bg-lighter-blue": "#dbe9ff",
        "bg-dark": "#0f172a",
        "bg-dark-secondary": "#182642",
        "bg-input": "#ffffff",
        border: "#e4e7ec",
        "card-bg": "#ffffff",
        success: "#6ee7b7",
        "success-dark": "#15803d",
        "success-light": "#dcfce7",
        error: "#fee4e2",
        "error-dark": "#b42318",
        "badge-blue": "#e0edff",
      },
      boxShadow: {
        "custom-sm": "0px 15px 40px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        inter: [
          "Inter",
          "Segoe UI",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      borderRadius: {
        "xl-1_5": "1.5rem",
        "xl-2": "2rem",
      },
    },
  },
  plugins: [],
};
