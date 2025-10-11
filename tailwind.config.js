/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "Montserrat", "ui-sans-serif", "system-ui"],
        body: ["Lora", "Source Sans Pro", "ui-serif", "Georgia"],
      },
      colors: {
        accent: {
          blue: "#2cb5e0",
          purple: "#7f5af0",
        },
      },
      boxShadow: {
        neon: "0 0 16px 4px #7f5af0, 0 0 32px 8px #2cb5e0"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, #7f5af0 0%, #2cb5e0 100%)',
      },
    },
  },
  plugins: [],
};
