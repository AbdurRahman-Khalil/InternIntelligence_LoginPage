import tailwindcssMotion from "tailwindcss-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "SmoochSans": ["Smooch Sans", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        "Montserrat": ["Montserrat", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        "RedHatDisplay": ["Red Hat Display", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      }
    },
  },
  plugins: [tailwindcssMotion],
}

