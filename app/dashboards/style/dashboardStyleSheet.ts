import { StyleSheet } from "react-native";
import { ColorTheme } from "@/theme/colorTheme";

export const createDashboardStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, // theme-aware
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 40, // keeps content from top
    },
    priceCard: {
      padding: 16,
      borderRadius: 16,
      marginBottom: 8,
      alignItems: "flex-start",
      justifyContent: "center",
      backgroundColor: colors.surface,
      shadowColor: colors.accent,
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 8,
      elevation: 3,
    },
    priceLabel: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 4,
      color: colors.textPrimary,
    },
    priceValue: {
      fontSize: 15,
      color: "darkgreen",
    },

    welcomeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },

    welcomeText: {
      fontSize: 20,
      fontWeight: "500",
      marginBottom: 10,
      textAlign: "left",
      color: colors.textPrimary,
    },

    langBtnsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    langRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: 15,
    },

    langBtn: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      marginLeft: 10,
      backgroundColor: colors.surface,
    },

    langBtnActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    langText: {
      color: colors.textPrimary,
      fontWeight: "600",
    },


    cardsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
    },
    card: {
      flex: 1,
      marginHorizontal: 5,
      padding: 20,
      borderRadius: 16,
      backgroundColor: colors.surface,
      shadowColor: colors.accent,
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 8,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 14,
      marginBottom: 5,
      color: colors.textSecondary,
    },
    cardValue: {
      fontSize: 20,
      fontWeight: "500",
      color: colors.primary,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 10,
      color: colors.textPrimary,
    },
    infoCard: {
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      shadowColor: colors.accent,
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 2,
    },
    infoText: {
      fontSize: 14,
      color: colors.textPrimary,
    },
    marketPanel: {
      width: "100%",
      padding: 20,
      borderRadius: 16,
      backgroundColor: colors.surface,
      shadowColor: colors.accent,
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 3,
      marginBottom: 30,
    },

    marketRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    marketLabel: {
      fontSize: 15,
      color: colors.textSecondary,
    },

    marketValue: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.textPrimary,
    },


  });
