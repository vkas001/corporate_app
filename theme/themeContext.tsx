import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Appearance } from "react-native";
import colorTheme, { ColorTheme } from "./colorTheme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  colors: ColorTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: colorTheme.light,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemScheme = Appearance.getColorScheme() as ThemeMode;
  const [theme, setTheme] = useState<ThemeMode>(systemScheme || "light");

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme as ThemeMode);
    });
    return () => listener.remove();
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  const colors = colorTheme[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
