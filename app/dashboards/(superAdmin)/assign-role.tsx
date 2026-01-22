import Loading from "@/components/common/loading";
import CustomButton from "@/components/ui/CustomButton";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomInput from "@/components/ui/CustomInput";
import { useRoleGuard } from "@/hooks/roleGuard";
import { getUserById, updateUserById } from "@/services/userService";
import { useTheme } from "@/theme/themeContext";
import type { UserRole } from "@/types/userManagement";
import { getAuth, setAuthUserRole, updateAuthUser } from "@/utils/auth";
import { getUserRoleOverrides, setUserRoleOverride } from "@/utils/userRoleOverrides";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ROLE_OPTIONS: Array<{ role: UserRole; label: string; icon: any }> = [
  { role: "superAdmin", label: "Super Admin", icon: "shield-checkmark-outline" },
  { role: "admin", label: "Admin", icon: "shield-outline" },
  { role: "producer", label: "Producer", icon: "leaf-outline" },
  { role: "seller", label: "Seller", icon: "storefront-outline" },
];

const SUPER_ADMIN_HOME = "/dashboards/(superAdmin)" as const;

const roleToDashboardRoute = (role: UserRole) => {
  if (role === "superAdmin") return "/dashboards/(superAdmin)";
  if (role === "admin") return "/dashboards/(admin)";
  if (role === "producer") return "/dashboards/(producer)";
  return "/dashboards/(seller)";
};

export default function AssignRoleScreen() {
  const { colors } = useTheme();
  const isChecking = useRoleGuard(["Super Admin"]);
  const { userId, returnTo } = useLocalSearchParams<{ userId?: string; returnTo?: string }>();

  const resolvedReturnTo = (() => {
    if (!returnTo) return null;
    const raw = String(returnTo);
    let decoded = raw;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      // keep raw
    }

    if (decoded === SUPER_ADMIN_HOME) return SUPER_ADMIN_HOME;
    return null;
  })();

  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [role, setRole] = useState<UserRole>("seller");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!userId) {
        setIsLoadingUser(false);
        return;
      }

      try {
        setIsLoadingUser(true);
        const overrides = await getUserRoleOverrides();
        const apiUser = await getUserById(String(userId));

        if (cancelled) return;

        const id = String(apiUser.id);
        setUser({ id, name: apiUser.name ?? "Unknown", email: apiUser.email ?? "—" });
        setForm({
          name: (apiUser.name ?? "") as string,
          email: (apiUser.email ?? "") as string,
          phone: (apiUser.phone ?? "") as string,
          address: (apiUser.address ?? "") as string,
        });
        setRole(overrides[id] ?? (apiUser.role as UserRole) ?? "seller");
      } catch (err: any) {
        if (!cancelled) {
          setUser(null);
          Alert.alert("Failed", err?.message || "Could not load user");
        }
      } finally {
        if (!cancelled) setIsLoadingUser(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleBack = () => {
    if (resolvedReturnTo) {
      router.replace(resolvedReturnTo);
      return;
    }

    if (router.canGoBack()) return router.back();
    router.replace("/dashboards/(superAdmin)");
  };

  if (isChecking || isLoadingUser) return <Loading message="Loading..." />;

  if (!user) {
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

  const validateUserInfo = () => {
    const next: Record<string, string | undefined> = {};

    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) next.email = "Enter a valid email";
    }

    setErrors(next);
    return Object.values(next).every((v) => !v);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Assign Role" onBackPress={handleBack} />

      <ScrollView
        className="flex-1 px-4 mb-12"
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
            {user.name}
          </Text>
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            {user.email}
          </Text>
        </View>

        <View
          className="rounded-3xl p-5 mb-4 border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
            Update user info
          </Text>
          <Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            Update name, email, phone, or address.
          </Text>

          <CustomInput
            label="Name"
            placeholder="Full name"
            value={form.name}
            onChangeText={(text) => {
              setForm((p) => ({ ...p, name: text }));
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            icon="person-outline"
            error={errors.name}
            editable={!isUpdatingUser && !isSubmitting}
          />

          <CustomInput
            label="Email"
            placeholder="user@company.com"
            value={form.email}
            onChangeText={(text) => {
              setForm((p) => ({ ...p, email: text }));
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            error={errors.email}
            editable={!isUpdatingUser && !isSubmitting}
          />

          <CustomInput
            label="Phone"
            placeholder="98XXXXXXXX"
            value={form.phone}
            onChangeText={(text) => setForm((p) => ({ ...p, phone: text }))}
            keyboardType="phone-pad"
            icon="call-outline"
            editable={!isUpdatingUser && !isSubmitting}
          />

          <CustomInput
            label="Address"
            placeholder="Address"
            value={form.address}
            onChangeText={(text) => setForm((p) => ({ ...p, address: text }))}
            icon="location-outline"
            editable={!isUpdatingUser && !isSubmitting}
          />

          <View className="mt-6">
            <CustomButton
              title={isUpdatingUser ? "Updating..." : "Update Info"}
              isLoading={isUpdatingUser}
              onPress={async () => {
                if (!validateUserInfo()) return;

                try {
                  setIsUpdatingUser(true);
                  const updated = await updateUserById(user.id, {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim() || undefined,
                    address: form.address.trim() || undefined,
                  });

                  setUser({
                    id: String(updated.id),
                    name: updated.name ?? "Unknown",
                    email: updated.email ?? "—",
                  });

                  // If the Super Admin updated the currently logged-in user, update local auth too
                  try {
                    const auth = await getAuth();
                    const currentId = auth?.user?.id != null ? String(auth.user.id) : null;
                    if (currentId && currentId === String(updated.id)) {
                      await updateAuthUser({
                        name: updated.name ?? null,
                        email: updated.email,
                        phone: updated.phone ?? null,
                        address: updated.address ?? null,
                      });
                    }
                  } catch {
                    // ignore local sync failures
                  }

                  Alert.alert("Success", "User info updated");
                } catch (err: any) {
                  const statusSuffix = __DEV__ && err?.status ? ` (HTTP ${err.status})` : "";
                  Alert.alert(
                    "Failed",
                    `${err?.message || "Could not update user"}${statusSuffix}`
                  );
                } finally {
                  setIsUpdatingUser(false);
                }
              }}
            />
          </View>
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
          title={isSubmitting ? "Assigning..." : "Assign Role"}
          isLoading={isSubmitting}
          onPress={async () => {
            try {
              setIsSubmitting(true);
              await setUserRoleOverride(user.id, role);
              Alert.alert("Success", "Role updated");

              // If the updated user is the currently logged in user, update auth role and redirect
              try {
                const auth = await getAuth();
                const currentId = auth?.user?.id != null ? String(auth.user.id) : null;
                if (currentId && currentId === String(user.id)) {
                  await setAuthUserRole(role as any);
                  router.replace(roleToDashboardRoute(role));
                  return;
                }
              } catch {
                // ignore local sync failures
              }

              router.replace(resolvedReturnTo ?? SUPER_ADMIN_HOME);
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
