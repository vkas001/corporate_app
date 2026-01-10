import ScreenHeader from '@/components/common/ScreenHeader';
import { changePassword } from '@/services/userService';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  onClose: () => void;
};

export default function SettingsScreen({ onClose }: Props) {
  const { colors } = useTheme();

  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    pushNotifications: true,
    twoFactorAuth: false,
    dataCollection: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Change Password modal state
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const openChangePassword = () => {
    setShowChangePassword(true);
  };

  const closeChangePassword = () => {
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangePassword = async () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setSubmitting(true);
      await changePassword(currentPassword, newPassword);
      Alert.alert('Success', 'Password updated successfully');
      closeChangePassword();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Failed to update password';
      Alert.alert('Error', message);
    } finally {
      setSubmitting(false);
    }
  };

  const SettingRow = ({
    icon,
    title,
    subtitle,
    value,
    onToggle,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    value?: boolean;
    onToggle?: () => void;
  }) => (
    <View className="flex-row items-center py-3">
      <View
        className="w-10 h-10 rounded-xl items-center justify-center border mr-3"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <Ionicons name={icon as any} size={20} color={colors.primary} />
      </View>
      <View className="flex-1">
        <Text className="font-semibold"
          style={{ color: colors.textPrimary }}>{title}</Text>
        {subtitle && (
          <Text className="text-xs mt-0.5"
            style={{ color: colors.textSecondary }}>{subtitle}
          </Text>
        )}
      </View>
      {value !== undefined && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.primary, true: colors.primary }}
          thumbColor={colors.primaryDark}
        />
      )}
      {value === undefined && (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1"
      style={{ backgroundColor: colors.background }}>
      <ScreenHeader title="Settings" onBackPress={onClose} />

      <ScrollView className="px-4 mb-8" showsVerticalScrollIndicator={false}>
        <View className="mt-2">
          <Text className="text-base font-bold mb-2"
            style={{ color: colors.textSecondary }}>Notifications
          </Text>
          <View className="rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <SettingRow
              icon="notifications-outline"
              title="All Notifications"
              subtitle="Manage all notifications"
              value={settings.notifications}
              onToggle={() => toggleSetting('notifications')}
            />
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <SettingRow
              icon="mail-outline"
              title="Email Alerts"
              subtitle="Receive important updates via email"
              value={settings.emailAlerts}
              onToggle={() => toggleSetting('emailAlerts')}
            />
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <SettingRow
              icon="phone-portrait-outline"
              title="Push Notifications"
              subtitle="Get notifications on your device"
              value={settings.pushNotifications}
              onToggle={() => toggleSetting('pushNotifications')}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-base font-bold mb-2"
            style={{ color: colors.textSecondary }}>Security</Text>
          <View className="rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <View className="flex-row items-center py-3">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center border mr-3"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="font-semibold"
                  style={{ color: colors.textPrimary }}>Two-Factor Authentication</Text>
                <Text className="text-xs mt-0.5"
                  style={{ color: colors.textSecondary }}>Add an extra layer of security
                </Text>
              </View>
              <Text className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: colors.primary, color: colors.surface }}>
                Coming Soon
              </Text>
            </View>
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/dashboards/(producer)/profile/changePassword')}
            >
              <SettingRow
                icon="key-outline"
                title="Change Password"
                subtitle="Update your password"
              />
            </TouchableOpacity>
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <TouchableOpacity activeOpacity={0.8}>
              <SettingRow
                icon="shield-outline"
                title="Active Sessions"
                subtitle="Manage your active sessions"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
