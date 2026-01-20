import { historyConfig } from "@/config/historyConfig";
import { useTheme } from "@/theme/themeContext";
import { HistoryItem } from "@/types/history";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
    item: HistoryItem;
    onPress?: () => void;
};

export default function HistoryCard({ item, onPress }: Props) {
    const { colors } = useTheme();
    const config = historyConfig[item.type];

    const subtitleParts = [item.date, item.time].filter(Boolean);
    const subtitle = subtitleParts.join(" • ");

    const description = typeof item.description === "string" ? item.description : undefined;

    return (
        <Pressable
            onPress={onPress}
            className="p-4 mb-2 rounded-2xl border"
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
        >
            <View className="flex-row items-stretch">
                <View className="flex-row items-start gap-3 flex-1 pr-3">
                    <View
                        className="w-10 h-10 rounded-xl items-center justify-center"
                        style={{ backgroundColor: colors.primary + "1A" }}
                    >
                        <Ionicons name={config.icon} size={18} color={colors.primary} />
                    </View>

                    <View className="flex-1">
                        <Text className="text-xs font-semibold"
                            style={{ color: colors.textSecondary }}
                        >
                            {config.label}
                        </Text>
                        <Text
                            className="text-base font-semibold"
                            style={{ color: colors.textPrimary }}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>
                        {description ? (
                            <Text
                                className="text-xs mt-0.5"
                                style={{ color: colors.textSecondary }}
                                numberOfLines={2}
                            >
                                {description}
                            </Text>
                        ) : null}
                        {subtitle ? (
                            <Text className="text-xs"
                                style={{ color: colors.textSecondary }}
                            >
                                {subtitle}
                            </Text>
                        ) : null}
                    </View>
                </View>

                <View className="self-stretch items-end justify-end">
                    {item.value !== undefined && (
                        <Text className="font-semibold"
                            style={{ color: colors.textPrimary }}
                        >
                            {item.value} {item.unit}
                        </Text>
                    )}
                    {item.amount !== undefined && (
                        <Text className="font-semibold"
                            style={{ color: colors.primary }}
                        >
                            Rs. {item.amount}
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
