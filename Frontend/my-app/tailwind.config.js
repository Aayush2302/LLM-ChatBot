import daisyui from "daisyui"; // Import DaisyUI

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure the paths are correct
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Include DaisyUI here
  daisyui: {
    themes: [
      "black", // Default theme
      {
        black: {
          primary: "rgb(29, 155, 240)", // Customize your theme if needed
          secondary: "rgb(24, 24, 24)",
        },
      },
    ],
  },
};
