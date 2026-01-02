import CustomHeader from "@/components/ui/CustomHeader";
import { useTheme } from "@/theme/themeContext";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SellerPayouts() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Payouts" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
          Payouts
        </Text>
        <Text className="mt-2 text-sm text-center" style={{ color: colors.textSecondary }}>
          Connect this to your payout history or settlements.
        </Text>
      </View>
    </SafeAreaView>
  );
}
