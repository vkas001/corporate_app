import { useUser } from '@/hooks/useUser';
import { useUserManagement } from '@/hooks/useUserManagement';
import { getUsers } from '@/services/userService';
import { useTheme } from '@/theme/themeContext';
import { User } from '@/types/userManagement';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  onClose: () => void;
};

export default function UserManagementScreen({ onClose }: Props) {
  const { colors } = useTheme();
  const { searchQuery, setSearchQuery, getRoleColor, getRoleIcon, getRoleDescription } = useUserManagement();
  const { user: currentUser } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const currentUserId = currentUser?.id != null ? String(currentUser.id) : null;

  const toJoinDate = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoadingUsers(true);
        const apiUsers = await getUsers();

        const mapped: User[] = apiUsers.map((u: any) => ({
          id: String(u.id),
          name: u.name ?? 'Unknown',
          email: u.email ?? '—',
          role: (u.role ?? 'seller') as any,
          status: u.status === false ? 'inactive' : 'active',
          joinDate: toJoinDate(u.createdAt),
          avatar: u.photo ?? undefined,
        }));

        if (!cancelled) setUsers(mapped);
      } catch {
        if (!cancelled) setUsers([]);
      } finally {
        if (!cancelled) setLoadingUsers(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const UserCard = ({ user }: { user: User }) => {
    const isSignedInUser = !!currentUserId && user.id === currentUserId;

    return (
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
            {isSignedInUser && (
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
                style={{ backgroundColor: colors.accent }}
              >
                <Ionicons
                  name={getRoleIcon(user.role) as any}
                  size={11}
                  color={(user.role)}
                />
                <Text className="text-xs font-bold capitalize"
                  style={{ color: colors.background }}>
                  {user.role}
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
  };

  return (
    <SafeAreaView className="flex-1"
      style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={onClose}
          className="w-10 h-10 rounded-full items-center justify-center border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold"
          style={{ color: colors.textPrimary }}>
          User Management
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView className="px-4 mb-8" showsVerticalScrollIndicator={false}>
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
              4
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
              3
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
              1
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
          {loadingUsers && (
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              Loading users...
            </Text>
          )}
          {users.map(user => (
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
                style={{ backgroundColor: '#8C5E3415' }}
              >
                <Ionicons name="briefcase-outline" size={20} color="#8C5E34" />
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
                style={{ backgroundColor: `${colors.textSecondary}15` }}
              >
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
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
      </ScrollView>
    </SafeAreaView>
  );
}
