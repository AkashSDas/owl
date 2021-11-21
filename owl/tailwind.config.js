module.exports = {
  enabled: true,
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},

    screens: {
      sm: "640px",
      md: "768px",
      mymd: "962px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    colors: {
      primary: "white",
      secondary: "hsla(265, 100%, 59%, 1)",
      grey0: "hsla(0, 0%, 100%, 1)",
      grey1: "hsla(0, 0%, 98%, 1)",
      grey2: "hsla(0, 0%, 0%, 0.2)",
      grey3: "hsla(0, 0%, 0%, 0.6)",
      grey4: "hsla(0, 0%, 19%, 1)",
      grey5: "hsla(0, 0%, 0%, 1)",
      error: "hsla(360, 100%, 59%, 1)",
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
      "desktop-h1": ["3.75rem"],
      "desktop-h2": ["3.125rem"],
      "desktop-h3": ["2.5rem"],
      "desktop-h4": ["1.875rem"],
      "desktop-body-intro": ["1.5rem", "140%"],
      "desktop-body-main": ["1.25rem", "140%"],

      // For tablet size take one level lower font size
      // of desktop of which you are using like (if h1 is needed then
      // take h2 of desktop)
      "tablet-h1": ["2.125rem"],
      "tablet-h2": ["2.5rem"],
      "tablet-h3": ["1.875rem"],
      "tablet-h4": ["1.5rem"],
      "tablet-body-intro": ["1.5rem", "140%"],
      "tablet-body-main": ["1.25rem", "140%"],

      // Mobile
      "mobile-h1": ["2.125rem"],
      "mobile-h2": ["2rem"],
      "mobile-h3": ["1.75rem"],
      "mobile-h4": ["1.5rem"],
      "mobile-body-intro": ["1.25rem", "140%"],
      "mobile-body-main": ["1.063rem", "140%"],

      // Font size that are common in all viewports
      medium: ["1.063rem"],
      caption: ["0.938rem"],
      small: ["0.813rem"],

      // Button
      "btn-20": ["1.25rem"],
      "btn-17": ["1.063rem"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
