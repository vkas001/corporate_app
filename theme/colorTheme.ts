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
    

  },
};

export type ColorTheme = typeof colorTheme.light;

export default colorTheme;
