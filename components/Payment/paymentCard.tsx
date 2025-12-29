import { useTheme } from "@/theme";
import { PaymentRecord } from "@/types/payment";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  payment: PaymentRecord;
};

const PaymentCard = ({ payment }: Props) => {
  const { colors } = useTheme();

  const statusConfig = {
    paid: {
      label: "PAID",
      icon: "checkmark-circle" as const,
      color: "#2E7D32",
      bgColor: withOpacity("#2E7D32", 0.12),
    },
    partial: {
      label: "PARTIAL",
      icon: "time" as const,
      color: "#F57C00",
      bgColor: withOpacity("#F57C00", 0.12),
    },
    pending: {
      label: "PENDING",
      icon: "alert-circle" as const,
      color: "#D32F2F",
      bgColor: withOpacity("#D32F2F", 0.12),
    },
  };

  const status = statusConfig[payment.status];

  return (
    <View
      className="rounded-2xl p-4 mb-4 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        shadowColor: colors.primary,
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      }}
    >
      {/* Header with gradient accent */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
          <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>
            {payment.periodStart} → {payment.periodEnd}
          </Text>
        </View>

        <View className="flex-row items-center px-2.5 py-1.5 rounded-full gap-1" style={{ backgroundColor: status.bgColor }}>
          <Ionicons name={status.icon} size={14} color={status.color} />
          <Text className="text-xs font-bold" style={{ color: status.color }}>{status.label}</Text>
        </View>
      </View>

      {/* Main Amount with accent bar */}
      <View className="flex-row mb-4">
        <View className="w-1 rounded mr-3" style={{ backgroundColor: colors.primary }} />
        <View className="flex-1">
          <Text className="text-xs font-semibold mb-1 uppercase" style={{ color: colors.textSecondary, letterSpacing: 0.5 }}>
            Net Payable
          </Text>
          <Text className="text-3xl font-black" style={{ color: colors.textPrimary, letterSpacing: -0.5 }}>
            NPR {payment.netAmount.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px mb-3 opacity-50" style={{ backgroundColor: colors.border }} />

      {/* Breakdown */}
      <View className="gap-2.5">
        <Row
          label="Gross Amount"
          value={payment.grossAmount}
          icon="cash-outline"
          colors={colors}
        />

        {payment.role === "producer" && payment.deductions !== undefined && (
          <Row
            label="Deductions"
            value={payment.deductions}
            icon="remove-circle-outline"
            colors={colors}
            isNegative
          />
        )}

        {payment.role === "seller" && payment.commission !== undefined && (
          <Row
            label="Commission"
            value={payment.commission}
            icon="trending-down-outline"
            colors={colors}
            isNegative
          />
        )}

        <Row label="Paid" value={payment.paidAmount} icon="checkmark-done-outline" colors={colors} />
        <Row
          label="Balance"
          value={payment.balanceAmount}
          icon="wallet-outline"
          colors={colors}
          highlight={payment.balanceAmount > 0}
        />
      </View>

      {/* Footer */}
      {payment.paidAt && (
        <View className="flex-row items-center gap-1.5 mt-3 pt-3 border-t" style={{ borderTopColor: "rgba(0,0,0,0.05)" }}>
          <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
          <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>
            Paid on {payment.paidAt}
          </Text>
        </View>
      )}
    </View>
  );
};

const Row = ({
  label,
  value,
  icon,
  colors,
  highlight = false,
  isNegative = false,
}: {
  label: string;
  value: number;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  colors: any;
  highlight?: boolean;
  isNegative?: boolean;
}) => (
  <View className="flex-row justify-between items-center">
    <View className="flex-row items-center gap-2">
      <Ionicons name={icon} size={16} color={colors.textSecondary} />
      <Text className="text-sm font-medium" style={{ color: colors.textSecondary }}>
        {label}
      </Text>
    </View>
    <Text
      className={`text-sm ${highlight ? "font-bold" : "font-semibold"}`}
      style={{
        color: highlight
          ? "#D32F2F"
          : isNegative
            ? colors.textSecondary
            : colors.textPrimary,
        fontWeight: highlight ? "700" : "600",
      }}
    >
      {isNegative && "- "}NPR {value.toLocaleString()}
    </Text>
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

export default PaymentCard;