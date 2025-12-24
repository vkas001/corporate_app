import LanguageToggle from "@/components/Buttons/LanguageToggle";
import MarginByDayChart from "@/components/Charts/MarginByDayChart";
import FinanceOverview from "@/components/Finance/FinanceOverview";
import { DASHBOARD_DATA } from "@/data/producer/dashboardData";
import { Period } from "@/types/dashboard";
import { formatFullDate } from "@/utils/dateFormatter";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDashboardStyles } from "../../../style/producer/dashboardStyleSheet";
import { useTheme } from "../../../theme";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";

export default function SellerDashboard() {
  const { colors } = useTheme();
  const styles = createDashboardStyles(colors);

  const [period, setPeriod] = React.useState<"Today" | "Week" | "Month">("Today");

  const dashboardData = DASHBOARD_DATA[period.toLowerCase() as Period];

  const [selectedCategory, setSelectedCategory] = useState('Chicken');
  const [open, setOpen] = useState(false);

  return <SafeAreaView
    style={styles.container}
  >
    <View style={styles.headerContainer}>

      <TouchableOpacity style={styles.iconBtn}>
        <Ionicons
          name="person-circle"
          size={28}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Seller Dashboard</Text>
        <Text style={styles.headerDate}>{formatFullDate(new Date())}</Text>
      </View>

      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => {}}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>

    <ScrollView
      contentContainerStyle={styles.scrollContainer}
    >
      <LanguageToggle />

      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.primaryAction}
          onPress={() =>{}}
        >
          <Ionicons name="egg-outline" size={20} color={colors.textPrimary} />
          <Text style={styles.primaryActionText}>
            Add Today’s Sales
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryAction}
          onPress={() =>{}}
        >
          <Ionicons name="time-outline" size={18} color={colors.textPrimary} />
          <Text style={styles.secondaryActionText}>
            View Sales History
          </Text>
        </TouchableOpacity>
      </View>

      <DashboardOverview
        title="Overview"
        dropdownLabel={selectedCategory}
        categories={['Chicken', 'Eggs', 'Medicine']}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          setOpen(false);
        }}
        dropdownOpen={open}
        onDropdownPress={() => setOpen(!open)}
        period={period}
        onPeriodChange={setPeriod}
        stats={[
          {
            label: 'Revenue',
            value: dashboardData.revenue.value,
            change: `${dashboardData.revenue.change} vs last week`,
            trend: 'up',
          },
          {
            label: 'Orders',
            value: dashboardData.orders.value,
            subText: `AOV ${dashboardData.orders.aov}`,
          },
          {
            label: 'Net Profit',
            value: dashboardData.netProfit.value,
            subText: `Margin ${dashboardData.netProfit.margin}`,
          },
          {
            label: 'Operating Profit',
            value: dashboardData.operatingProfit.value,
          },
        ]}
      />
      
      <MarginByDayChart />
      <View style={{
        marginTop: 24,
        marginBottom: 48,
      }}>
        <FinanceOverview data={dashboardData.financeOverview} />
      </View>
    </ScrollView>
  </SafeAreaView>;
}
