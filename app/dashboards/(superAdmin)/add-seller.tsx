import Loading from "@/components/common/loading";
import SellerForm from "@/components/forms/SellerForm";
import CustomHeader from "@/components/ui/CustomHeader";
import { useRoleGuard } from "@/hooks/roleGuard";
import { createSellerUser } from "@/services/userService";
import { useTheme } from "@/theme/themeContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddSellerScreen() {
  const { colors } = useTheme();
  const isChecking = useRoleGuard(["Super Admin"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/dashboards/(superAdmin)");
  };

  if (isChecking) return <Loading message="Loading..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Add Seller" onBackPress={handleBack} />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-2">
          <SellerForm
            isSubmitting={isSubmitting}
            onSubmit={async (data) => {
              try {
                setIsSubmitting(true);
                await createSellerUser(data);
                Alert.alert("Success", "Seller created successfully");
                router.replace("/dashboards/(superAdmin)");
              } catch (err: any) {
                Alert.alert("Failed", err?.message || "Could not create seller");
              } finally {
                setIsSubmitting(false);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
