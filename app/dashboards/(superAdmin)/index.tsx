import Loading from '@/components/common/loading';
import { defaultUsers } from '@/data/usersData';
import { useRoleGuard } from '@/hooks/roleGuard';
import { useLogout } from '@/hooks/useLogout';
import { useUserManagement } from '@/hooks/useUserManagement';
import { useTheme } from '@/theme/themeContext';
import { User } from '@/types/userManagement';
import { formatFullDate } from '@/utils/dateFormatter';
import { getUserRoleOverrides } from '@/utils/userRoleOverrides';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuperAdminDashboard() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const isChecking = useRoleGuard(['Super Admin']);
  const { handleLogout, showModal, handleConfirm, handleCancel, isLoggingOut, LogoutModal } = useLogout();
  const { searchQuery, setSearchQuery, getRoleColor, getRoleIcon, getRoleDescription } = useUserManagement();
  const [users, setUsers] = useState<User[]>([]);
  const isSuperAdmin = true;

  useEffect(() => {
    const loadUsers = async () => {
      const overrides = await getUserRoleOverrides();
      setUsers(defaultUsers.map((u) => (overrides[u.id] ? { ...u, role: overrides[u.id] } : u)));
    };

    loadUsers();
  }, []);

  if (isChecking) {
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

    router.push(`/dashboards/(superAdmin)/assign-role?userId=${id}`);
  };

  const handleDelete = (id: string) => {
    if (!isSuperAdmin) {
      Alert.alert('Unauthorized', 'Only Super Admin can delete users');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
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

  const UserCard = ({ user }: { user: User }) => (
    
    <View
      className="rounded-2xl p-4 mb-3 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        shadowColor: colors.primary,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="relative mr-3">
            <Ionicons
              name="person-circle"
              size={52}
              color={user.status === 'active' ? colors.primary : colors.textSecondary}
            />
            {user.status === 'active' && (
              <View
                className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2"
                style={{ backgroundColor: '#1E8E3E', borderColor: colors.surface }}
              />
            )}
          </View>

          <View className="flex-1">
            <Text className="text-base font-bold mb-0.5"
              style={{ color: colors.textPrimary }}>
              {user.name}
            </Text>
            <Text className="text-sm mb-2"
              style={{ color: colors.textSecondary }}>
              {user.email}
            </Text>
            <View className="flex-row items-center gap-2">
              <View
                className="flex-row items-center gap-1 px-2 py-1 rounded-full"
                style={{ backgroundColor: `${getRoleColor(user.role, colors)}15` }}
              >
                <Ionicons
                  name={getRoleIcon(user.role) as any}
                  size={11}
                  color={getRoleColor(user.role, colors)}
                />
                <Text className="text-xs font-bold capitalize"
                  style={{ color: getRoleColor(user.role, colors) }}>
                  {user.role === 'superAdmin'
                    ? 'Super Admin'
                    : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Text>
              </View>
              <Text className="text-xs"
                style={{ color: colors.textSecondary }}>
                • Joined {user.joinDate}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2 ml-2">
          <TouchableOpacity
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: colors.background }}
            activeOpacity={0.7}
            onPress={() => handleEdit(user.id)}
          >
            <Ionicons name="create-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: colors.background }}
            activeOpacity={0.7}
          >
            <Ionicons name="ellipsis-vertical" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
          onPress={() => router.push('/dashboards/notification')}

        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4 mb-8"
        showsVerticalScrollIndicator={false}>

        <View className="mb-4">
          <View
            className="flex-row items-center px-4 py-3 rounded-2xl border"
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
          onPress={() => router.push('/dashboards/(superAdmin)/add-user')}
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
            Team Members ({users.length})
          </Text>
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
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
    </SafeAreaView>
  );
}
