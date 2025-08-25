/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#0B60D6",
      secondary: "#243677",
      white: "#FFFFFF",
      black: "#000000",
      border: "#E4E7EC",
      text: "#4E4E4E",
    },
    fontFamily: {
      abel: ["Abel"],
      noto: ["Noto Sans", "sans-serif"],
    },
    fontSize: {
      "10": "10px",
      "11": "11px",
      "12": "12px",
      "13": "13px",
      "14": "14px",
      "15": "15px",
      "16": "16px",
      "18": "18px",
      "19": "19px",
      "20": "20px",
      "22": "22px",
      "24": "24px",
      "52": "52px",
      sm: "14px",
    },
    borderRadius: {
      "6": "6px",
      "8": "8px",
      "10": "10px",
      "12": "12px",
      "15": "15px",
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
    },
    extend: {
      maxWidth: {
        "450": "450px",
        "950": "950px",
      },
      backgroundImage: {
        bgCard: "url(/public/images/png/bg-card.png)",
      },
    },
  },
  plugins: [],
}

