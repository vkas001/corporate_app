import Loading from '@/components/common/loading';
import UserCard from '@/components/users/UserCard';
import { useRoleGuard } from '@/hooks/roleGuard';
import { useLogout } from '@/hooks/useLogout';
import { useUser } from '@/hooks/useUser';
import { useUserManagement } from '@/hooks/useUserManagement';
import { deleteUserById, getUsers } from '@/services/userService';
import { useTheme } from '@/theme/themeContext';
import { User } from '@/types/userManagement';
import { formatFullDate } from '@/utils/dateFormatter';
import { getUserRoleOverrides } from '@/utils/userRoleOverrides';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SuperAdminDashboard() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const isChecking = useRoleGuard(['Super Admin']);
  const { handleLogout, showModal, handleConfirm, handleCancel, isLoggingOut, LogoutModal } = useLogout();
  const { searchQuery, setSearchQuery, getRoleColor, getRoleIcon, getRoleDescription } = useUserManagement();
  const { user: currentUser } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSuperAdmin = true;

  const currentUserId = currentUser?.id != null ? String(currentUser.id) : null;

  const toJoinDate = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const loadUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const overrides = await getUserRoleOverrides();
      const apiUsers = await getUsers();

      const mapped: User[] = apiUsers.map((u: any) => {
        const id = String(u.id);
        const baseRole = (u.role ?? 'seller') as any;
        const overriddenRole = overrides[id] ?? baseRole;

        return {
          id,
          name: u.name ?? 'Unknown',
          email: u.email ?? '—',
          role: overriddenRole,
          status: u.status === false ? 'inactive' : 'active',
          joinDate: toJoinDate(u.createdAt),
        };
      });

      setUsers(mapped);
    } catch (e: any) {
      Alert.alert('Failed to load users', e?.message || 'Could not fetch users from API');
      setUsers([]);
    } finally {
      setUsersLoading(false);
      setHasLoadedOnce(true);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3200);
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await loadUsers();
    } finally {
      setRefreshing(false);
    }
  }, [loadUsers]);

  // Only block the whole screen on the very first load.
  // During deletes/refreshes we keep the UI mounted so toast can show.
  if (isChecking || (!hasLoadedOnce && usersLoading)) {
    return <Loading message="Loading..." />;
  }

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/');
  };

  const handleInvite = async () => {
    if (!isSuperAdmin) {
      Alert.alert('Unauthorized', 'Only Super Admin can add users');
      return;
    }
  };

  const handleEdit = (id: string) => {
    if (!isSuperAdmin) {
      Alert.alert('Unauthorized', 'Only Super Admin can edit users');
      return;
    }

    const returnTo = encodeURIComponent('/dashboards/(superAdmin)');
    router.push(`/dashboards/(superAdmin)/assign-role?userId=${id}&returnTo=${returnTo}`);
  };

  const handleDelete = async (id: string) => {
    if (!isSuperAdmin) {
      Alert.alert('Unauthorized', 'Only Super Admin can delete users');
      return;
    }

    try {
      setUsersLoading(true);
      await deleteUserById(id);
      await loadUsers();
      showToast('User deleted successfully');
    } catch (e: any) {
      // Reload anyway to avoid UI drift if backend deleted but response failed
      try {
        await loadUsers();
      } catch {}

      const statusSuffix = __DEV__ && e?.status ? ` (HTTP ${e.status})` : '';
      Alert.alert('Failed', `${e?.message || 'Could not delete user'}${statusSuffix}`);
    }
  };

  const filteredUsers = users.filter(u => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView className="flex-1"
      style={{ backgroundColor: colors.background }}>
      <View className="mb-4 h-[56px] px-[16px] flex-row items-center justify-between"
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
            {t('Super Admin')}</Text>
          <Text className="text-[12px]"
            style={{ color: colors.textSecondary }}
          >
            {formatFullDate(new Date())}</Text>
        </View>

        <TouchableOpacity
          className="w-[40px] h-[40px] rounded-[20px] items-center justify-center"
          onPress={() => router.navigate('/dashboards/notification')}

        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
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
              <TouchableOpacity onPress={() => setSearchQuery('')}>
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
            <Text className="text-2xl font-black mb-0.5"
              style={{ color: colors.textPrimary }}>
              {users.length}
            </Text>
            <Text className="text-xs font-medium"
              style={{ color: colors.textSecondary }}>
              Total Users
            </Text>
          </View>

          <View
            className="flex-1 rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-2"
              style={{ backgroundColor: '#1E8E3E15' }}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#1E8E3E" />
            </View>
            <Text className="text-2xl font-black mb-0.5"
              style={{ color: colors.textPrimary }}>
              {users.filter(u => u.status === 'active').length}
            </Text>
            <Text className="text-xs font-medium"
              style={{ color: colors.textSecondary }}>
              Active
            </Text>
          </View>

          <View
            className="flex-1 rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-2"
              style={{ backgroundColor: '#D1434315' }}
            >
              <Ionicons name="close-circle-outline" size={20} color="#D14343" />
            </View>
            <Text className="text-2xl font-black mb-0.5"
              style={{ color: colors.textPrimary }}>
              {users.filter(u => u.status === 'inactive').length}
            </Text>
            <Text className="text-xs font-medium"
              style={{ color: colors.textSecondary }}>
              Inactive
            </Text>
          </View>
        </View>

        {/* Add User Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl mb-6"
          style={{ backgroundColor: colors.primary }}
          activeOpacity={0.8}
          onPress={() => router.navigate('/dashboards/(superAdmin)/add-user')}
        >
          <Ionicons name="add-circle" size={18} color={colors.surface} />
          <Text className="text-base font-bold"
            style={{ color: colors.surface }}>
            Invite New User
          </Text>
        </TouchableOpacity>

        {/* Users List */}
        <View className="mb-6">
          <Text className="text-base font-bold mb-3"
            style={{ color: colors.textSecondary }}>
            Users ({users.length})
          </Text>
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              currentUserId={currentUserId}
              getRoleColor={getRoleColor}
              getRoleIcon={getRoleIcon}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </View>

        {/* Roles Info */}
        <View className="mb-6">
          <Text className="text-base font-bold mb-3"
            style={{ color: colors.textSecondary }}>
            User Roles
          </Text>
          <View
            className="rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <View className="flex-row items-center mb-4">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold mb-0.5"
                  style={{ color: colors.textPrimary }}>
                  Super Admin
                </Text>
                <Text className="text-xs" style={{ color: colors.textSecondary }}>
                  {getRoleDescription('superAdmin')}
                </Text>
              </View>
            </View>

            <View className="h-px mb-4"
              style={{ backgroundColor: colors.border }} />

            <View className="flex-row items-center mb-4">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: '#2F855A15' }}
              >
                <Ionicons name="leaf-outline" size={20} color="#2F855A" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold mb-0.5"
                  style={{ color: colors.textPrimary }}>
                  Producer
                </Text>
                <Text className="text-xs"
                  style={{ color: colors.textSecondary }}>
                  {getRoleDescription('producer')}
                </Text>
              </View>
            </View>

            <View className="h-px mb-4"
              style={{ backgroundColor: colors.border }} />

            <View className="flex-row items-center">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: '#2B6CB015' }}
              >
                <Ionicons name="storefront-outline" size={20} color="#2B6CB0" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold mb-0.5"
                  style={{ color: colors.textPrimary }}>
                  Seller
                </Text>
                <Text className="text-xs"
                  style={{ color: colors.textSecondary }}>
                  {getRoleDescription('seller')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {isSuperAdmin && (
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl mb-10"
            style={{ backgroundColor: colors.primaryDark, borderColor: colors.border, borderWidth: 1 }}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={18} color={colors.textPrimary} />
            <Text className="text-base font-bold"
              style={{ color: colors.textPrimary }}>
              Log Out
            </Text>
          </TouchableOpacity>
        )}
        <LogoutModal
          visible={showModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isLoading={isLoggingOut}
        />
      </ScrollView>

      {toastMessage ? (
        <View
          pointerEvents="none"
          // Keep it above bottom tab bar / safe-area
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            // CustomTabLayout default tab bar height is 70
            bottom: insets.bottom + 70 + 10,
            zIndex: 9999,
            elevation: 9999,
          }}
        >
          <View
            className="rounded-2xl border px-4 py-3 flex-row items-center"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <View
              className="w-9 h-9 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: '#22C55E15' }}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" />
            </View>
            <Text className="flex-1 text-sm font-semibold" style={{ color: colors.textPrimary }}>
              {toastMessage}
            </Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
