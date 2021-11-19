module.exports = {
  enabled: true,
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},

    colors: {
      primary: "white",
      secondary: "hsla(265, 100%, 59%, 1)",
      grey0: "hsla(0, 0%, 100%, 1)",
      grey1: "hsla(0, 0%, 98%, 1)",
      grey2: "hsla(0, 0%, 0%, 0.2)",
      grey3: "hsla(0, 0%, 0%, 0.6)",
      grey4: "hsla(0, 0%, 19%, 1)",
      errro: "hsla(360, 100%, 59%, 1)",
      success: "hsla(104, 66%, 65%, 1)",
      purple: {
        DEFAULT: "hsla(265, 100%, 59%, 1)",
        light: "hsla(265, 100%, 59%, 0.2)",
      },
    },

    gradientColorStops: {
      // Gradient 1
      violet: "hsla(288, 100%, 50%, 1)",
      purple1: "hsla(227, 83%, 49%, 1)",

      // Gradient 2
      purple2: "hsla(266, 100%, 58%, 1)",
      purple3: "hsla(248, 100%, 69%, 1)",
    },

    fontSize: {
      // html - font-size = 10px
      // So here the font size in rem * 10 = font size in px

      // Desktop
      "desktop-h1": ["6rem"],
      "desktop-h2": ["5rem"],
      "desktop-h3": ["4rem"],
      "desktop-h4": ["3rem"],
      "desktop-body-intro": ["2.4rem", "140%"],
      "desktop-body-main": ["2rem", "140%"],

      // For tablet size take one level lower font size
      // of desktop of which you are using like (if h1 is needed then
      // take h2 of desktop)

      // Mobile
      "mobile-h1": ["3.4rem"],
      "mobile-h2": ["3.2rem"],
      "mobile-h3": ["2.8rem"],
      "mobile-h4": ["2.4rem"],
      "mobile-body-intro": ["2rem", "140%"],
      "mobile-body-main": ["1.7rem", "140%"],

      // Font size that are common in all viewports
      medium: ["1.7rem"],
      caption: ["1.5rem"],
      small: ["1.3rem"],

      // Button
      "btn-20": ["2rem"],
      "btn-17": ["1.7rem"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
