/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FBF9F1",
        card: "#FFFFFF",
        accent: "#3B5998",
        "accent-light": "#5B7BB5",
        correct: "#2E7D32",
        "correct-bg": "#E8F5E9",
        wrong: "#E65100",
        "wrong-bg": "#FFF3E0",
        warning: "#F59E0B",
        "warning-bg": "#FFFBEB",
        text: "#1F2937",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', "serif"],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
}
