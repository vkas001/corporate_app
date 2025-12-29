import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
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
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={onClose}
          className="w-10 h-10 rounded-full items-center justify-center border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold"
          style={{ color: colors.textPrimary }}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

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
            <SettingRow
              icon="lock-closed-outline"
              title="Two-Factor Authentication"
              subtitle="Add an extra layer of security"
              value={settings.twoFactorAuth}
              onToggle={() => toggleSetting('twoFactorAuth')}
            />
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <TouchableOpacity activeOpacity={0.8}>
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

        <View className="mt-6">
          <Text className="text-base font-bold mb-2"
            style={{ color: colors.textSecondary }}>Privacy
          </Text>
          <View className="rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <SettingRow
              icon="eye-outline"
              title="Data Collection"
              subtitle="Allow us to collect usage data"
              value={settings.dataCollection}
              onToggle={() => toggleSetting('dataCollection')}
            />
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <TouchableOpacity activeOpacity={0.8}>
              <SettingRow
                icon="document-text-outline"
                title="Privacy Policy"
                subtitle="Read our privacy policy"
              />
            </TouchableOpacity>
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <TouchableOpacity activeOpacity={0.8}>
              <SettingRow
                icon="checkmark-done-outline"
                title="Terms & Conditions"
                subtitle="Read our terms"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6 mb-6">
          <Text className="text-base font-bold mb-2"
            style={{ color: colors.textSecondary }}>Other
          </Text>
          <View className="rounded-2xl p-4 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <TouchableOpacity activeOpacity={0.8}>
              <SettingRow
                icon="help-circle-outline"
                title="Help & Support"
                subtitle="Get help with your account"
              />
            </TouchableOpacity>
            <View className="h-px my-1"
              style={{ backgroundColor: colors.border }} />
            <TouchableOpacity activeOpacity={0.8}>
              <SettingRow
                icon="information-circle-outline"
                title="About App"
                subtitle="Version 1.0.0"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
