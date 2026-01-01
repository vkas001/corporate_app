import MarginByDayChart from "@/components/charts/MarginByDayChart";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import FinanceOverview from "@/components/dashboard/FinanceOverview";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { DASHBOARD_DATA } from "@/data/dashboardData";
import { Period } from "@/types/dashboard";
import { formatFullDate } from "@/utils/dateFormatter";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../theme";

export default function SellerDashboard() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [period, setPeriod] = React.useState<"Today" | "Week" | "Month">("Today");

  const dashboardData = DASHBOARD_DATA[period.toLowerCase() as Period];

  const [selectedCategory, setSelectedCategory] = useState('Chicken');
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/');
  };

  return <SafeAreaView
    className="flex-1 mb-8"
    style={{ backgroundColor: colors.background }}
  >
    <View className="h-[56px] px-[16px] flex-row items-center justify-between"
      style={{ backgroundColor: colors.surface }}
    >

      <TouchableOpacity
        className="w-[40px] h-[40px] rounded-[20px] items-center justify-center"
        onPress={handleBack}
      >
        <Ionicons
          name="chevron-back-outline"
          size={28}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Text className="text-[18px] font-[600] ml-[3px]"
          style={{ color: colors.textPrimary }}
        >
          {t('dashboard.sellerTitle')}</Text>
        <Text className="text-[12px]"
          style={{ color: colors.textSecondary }}
        >
          {formatFullDate(new Date())}</Text>
      </View>

      <TouchableOpacity
        className="w-[40px] h-[40px] rounded-[20px] items-center justify-center"
        onPress={() => router.push('/dashboards/notification')}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>

    <ScrollView
      className="px-5 pt-2.5 pb-10"
      
    >
      <LanguageToggle />

      <View className="my-[16px] gap-[12px]">
        <TouchableOpacity
          className="p-[16px] rounded-[14px] flex-row items-center gap-[10px]"
          style={{ backgroundColor: colors.primaryDark }}
          onPress={() =>
            router.push('./sales/sales-records')
          }
        >
          <Ionicons name="egg-outline" size={20} color={colors.textPrimary} />
          <Text className="text-[16px] font-[600]"
            style={{ color: colors.textPrimary }}
          >
            {t('dashboard.addSales')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-[14px] rounded-[14px] flex-row items-center gap-[8px]"
          style={{ backgroundColor: colors.primaryDark }}
          onPress={() =>
            router.push('./sales/history')
          }
        >
          <Ionicons name="time-outline" size={18} color={colors.textPrimary} />
          <Text className="text-[14px] font-[500] "
            style={{ color: colors.textPrimary }}>
            {t('dashboard.viewSalesHistory')}
          </Text>
        </TouchableOpacity>
      </View>

      <DashboardOverview
        title={t('dashboard.overview')}
        dropdownLabel={t(`dashboard.categories.${selectedCategory.toLowerCase()}`)}
        categories={['Chicken', 'Eggs', 'Feed', 'Medicine']}
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
            label: t('dashboard.stats.revenue'),
            value: dashboardData.revenue.value,
            change: `${dashboardData.revenue.change} ${t('dashboard.stats.vsLastWeek')}`,
            trend: 'up',
          },
          {
            label: t('dashboard.stats.orders'),
            value: dashboardData.orders.value,
            subText: `${t('dashboard.stats.aov')} ${dashboardData.orders.aov}`,
          },
          {
            label: t('dashboard.stats.netProfit'),
            value: dashboardData.netProfit.value,
            subText: `${t('dashboard.stats.margin')} ${dashboardData.netProfit.margin}`,
          },
          {
            label: t('dashboard.stats.operatingProfit'),
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
