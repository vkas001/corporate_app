import { MARGIN_BY_DAY_DATA } from "@/data/dashboardChartData";
import { useTheme } from "@/theme";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function MarginByDayChart() {
  const { colors } = useTheme(); 

  return (
    <View
      className="mt-5 rounded-[18px] border p-4"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <View style={{ marginBottom: 12 }}>
        <Text
          className="text-[15] font-semibold"
          style={{
            color: colors.textPrimary,
          }}
        >
          Margin % by day
        </Text>
        <Text
          className="mt-[2px] text-xs"
          style={{
            color: colors.textSecondary,
          }}
        >
          Weekly performance
        </Text>
      </View>

      <BarChart
        data={{
          labels: MARGIN_BY_DAY_DATA.labels,
          datasets: [{ data: MARGIN_BY_DAY_DATA.values }],
        }}
        width={screenWidth - 72}
        height={220}
        fromZero
        withInnerLines={false}
        yAxisLabel=""
        yAxisSuffix="%"
        chartConfig={{
          backgroundGradientFrom: colors.surface,
          backgroundGradientTo: colors.surface,
          decimalPlaces: 0,

          color: () => colors.primary,

          labelColor: () => colors.textSecondary,

          propsForBackgroundLines: {
            strokeWidth: 0,
          },

          fillShadowGradientFrom: colors.chart.primary.from,
          fillShadowGradientTo: colors.chart.primary.to,
          fillShadowGradientOpacity: 1,

          barPercentage: 0.55,
        }}
        style={{
          borderRadius: 14,
        }}
        showValuesOnTopOfBars
      />
    </View>
  );
}
