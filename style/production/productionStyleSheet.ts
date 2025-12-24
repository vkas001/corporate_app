import { ColorTheme } from "@/theme/colorTheme";
import { StyleSheet } from "react-native";

export const createProductionStyles = (colors: ColorTheme) =>
    StyleSheet.create({
        safearaContainer: {
            flex: 1,
            backgroundColor: colors.background,
        },
        productionHeader: {
            height: 60,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.surface,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            elevation: 3,
            marginBottom: 16,
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.textPrimary,
        },
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