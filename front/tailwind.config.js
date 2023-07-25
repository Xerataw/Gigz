const gigzColors = {
  'gigz-primary': '#FFB500',
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: gigzColors,
      backgroundColor: gigzColors,
    },
  },
  plugins: [],
};
