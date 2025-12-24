import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createFinanceStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    sectionGap: {
      gap: 14,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 0.5,
      borderColor: colors.textSecondary,
      padding: 16,
    },

    halfCard: {
      
    },

    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 10,
    },

    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },

    cardTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.textPrimary,
    },

    label: {
      fontSize: 12,
      color: colors.textSecondary,
    },

    bigValue: {
      fontSize: 20,
      fontWeight: "700",
      marginTop: 6,
      color: colors.textPrimary,
    },

    valueText: {
      fontWeight: "600",
      color: "green",
    },

    successText: {
      color: "green",
      fontWeight: "600",
    },

    errorText: {
      color: 'red',
      fontWeight: "600",
    },

    warningText: {
      color: colors.textPrimary,
      marginTop: 6,
      fontWeight: "600",
    },

    subText: {
      fontSize: 12,
      color: colors.textSecondary,
    },

    alertTitle: {
      color: colors.textPrimary,
      fontWeight: "700",
      marginBottom: 6,
    },

    alertText: {
      fontSize: 13,
      color: colors.textPrimary,
      marginBottom: 4,
    },
  });