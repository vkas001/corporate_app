import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createSettingsStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 12,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },

    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.textPrimary,
    },

    content: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 16,
    },

    section: {
      marginBottom: 20,
    },

    sectionTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 10,
      paddingHorizontal: 4,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
    },

    settingIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.primary + "18",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    settingInfo: {
      flex: 1,
    },

    settingTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.textPrimary,
    },

    settingSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },

    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginHorizontal: 16,
    },
  });
