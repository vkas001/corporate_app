import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createMarketStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      position: "relative",
    },

    header: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
    },

    title: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.textPrimary,
    },

    dropdown: {
      position: "absolute",
      top: 60,
      left: 0,
      right: 0,
      zIndex: 10,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginHorizontal: 16,
      elevation: 5,
      backgroundColor: colors.accent,
      overflow: "hidden",
    },

    dropdownItem: {
      paddingHorizontal: 16,
      paddingVertical: 14,
    },

    dropdownText: {
      fontSize: 16,
      color: colors.textPrimary,
    },

    tableWrapper: {
      marginTop: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },

    tableHeader: {
      flexDirection: "row",
      
    },

    cell: {
      justifyContent: "center",
      alignItems: "center",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },

    headerText: {
      fontWeight: "600",
      color: colors.textPrimary,
    },

    text: {
      fontSize: 14,
      color: colors.textPrimary,
    },


  });
