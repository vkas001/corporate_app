import './global.css';
import i18n from "@/utils/i18";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, useTheme } from "../theme";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <ThemedStatusBar />
        <Slot />
      </ThemeProvider>
    </I18nextProvider>
  );
}

function ThemedStatusBar() {
  const { theme, colors } = useTheme();
  return (
    <StatusBar
      style={theme === "light" ? "dark" : "light"}
      backgroundColor={colors.background}
      translucent={false}
    />
  );
}
