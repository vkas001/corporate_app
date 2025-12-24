import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createDashboardStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 10,
    },
    headerContainer: {
      height: 56,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.surface,
    },
    headerTextContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginLeft: 3,
      color: colors.textPrimary,
    },
    headerDate: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    iconBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    quickActionsContainer: {
      marginVertical: 16,
      gap: 12,
    },

    primaryAction: {
      backgroundColor: colors.primaryDark,
      padding: 16,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    primaryActionText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: "600",
    },

    secondaryAction: {
      backgroundColor: colors.primaryDark,
      padding: 14,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    secondaryActionText: {
      color: colors.textPrimary,
      fontSize: 14,
      fontWeight: "500",
    },

    farmContainerTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textPrimary,
    },
    farmContainer: {
      height: "auto",
      borderRadius: 12,
      paddingBottom: 16,
      marginHorizontal: -20,
      paddingVertical: 12,
      backgroundColor: colors.surface,
    },
    farmInner: {
      paddingHorizontal: 20,
    },

    dropdownContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
    dropdownText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    periodContainer: {
      flexDirection: "row",
      borderRadius: 12,
      padding: 4,
      marginBottom: 16,
      backgroundColor: colors.primary,
    },
    periodItem: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 6,
      borderRadius: 8,
    },
    periodItemActive: {
      backgroundColor: colors.primaryDark,
    },
    periodText: {
      fontSize: 13,
      fontWeight: "500",
      color: colors.textPrimary,
    },
    periodTextActive: {
      color: colors.textPrimary,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 12,
    },

    statCard: {
      width: "48%",
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 14,
    },

    statLabel: {
      fontSize: 12,
      color: colors.background,
      marginBottom: 6,
      textTransform: "uppercase",
    },

    statValue: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 6,
    },

    statSub: {
      fontSize: 12,
      color: "green",
    },

    statRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    statChange: {
      fontSize: 12,
      color: "green",
    },



  });
