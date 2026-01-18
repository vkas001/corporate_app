import Loading from "@/components/common/loading";
import ProducerForm from "@/components/forms/ProducerForm";
import SellerForm from "@/components/forms/SellerForm";
import CustomHeader from "@/components/ui/CustomHeader";
import { useRoleGuard } from "@/hooks/roleGuard";
import { createProducerUser, createSellerUser } from "@/services/userService";
import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserType = "PRODUCER" | "SELLER";

export default function AddUserScreen() {
  const { colors } = useTheme();
  const isChecking = useRoleGuard(["Super Admin"]);
  const [userType, setUserType] = useState<UserType>("PRODUCER");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) return router.back();
    router.replace("/dashboards/(superAdmin)");
  };

  if (isChecking) return <Loading message="Loading..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Add User" onBackPress={handleBack} />

      <View
        className="mx-4 mt-4 rounded-3xl border p-4"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
          Select role
        </Text>
        <Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
          Choose which type of user you want to create.
        </Text>

        <View
          className="mt-3 flex-row rounded-2xl border overflow-hidden"
          style={{ borderColor: colors.border, backgroundColor: colors.background }}
        >
          {(["PRODUCER", "SELLER"] as const).map((type) => {
            const selected = userType === type;
            const label = type === "PRODUCER" ? "Producer" : "Seller";
            const icon = type === "PRODUCER" ? "leaf-outline" : "storefront-outline";

            return (
              <TouchableOpacity
                key={type}
                className="flex-1 py-3"
                style={{ backgroundColor: selected ? colors.primary : "transparent" }}
                onPress={() => setUserType(type)}
                activeOpacity={0.85}
                disabled={isSubmitting}
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons
                    name={icon}
                    size={18}
                    color={selected ? colors.surface : colors.textPrimary}
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    className="font-semibold"
                    style={{ color: selected ? colors.surface : colors.textPrimary }}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
      >
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {userType === "PRODUCER" ? (
            <ProducerForm
              isSubmitting={isSubmitting}
              onSubmit={async (data) => {
                try {
                  setIsSubmitting(true);
                  await createProducerUser(data);
                  Alert.alert("Success", "Producer created successfully");
                  router.replace("/dashboards/(superAdmin)");
                } catch (err: any) {
                  Alert.alert("Failed", err?.message || "Could not create producer");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            />
          ) : (
            <SellerForm
              isSubmitting={isSubmitting}
              onSubmit={async (data) => {
                try {
                  setIsSubmitting(true);
                  await createSellerUser(data);
                  Alert.alert("Success", "Seller created successfully");
                  router.replace("/dashboards/(superAdmin)");
                } catch (err: any) {
                  const statusSuffix = __DEV__ && err?.status ? ` (HTTP ${err.status})` : "";
                  const debugSuffix =
                    __DEV__ && err?.data
                      ? `\n\nDebug: ${typeof err.data === "string" ? err.data.slice(0, 200) : JSON.stringify(err.data).slice(0, 200)}`
                      : "";
                  Alert.alert(
                    "Failed",
                    `${err?.message || "Could not create seller"}${statusSuffix}${debugSuffix}`
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
