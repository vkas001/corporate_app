import i18n from "@/utils/i18";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, useTheme } from "../theme";

export default function RootLayout() {
  const { theme, colors } = useTheme();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </I18nextProvider>
  );
}
