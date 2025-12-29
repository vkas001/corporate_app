import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createProductionStyles = (colors: ColorTheme) =>
    StyleSheet.create({
        
        recordsContainer: {
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: colors.background,
        },
        titleContainer: {
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.primaryDark,
            borderRadius: 10,
            paddingHorizontal: 12,
            marginBottom: 12,
            elevation: 2,
        },
        recordsTitle: {
            fontSize: 16,
            fontWeight: "500",
            color: colors.textPrimary,
        },
    });