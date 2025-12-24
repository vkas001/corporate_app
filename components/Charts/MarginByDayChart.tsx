import { MARGIN_BY_DAY_DATA } from "@/data/producer/dashboardChartData";
import { useTheme } from "@/theme";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function MarginByDayChart() {
  const { colors } = useTheme(); 

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 18,
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: colors.textPrimary,
          }}
        >
          Margin % by day
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            marginTop: 2,
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
