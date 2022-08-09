module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      spacing: {
        "1x": "10px",
        "2x": "20px",
        "3x": "30px",
        "4x": "40px",
        "5x": "50px",
        "6x": "60px",
        "7x": "70px",
        "8x": "80px",
        "9x": "90px",
        "10x": "100px",
        "11x": "110px",
      },
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1200px",
        // => @media (min-width: 1200px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
