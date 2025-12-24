const colorTheme = {
  light: {
    primary: "#FFB703",
    primaryDark: "#FB8500",
    background: "#FFF9F4",
    surface: "#F4EDE2",
    textPrimary: "#3A2E2A",
    textSecondary: "#6F625B",
    border: "#E6DCCE",
    accent: "#8C5E34",

    chart: {
      primary: {
        from: "rgba(255,183,3,0.85)",   
        to: "rgba(255,183,3,0.15)",
      },
      accent: {
        from: "rgba(140,94,52,0.85)",
        to: "rgba(140,94,52,0.15)",
      },
      neutral: {
        from: "rgba(230,220,206,0.8)",
        to: "rgba(230,220,206,0.2)",
      },
    },
  },

  dark: {
    primary: "#FFB703",
    primaryDark: "#F8961E",
    background: "#1B1B1B",
    surface: "#2A2A2A",
    textPrimary: "#FFFFFF",
    textSecondary: "#D1D1D1",
    border: "#3A3A3A",
    accent: "#CFA86A",

    chart: {
      primary: {
        from: "rgba(255,183,3,0.9)",
        to: "rgba(255,183,3,0.25)",
      },
      accent: {
        from: "rgba(207,168,106,0.9)",
        to: "rgba(207,168,106,0.25)",
      },
      neutral: {
        from: "rgba(58,58,58,0.8)",
        to: "rgba(58,58,58,0.3)",
      },
    },
  },
};

export type ColorTheme = typeof colorTheme.light;
export default colorTheme;
