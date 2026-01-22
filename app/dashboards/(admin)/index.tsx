import Loading from "@/components/common/loading";
import UserCard from "@/components/users/UserCard";
import { useRoleGuard } from "@/hooks/roleGuard";
import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import { useUserManagement } from "@/hooks/useUserManagement";
import { getUsers } from "@/services/userService";
import { useTheme } from "@/theme/themeContext";
import type { User } from "@/types/userManagement";
import { formatFullDate } from "@/utils/dateFormatter";
import { getUserRoleOverrides } from "@/utils/userRoleOverrides";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminDashboard() {
  const { colors } = useTheme();
  const isChecking = useRoleGuard(["Admin"]);
  const { handleLogout, showModal, handleConfirm, handleCancel, isLoggingOut, LogoutModal } = useLogout();

  const { user: currentUser } = useUser();
  const currentUserId = currentUser?.id != null ? String(currentUser.id) : null;

  const { searchQuery, setSearchQuery, getRoleColor, getRoleIcon } = useUserManagement();

  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const toJoinDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const loadUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const overrides = await getUserRoleOverrides();
      const apiUsers = await getUsers();

      const mapped: User[] = apiUsers.map((u: any) => {
        const id = String(u.id);
        const baseRole = (u.role ?? "seller") as any;
        const overriddenRole = overrides[id] ?? baseRole;

        return {
          id,
          name: u.name ?? "Unknown",
          email: u.email ?? "—",
          role: overriddenRole,
          status: u.status === false ? "inactive" : "active",
          joinDate: toJoinDate(u.createdAt),
        };
      });

      setUsers(mapped);
    } catch (e: any) {
      Alert.alert("Failed to load users", e?.message || "Could not fetch users");
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await loadUsers();
    } finally {
      setRefreshing(false);
    }
  }, [loadUsers]);

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q)
    );
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/");
  };

  if (isChecking || usersLoading) return <Loading message="Loading..." />;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View
        className="mb-4 h-[56px] px-[16px] flex-row items-center justify-between"
        style={{ backgroundColor: colors.surface }}
      >
        <TouchableOpacity
          className="w-[40px] h-[40px] rounded-[20px] items-center justify-center"
          onPress={handleBack}
        >
          <Ionicons name="chevron-back-outline" size={28} color={colors.textPrimary} />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Text className="text-[18px] font-[600]" style={{ color: colors.textPrimary }}>
            Admin
          </Text>
          <Text className="text-[12px]" style={{ color: colors.textSecondary }}>
            {formatFullDate(new Date())}
          </Text>
        </View>

        <View className="w-[40px] h-[40px]" />
      </View>

      <ScrollView
        className="px-4 mb-8"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <View className="mb-4">
          <View
            className="flex-row items-center px-4 rounded-2xl border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder="Search users..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ color: colors.textPrimary }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Summary Stats */}
        <View className="flex-row gap-3 mb-4">
          <View
            className="flex-1 rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-2"
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <Ionicons name="people-outline" size={20} color={colors.primary} />
            </View>
            <Text className="text-2xl font-black mb-0.5" style={{ color: colors.textPrimary }}>
              {users.length}
            </Text>
            <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>
              Total Users
            </Text>
          </View>

          <View
            className="flex-1 rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-2"
              style={{ backgroundColor: "#1E8E3E15" }}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#1E8E3E" />
            </View>
            <Text className="text-2xl font-black mb-0.5" style={{ color: colors.textPrimary }}>
              {users.filter((u) => u.status === "active").length}
            </Text>
            <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>
              Active
            </Text>
          </View>

          <View
            className="flex-1 rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-2"
              style={{ backgroundColor: "#D1434315" }}
            >
              <Ionicons name="close-circle-outline" size={20} color="#D14343" />
            </View>
            <Text className="text-2xl font-black mb-0.5" style={{ color: colors.textPrimary }}>
              {users.filter((u) => u.status === "inactive").length}
            </Text>
            <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>
              Inactive
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-base font-bold mb-3" style={{ color: colors.textSecondary }}>
            Users ({filteredUsers.length})
          </Text>

          {filteredUsers.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              currentUserId={currentUserId}
              getRoleColor={getRoleColor}
              getRoleIcon={getRoleIcon}
            />
          ))}
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl mb-10"
          style={{ backgroundColor: colors.primaryDark, borderColor: colors.border, borderWidth: 1 }}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.textPrimary} />
          <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
            Log Out
          </Text>
        </TouchableOpacity>

        <LogoutModal
          visible={showModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isLoading={isLoggingOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
