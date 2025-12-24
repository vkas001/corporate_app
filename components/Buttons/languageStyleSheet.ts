import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createLanguageToggleStyles = (colors: ColorTheme) =>
  StyleSheet.create({
   langContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
   
    langLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    langLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
    },

    langToggle: {
      width: 88,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.background,
      flexDirection: "row",
      position: "relative",
      overflow: "hidden",
    },

    langIndicator: {
      position: "absolute",
      width: "50%",
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 16,
    },

    langItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },

    langText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.textPrimary,
    },

    langTextActive: {
      color: colors.background,
    },

  });