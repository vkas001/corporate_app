import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createEditProfileStyles = (colors: ColorTheme) =>
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
      marginBottom: 24,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 12,
    },

    fieldGroup: {
      marginBottom: 14,
    },

    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textPrimary,
      marginBottom: 6,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: colors.textPrimary,
      backgroundColor: colors.surface,
    },

    inputError: {
      borderColor: "#D14343",
    },

    multilineInput: {
      minHeight: 80,
      textAlignVertical: "top",
    },

    errorText: {
      fontSize: 12,
      color: "#D14343",
      marginTop: 4,
    },

    buttonGroup: {
      flexDirection: "row",
      gap: 10,
      marginTop: 24,
      marginBottom: 30,
    },

    cancelBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
    },

    cancelBtnText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.textPrimary,
    },

    saveBtn: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },

    saveBtnText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.surface,
    },
  });
