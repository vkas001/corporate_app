import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createProfileStyles = (colors: ColorTheme) =>
  StyleSheet.create({
   
    profileContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    profileCard: {
      paddingVertical: 20,
      paddingHorizontal: 15,
      alignItems: "center",
    },
    avatarWrapper: {
      position: "relative",
      marginBottom: 15,
    },
    avatarEditBtn: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.surface,
    },
    userName: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.textPrimary,
      marginTop: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    editProfileBtn: {
      marginTop: 15,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: colors.surface,
    },
    editProfileText: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.primary,
    },
    menuCard: {
      width: "100%",
      marginTop: 24,
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
    },

    menuLabel: {
      flex: 1,
      fontSize: 15,
      marginLeft: 15,
      color: colors.textPrimary,
    },
    logoutItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: colors.border,
    },
    logoutText: {
      fontSize: 15,
      fontWeight: "500",
      color: "#E63946",
    },

  });
