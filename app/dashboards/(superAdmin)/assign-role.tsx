import Loading from "@/components/common/loading";
import CustomButton from "@/components/ui/CustomButton";
import CustomHeader from "@/components/ui/CustomHeader";
import { defaultUsers } from "@/data/usersData";
import { useRoleGuard } from "@/hooks/roleGuard";
import { useTheme } from "@/theme/themeContext";
import type { UserRole } from "@/types/userManagement";
import { setUserRoleOverride } from "@/utils/userRoleOverrides";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ROLE_OPTIONS: Array<{ role: UserRole; label: string; icon: any }> = [
  { role: "superAdmin", label: "Super Admin", icon: "shield-checkmark-outline" },
  { role: "producer", label: "Producer", icon: "leaf-outline" },
  { role: "seller", label: "Seller", icon: "storefront-outline" },
];

export default function AssignRoleScreen() {
  const { colors } = useTheme();
  const isChecking = useRoleGuard(["Super Admin"]);
  const { userId } = useLocalSearchParams<{ userId?: string }>();

  const selectedUser = useMemo(
    () => defaultUsers.find((u) => u.id === userId),
    [userId]
  );

  const [role, setRole] = useState<UserRole>(selectedUser?.role ?? "seller");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) return router.back();
    router.replace("/dashboards/(superAdmin)");
  };

  if (isChecking) return <Loading message="Loading..." />;

  if (!selectedUser) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <CustomHeader title="Assign Role" onBackPress={handleBack} />
        <View className="px-4 pt-6">
          <Text style={{ color: colors.textPrimary }} className="text-base font-semibold">
            User not found
          </Text>
          <Text style={{ color: colors.textSecondary }} className="text-sm mt-2">
            Go back and choose a user from the list.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Assign Role" onBackPress={handleBack} />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="rounded-3xl p-5 mb-4 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Text className="text-xs" style={{ color: colors.textSecondary }}>
            User
          </Text>
          <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
            {selectedUser.name}
          </Text>
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            {selectedUser.email}
          </Text>
        </View>

        <View
          className="rounded-3xl p-5 mb-4 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
            Select role
          </Text>
          <Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            This is a frontend-only assignment for now.
          </Text>

          <View className="mt-4 gap-2">
            {ROLE_OPTIONS.map((opt) => {
              const selected = role === opt.role;
              return (
                <TouchableOpacity
                  key={opt.role}
                  activeOpacity={0.85}
                  disabled={isSubmitting}
                  onPress={() => setRole(opt.role)}
                  className="rounded-2xl border px-4 py-3 flex-row items-center justify-between"
                  style={{
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? `${colors.primary}15` : colors.background,
                  }}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name={opt.icon}
                      size={18}
                      color={selected ? colors.primary : colors.textSecondary}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: selected ? colors.textPrimary : colors.textSecondary }}
                    >
                      {opt.label}
                    </Text>
                  </View>

                  <Ionicons
                    name={selected ? "radio-button-on" : "radio-button-off"}
                    size={18}
                    color={selected ? colors.primary : colors.border}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <CustomButton
          title={isSubmitting ? "Saving..." : "Save Role"}
          isLoading={isSubmitting}
          onPress={async () => {
            try {
              setIsSubmitting(true);
              await setUserRoleOverride(selectedUser.id, role);
              Alert.alert("Success", "Role updated");
              router.replace("/dashboards/(superAdmin)");
            } catch (err: any) {
              Alert.alert("Failed", err?.message || "Could not update role");
            } finally {
              setIsSubmitting(false);
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
