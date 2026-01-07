import { getToken } from '@/utils/auth';
import i18n from "@/utils/i18";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { I18nextProvider } from "react-i18next";
import { ThemeProvider, useTheme } from "../theme";
import './global.css';

export default function RootLayout() {
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔐 Checking auth on app start");
      const token = await getToken();
      if (!token) {
        console.log("❌ No token found");
        router.replace("/(auth)/sign-in");
      } else {
        console.log("✅ Token found");
      }
    };

    checkAuth();
  }, []);

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
