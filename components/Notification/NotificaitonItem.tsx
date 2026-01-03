import { NOTIFICATION_CONFIG } from "@/config/notificationConfig";
import { AppNotification } from "@/types/notificaion";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../../theme";

interface Props {
  item: AppNotification;
  onPress: () => void;
}

const NotificationItem: React.FC<Props> = ({ item, onPress }) => {
  const { colors } = useTheme();
  const meta = NOTIFICATION_CONFIG[item.type];

  const statusIndicatorColor = item.status === "new" ? meta.color : colors.border;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-start p-4 border-l-4 rounded-2xl mb-0 overflow-hidden"
      style={{
        borderLeftColor: statusIndicatorColor,
        borderTopColor: colors.border,
        borderTopWidth: 1,
        borderRightColor: colors.border,
        borderRightWidth: 1,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        backgroundColor: item.status === "new" ? colors.surface : colors.surface,
      } as ViewStyle}
    >
      <View
        className="w-12 h-12 rounded-xl items-center justify-center mr-3.5 flex-shrink-0"
        style={{
          backgroundColor: `${meta.color}20`,
        }}
      >
        <Ionicons name={meta.icon as any} size={22} color={meta.color} />
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between items-start mb-1">
          <Text
            className="text-sm font-bold flex-1 pr-2"
            style={{ color: colors.textPrimary }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          {item.status === "new" && (
            <View
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: meta.color }}
            />
          )}
        </View>

        <Text
          className="text-xs mb-2"
          style={{ color: colors.textSecondary }}
        >
          {item.timestamp}
        </Text>

        {item.description && (
          <Text
            className="text-sm leading-5 mb-2"
            style={{ color: colors.textSecondary }}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        )}

        {(item.meta || item.type) && (
          <View className="flex-row flex-wrap gap-1.5 items-center">
            <View
              className="flex-row items-center px-2.5 py-1.5 rounded-full"
              style={{
                backgroundColor: `${meta.color}25`,
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: meta.color }}
              >
                {meta.label}
              </Text>
            </View>

            {item.meta && (
              <View
                className="px-2.5 py-1.5 rounded-full border"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                }}
              >
                <Text
                  className="text-xs font-medium"
                  style={{ color: colors.textSecondary }}
                  numberOfLines={1}
                >
                  {item.meta}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
