import Loading from "@/components/common/loading";
import LiveMarketCategory from "@/components/market/MarketCategory";
import CustomButton from "@/components/ui/CustomButton";
import { useTheme } from "@/theme";
import { getAuth } from "@/utils/auth";
import { formatFullDate } from "@/utils/dateFormatter";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingPage() {
  // return <Redirect href="./dashboards/(producer)" />;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await getAuth();
      const token = auth?.token;
      const saveRole = auth?.roles?.[0] ?? null;

      if (!token || !saveRole ) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setRole(saveRole);
      setIsAuthenticated(true);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading message="Checking your session..." />;
  }

  if (isAuthenticated === false) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const submit = async () => {
    setIsSubmitting(true);

    const auth = await getAuth();
    const token = auth?.token;
    const role = auth?.roles?.[0] ?? null;

    if (!token || !role) {
      router.replace("/(auth)/sign-in");
      setIsSubmitting(false);
      return;
    }

    const roleLower = role.toLowerCase();

    if (roleLower === "producer") {
      router.replace("/dashboards/(producer)");
    } else if (roleLower === "seller") {
      router.replace("/dashboards/(seller)");
    } else if (roleLower === "super admin") {
      router.replace("/");
    } else {
      router.replace("/(auth)/sign-in");
    }
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="flex-1"
      style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        <View className="px-5 py-7 mb-2 border-b"
          style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}>
          <View className="items-center mb-6">
            <View className="w-16 h-16 rounded-full items-center justify-center mb-4"
              style={{
                backgroundColor: colors.primary + '15'

              }}>
              <Ionicons name="trending-up" size={32} color={colors.primary} />
            </View>
            <Text className="text-3xl font-bold text-center mb-1.5"
              style={{ color: colors.textPrimary }}>
              {t('home.title')}
            </Text>
            <Text className="text-base text-center mb-3"
              style={{ color: colors.textSecondary }}>
              {t('home.subtitle')}
            </Text>
            <View className="flex-row items-center gap-1.5 px-3.5 py-1.5 rounded-full border"
              style={{ backgroundColor: colors.background, borderColor: colors.border }}>
              <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
              <Text className="text-xs font-medium"
                style={{ color: colors.textSecondary }}>{formatFullDate(new Date())}</Text>
            </View>
          </View>

          <CustomButton
            title={t('home.continue')}
            size="small"
            isLoading={isSubmitting}
            onPress={submit}
          />
        </View>

        <View className="pt-5 px-1 pb-6">
          <View className="mb-4">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="grid-outline" size={20} color={colors.primary} />
              <Text className="text-xl font-bold"
                style={{ color: colors.textPrimary }}>
                {t('home.categoriesTitle')}
              </Text>
            </View>
            <Text className="text-sm ml-7"
              style={{ color: colors.textSecondary }}>
              {t('home.categoriesSubtitle')}
            </Text>
          </View>

          <LiveMarketCategory />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
