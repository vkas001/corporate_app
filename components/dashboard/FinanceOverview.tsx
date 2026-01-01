import { DASHBOARD_DATA } from "@/data/dashboardData";
import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface Props {
    data: typeof DASHBOARD_DATA.today.financeOverview;
}

export default function FinanceOverview({ data }: Props) {
    const { colors } = useTheme();

    const netFlow =
        (data.cashFlow.inflowValue ?? 0) - (data.cashFlow.outflowValue ?? 0);
    const netFlowPositive = netFlow >= 0;
    return (
        <View className="gap-4">
            {/* Cash Flow Card */}
            <View
                className="rounded-2xl p-4 border"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
                <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-row items-center gap-3 flex-1">
                        <View
                            className="w-10 h-10 rounded-full items-center justify-center"
                            style={{ backgroundColor: `${colors.primary}1A` }}
                        >
                            <Ionicons
                                name="trending-up-outline"
                                size={18}
                                color={colors.primary}
                            />
                        </View>
                        <View>
                            <Text
                                className="text-base font-bold"
                                style={{ color: colors.textPrimary }}
                            >
                                Cash Flow
                            </Text>
                            <Text
                                className="text-xs"
                                style={{ color: colors.textSecondary }}
                            >
                                High-level snapshot
                            </Text>
                        </View>
                    </View>

                    <View
                        className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: `${colors.primary}14` }}
                    >
                        <Ionicons
                            name={netFlowPositive ? "sparkles" : "alert-circle-outline"}
                            size={12}
                            color={colors.textPrimary}
                        />
                        <Text
                            className="text-xs font-semibold"
                            style={{ color: colors.textPrimary }}
                        >
                            {netFlowPositive ? "Healthy" : "Review"}
                        </Text>
                    </View>
                </View>

                <View className="flex-row justify-between gap-2">
                    {/* Inflow */}
                    <View className="flex-1">
                        <Text
                            className="text-xs font-medium uppercase"
                            style={{ color: colors.textSecondary }}
                        >
                            Inflow
                        </Text>
                        <Text className="text-xl font-bold text-green-600 mt-1">
                            {data.cashFlow.inflow}
                        </Text>
                        <Text
                            className="text-xs mt-1"
                            style={{ color: colors.textSecondary }}
                        >
                            Incoming
                        </Text>
                    </View>

                    {/* Outflow */}
                    <View className="flex-1">
                        <Text
                            className="text-xs font-medium uppercase"
                            style={{ color: colors.textSecondary }}
                        >
                            Outflow
                        </Text>
                        <Text className="text-xl font-bold text-red-600 mt-1">
                            {data.cashFlow.outflow}
                        </Text>
                        <Text
                            className="text-xs mt-1"
                            style={{ color: colors.textSecondary }}
                        >
                            Expenses
                        </Text>
                    </View>

                    {/* Free Cash */}
                    <View className="flex-1">
                        <Text
                            className="text-xs font-medium uppercase"
                            style={{ color: colors.textSecondary }}
                        >
                            Free Cash
                        </Text>
                        <Text
                            className="text-xl font-bold mt-1"
                            style={{ color: colors.primary }}
                        >
                            {data.cashFlow.freeCash}
                        </Text>
                        <Text
                            className="text-xs mt-1"
                            style={{ color: colors.primary }}
                        >
                            Available
                        </Text>
                    </View>
                </View>

                {/* Net Flow badge */}
                <View className="flex-row mt-4">
                    <View
                        className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{
                            backgroundColor: netFlowPositive ? "#22c55e1a" : "#ef44441a",
                        }}
                    >
                        <Ionicons
                            name={netFlowPositive ? "arrow-up" : "arrow-down"}
                            size={14}
                            color={netFlowPositive ? "#16a34a" : "#ef4444"}
                        />
                        <Text
                            className="text-xs font-semibold"
                            style={{
                                color: netFlowPositive ? "#166534" : "#b91c1c",
                            }}
                        >
                            Net {netFlowPositive ? "Inflow" : "Outflow"} {data.cashFlow.net}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Cash & Bank + Debts */}
            <View className="flex-row gap-4">
                {/* Cash & Bank Card */}
                <View
                    className="flex-1 rounded-2xl p-4 border"
                    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                    <View className="flex-row items-center gap-2.5 mb-3">
                        <View
                            className="w-9 h-9 rounded-full items-center justify-center"
                            style={{ backgroundColor: `${colors.primary}0F` }}
                        >
                            <Ionicons
                                name="wallet-outline"
                                size={16}
                                color={colors.textPrimary}
                            />
                        </View>
                        <Text
                            className="text-base font-bold"
                            style={{ color: colors.textPrimary }}
                        >
                            Cash & Bank
                        </Text>
                    </View>
                    <Text
                        className="text-3xl font-bold"
                        style={{ color: colors.textPrimary }}
                    >
                        {data.cashBank}
                    </Text>
                    <Text
                        className="text-xs mt-2"
                        style={{ color: colors.textSecondary }}
                    >
                        Liquid balance
                    </Text>
                </View>

                {/* Debts Card */}
                <View
                    className="flex-1 rounded-2xl p-4 border"
                    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                    <View className="flex-row items-center gap-2.5 mb-3">
                        <View
                            className="w-9 h-9 rounded-full items-center justify-center"
                            style={{ backgroundColor: `${colors.primary}0F` }}
                        >
                            <Ionicons
                                name="wallet-outline"
                                size={16}
                                color={colors.textPrimary}
                            />
                        </View>
                        <Text
                            className="text-base font-bold"
                            style={{ color: colors.textPrimary }}
                        >
                            Debt
                        </Text>
                    </View>
                    <Text
                        className="text-3xl font-bold"
                        style={{ color: colors.textPrimary }}
                    >
                        {data.debts.payables}
                    </Text>
                    <Text
                        className="text-xs mt-2"
                        style={{ color: colors.textSecondary }}
                    >
                        Payable
                    </Text>
                </View>
            </View>

            {/* Stock Card */}
            <View
                className="rounded-2xl p-4 border"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
                <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-row items-center gap-2.5 flex-1">
                        <View
                            className="w-10 h-10 rounded-full items-center justify-center"
                            style={{ backgroundColor: `${colors.primary}1A` }}
                        >
                            <Ionicons
                                name="cube-outline"
                                size={18}
                                color={colors.primary}
                            />
                        </View>
                        <Text
                            className="text-base font-bold"
                            style={{ color: colors.textPrimary }}
                        >
                            Stock
                        </Text>
                    </View>
                    <View
                        className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: `${colors.primary}1A` }}
                    >
                        <Ionicons
                            name="calendar-outline"
                            size={12}
                            color={colors.textPrimary}
                        />
                        <Text
                            className="text-[10px] font-semibold"
                            style={{ color: colors.textPrimary }}
                        >
                            {data.stock.daysOfSupply} days of supply
                        </Text>
                    </View>
                </View>

                <View>
                    <Text
                        className="text-3xl font-bold"
                        style={{ color: colors.textPrimary }}
                    >
                        {data.stock.value}
                    </Text>
                    <Text
                        className="text-xs mt-2"
                        style={{ color: colors.textSecondary }}
                    >
                        On-hand inventory
                    </Text>

                    {data.stock.criticalItems.length > 0 && (
                        <View className="flex-row flex-wrap gap-2 mt-3">
                            {data.stock.criticalItems.map((item) => (
                                <View
                                    key={item}
                                    className="flex-row items-center gap-1.5 px-2.5 py-1.5 rounded-full"
                                    style={{ backgroundColor: colors.border }}
                                >
                                    <Ionicons
                                        name="alert-circle-outline"
                                        size={12}
                                        color={colors.textPrimary}
                                    />
                                    <Text
                                        className="text-[10px] font-semibold"
                                        style={{ color: colors.textPrimary }}
                                    >
                                        {item}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            <View
                className="rounded-2xl p-4 border"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
                <View className="flex-row items-center gap-2.5 mb-3">
                    <View
                        className="w-9 h-9 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${colors.primary}0F` }}
                    >
                        <Ionicons
                            name="warning-outline"
                            size={16}
                            color={colors.textPrimary}
                        />
                    </View>
                    <Text
                        className="text-base font-bold"
                        style={{ color: colors.textPrimary }}
                    >
                        Alerts
                    </Text>
                </View>
                <View className="gap-2">
                    {data.alerts.map((alert: string, index) => (
                        <View
                            key={index}
                            className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full"
                        >
                            <Ionicons
                                name="chevron-forward"
                                size={12}
                                color={colors.textPrimary}
                            />
                            <Text
                                className="text-xs font-semibold"
                                style={{ color: colors.textPrimary }}
                            >
                                {alert}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}