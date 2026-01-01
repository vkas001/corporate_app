import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { historyConfig } from "@/config/historyConfig";
import { HistoryItem } from "@/types/history";
import { useTheme } from "@/theme/themeContext";

type Props = {
    item: HistoryItem;
    onPress?: () => void;
};

export default function HistoryCard({ item, onPress }: Props) {
    const { colors } = useTheme();
    const config = historyConfig[item.type];

    return (
        <Pressable
            onPress={onPress}
            className="p-4 mb-3 rounded-2xl border"
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
        >
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                    <View
                        className="w-10 h-10 rounded-xl items-center justify-center"
                        style={{ backgroundColor: colors.primary + "1A" }}
                    >
                        <Ionicons name={config.icon} size={18} color={colors.primary} />
                    </View>

                    <View>
                        <Text className="font-semibold" style={{ color: colors.textPrimary }}>
                            {config.label}
                        </Text>
                        <Text className="text-xs" style={{ color: colors.textSecondary }}>
                            {item.time}
                        </Text>
                    </View>
                </View>

                <View className="items-end">
                    {item.value !== undefined && (
                        <Text className="font-bold" style={{ color: colors.textPrimary }}>
                            {item.value} {item.unit}
                        </Text>
                    )}
                    {item.amount !== undefined && (
                        <Text className="font-bold" style={{ color: colors.primary }}>
                            Rs. {item.amount}
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
