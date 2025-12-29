import { useTheme } from "@/theme";
import { BatchRecord } from "@/types/batch";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  batch: BatchRecord;
};

const BatchCard = ({ batch }: Props) => {
  const { colors } = useTheme();

  const statusConfig = {
    active: {
      label: "ACTIVE",
      icon: "checkmark-circle" as const,
      color: "#2E7D32",
      bgColor: withOpacity("#2E7D32", 0.12),
    },
    closed: {
      label: "CLOSED",
      icon: "close-circle" as const,
      color: "#616161",
      bgColor: withOpacity("#616161", 0.12),
    },
  };

  const status = statusConfig[batch.status];
  const mortalityRate = ((batch.mortalityCount / batch.initialBirdCount) * 100).toFixed(1);

  return (
    <View
      className="rounded-2xl p-4 mb-4 border"
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.primary,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        },
      ]}
    >
      {/* Header with batch code and status */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-2.5 flex-1">
          <View
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{ backgroundColor: withOpacity(colors.primary, 0.12) }}
          >
            <Ionicons name="layers-outline" size={18} color={colors.primary} />
          </View>
          <Text
            className="text-base font-bold"
            style={{ color: colors.textPrimary }}
          >
            {batch.batchCode}
          </Text>
        </View>

        <View
          className="flex-row items-center px-2.5 py-1.5 rounded-full gap-1"
          style={{ backgroundColor: status.bgColor }}
        >
          <Ionicons name={status.icon} size={14} color={status.color} />
          <Text
            className="text-xs font-bold"
            style={{ color: status.color }}
          >
            {status.label}
          </Text>
        </View>
      </View>

      {/* Start Date */}
      <View className="flex-row items-center gap-1.5 mb-3">
        <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
        <Text
          className="text-xs font-medium"
          style={{ color: colors.textSecondary }}
        >
          Started on {batch.startDate}
        </Text>
      </View>

      {/* Divider */}
      <View
        className="h-px mb-3 opacity-50"
        style={{ backgroundColor: colors.border }}
      />

      {/* Stats Grid */}
      <View className="flex-row gap-2.5 mb-2.5">
        <StatCard
          label="Initial Birds"
          value={batch.initialBirdCount}
          icon="paw-outline"
          colors={colors}
        />
        <StatCard
          label="Current Birds"
          value={batch.currentBirdCount}
          icon="checkmark-done-outline"
          colors={colors}
        />
      </View>

      <View className="flex-row gap-2.5 mb-2.5">
        <StatCard
          label="Mortality"
          value={batch.mortalityCount}
          icon="alert-circle-outline"
          colors={colors}
          subtitle={`${mortalityRate}%`}
          isAlert={parseFloat(mortalityRate) > 5}
        />
        <StatCard
          label="Total Eggs"
          value={batch.eggsProducedTotal}
          icon="nutrition-outline"
          colors={colors}
        />
      </View>

      {/* Remarks */}
      {batch.remarks && (
        <View className="flex-row items-start gap-1.5 mt-1 pt-3 border-t" style={{ borderTopColor: "rgba(0,0,0,0.05)" }}>
          <Ionicons name="information-circle-outline" size={14} color={colors.textSecondary} />
          <Text
            className="text-xs font-medium flex-1"
            style={{ color: colors.textSecondary }}
          >
            {batch.remarks}
          </Text>
        </View>
      )}
    </View>
  );
};

const StatCard = ({
  label,
  value,
  icon,
  colors,
  subtitle,
  isAlert = false,
}: {
  label: string;
  value: number;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  colors: any;
  subtitle?: string;
  isAlert?: boolean;
}) => (
  <View
    className="flex-1 p-3 rounded-xl border"
    style={[
      {
        backgroundColor: withOpacity(colors.primaryDark, 0.06),
        borderColor: withOpacity(colors.border, 0.5),
      },
    ]}
  >
    <View className="flex-row items-center gap-1.5 mb-2">
      <Ionicons
        name={icon}
        size={16}
        color={isAlert ? "#D32F2F" : colors.textSecondary}
      />
      <Text
        className="text-xs font-semibold uppercase"
        style={{ color: colors.textSecondary }}
      >
        {label}
      </Text>
    </View>
    <Text
      className="text-2xl font-bold"
      style={{
        color: isAlert ? "#D32F2F" : colors.textPrimary,
      }}
    >
      {value.toLocaleString()}
    </Text>
    {subtitle && (
      <Text
        className="text-xs font-semibold mt-0.5"
        style={{
          color: isAlert ? "#D32F2F" : colors.accent,
        }}
      >
        {subtitle}
      </Text>
    )}
  </View>
);

const withOpacity = (hexColor: string, opacity: number) => {
  const sanitized = hexColor.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default BatchCard;