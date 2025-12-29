import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createUserManagementStyles = (colors: ColorTheme) =>
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

    statsContainer: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 20,
    },

    statCard: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      alignItems: "center",
      gap: 10,
    },

    statIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.primary + "18",
      alignItems: "center",
      justifyContent: "center",
    },

    statValue: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
    },

    statLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 2,
    },

    addUserBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      marginBottom: 20,
    },

    addUserText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.surface,
    },

    section: {
      marginBottom: 24,
    },

    sectionTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: 12,
    },

    userCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    userCardContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    avatarContainer: {
      position: "relative",
    },

    statusIndicator: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#1E8E3E",
      borderWidth: 2,
      borderColor: colors.surface,
    },

    userInfo: {
      flex: 1,
    },

    userName: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.textPrimary,
    },

    userEmail: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },

    userMeta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 6,
    },

    roleBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      borderWidth: 1,
    },

    roleText: {
      fontSize: 11,
      fontWeight: "600",
      textTransform: "capitalize",
    },

    joinDate: {
      fontSize: 11,
      color: colors.textSecondary,
    },

    userActions: {
      flexDirection: "row",
      gap: 8,
    },

    actionIconBtn: {
      width: 32,
      height: 32,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },

    rolesContainer: {
      gap: 12,
    },

    roleInfo: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    roleIndicator: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },

    roleInfoTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.textPrimary,
    },

    roleInfoDesc: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
  });
