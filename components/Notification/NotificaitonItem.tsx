import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../theme";

export type NotificationType =
  | "payment"
  | "rateUpdate"
  | "reminder"
  | "lowStock";

export interface NotificationItemProps {
  title: string;
  description?: string;
  type: NotificationType;
  timestamp?: string;
  onPress?: () => void;
  status?: "new" | "read";
  meta?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  type,
  timestamp,
  onPress,
  status = "read",
  meta,
}) => {
  const { colors } = useTheme();

  const typeMeta = useMemo(
    () => ({
      payment: {
        label: "Payment",
        icon: "cash-outline" as const,
        color: "#2E7D32",
      },
      rateUpdate: {
        label: "Rate Update",
        icon: "trending-up-outline" as const,
        color: "#1976D2",
      },
      reminder: {
        label: "Reminder",
        icon: "notifications-outline" as const,
        color: colors.primaryDark,
      },
      lowStock: {
        label: "Low Stock",
        icon: "alert-outline" as const,
        color: "#D64545",
      },
    }),
    [colors]
  );

  const metaForType = typeMeta[type];

  return (
    <SafeAreaView edges={[]} className="w-full">
      <TouchableOpacity
        activeOpacity={0.9}
        className="flex-row p-3.5 border rounded-2xl mb-3"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.surface,
          shadowColor: withOpacity(metaForType.color, 0.35),
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
        onPress={onPress}
      >
        <View
          className="w-11 h-11 rounded-xl items-center justify-center mr-3"
          style={{
            backgroundColor: withOpacity(metaForType.color, 0.12),
          }}
        >
          <Ionicons name={metaForType.icon} size={20} color={metaForType.color} />
        </View>

        <View className="flex-1 justify-center">
          <View className="flex-row items-center justify-between mb-1.5">
            <Text className="text-sm font-bold"
              style={{ color: colors.textPrimary }}
            >
              {title}
            </Text>
            <View className="flex-row items-center">
              {status === "new" && (
                <View className="w-2 h-2 rounded-full mr-1.5"
                  style={{ backgroundColor: metaForType.color }} />
              )}
              {timestamp && (
                <Text className="text-xs font-medium"
                  style={{ color: colors.textSecondary }}>{timestamp}</Text>
              )}
            </View>
          </View>

          <View className="flex-row items-center mb-1.5">
            <View
              className="flex-row items-center py-1.5 px-2 rounded-full"
              style={{
                backgroundColor: withOpacity(metaForType.color, 0.18),
              }}
            >
              <Ionicons name={metaForType.icon} size={14} color={metaForType.color} />
              <Text className="text-xs font-bold ml-1.5"
                style={{ color: metaForType.color }}>{metaForType.label}</Text>
            </View>
            {meta && (
              <View
                className="py-1.5 px-2 rounded-full ml-2"
                style={{ backgroundColor: withOpacity(colors.accent, 0.14) }}
              >
                <Text className="text-xs font-bold"
                  style={{ color: colors.accent }}>{meta}
                </Text>
              </View>
            )}
          </View>

          {description && (
            <Text className="text-sm leading-5"
              style={{ color: colors.textSecondary }}>{description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotificationItem;

const withOpacity = (hexColor: string, opacity: number) => {
  const sanitized = hexColor.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
