import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
        color: "green",
      },
      rateUpdate: {
        label: "Rate Update",
        icon: "trending-up-outline" as const,
        color: "green",
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
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.card,
        {
          borderColor: colors.border,
          backgroundColor:
            status === "new"
              ? withOpacity(metaForType.color, 0.08)
              : colors.surface,
          shadowColor: withOpacity(metaForType.color, 0.35),
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: withOpacity(metaForType.color, 0.12),
          },
        ]}
      >
        <Ionicons name={metaForType.icon} size={20} color={metaForType.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {title}
          </Text>
          <View style={styles.metaRow}>
            {status === "new" && (
              <View style={[styles.dot, { backgroundColor: metaForType.color, marginRight: 6 }]} />
            )}
            {timestamp && (
              <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{timestamp}</Text>
            )}
          </View>
        </View>

        <View style={styles.tagRow}>
          <View
            style={[
              styles.typeTag,
              {
                backgroundColor: withOpacity(metaForType.color, 0.18),
              },
            ]}
          >
            <Ionicons name={metaForType.icon} size={14} color={metaForType.color} />
            <Text style={[styles.typeLabel, { color: metaForType.color }]}>{metaForType.label}</Text>
          </View>
          {meta && (
            <View
              style={[
                styles.metaPill,
                { backgroundColor: withOpacity(colors.accent, 0.14), marginLeft: 8 },
              ]}
            >
              <Text style={[styles.metaText, { color: colors.accent }]}>{meta}</Text>
            </View>
          )}
        </View>

        {description && (
          <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
        )}
      </View>
    </TouchableOpacity>
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

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 14,
    borderWidth: 0.5,
    borderRadius: 14,
    marginBottom: 12,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timestamp: {
    fontSize: 10,
    fontWeight: "500",
    marginLeft: 6,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  typeTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  typeLabel: {
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 6,
  },
  metaPill: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  metaText: {
    fontSize: 10,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
