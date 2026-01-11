import CustomInput from '@/components/ui/CustomInput';
import { changePassword as changePasswordApi } from '@/services/userService';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePassword() {
  const { colors } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
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
      await changePasswordApi(currentPassword, newPassword);
      Alert.alert('Success', 'Password updated successfully', [
        {
          text: 'OK',
          onPress: handleBack,
        },
      ]);
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Failed to update password';
      Alert.alert('Error', message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1"
      style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={handleBack}
          className="w-10 h-10 rounded-full items-center justify-center border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold"
          style={{ color: colors.textPrimary }}>Edit Profile
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <View className="mt-6 gap-4">
            <CustomInput
              label="Current Password"
              placeholder="Enter current password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />
            <CustomInput
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />
            <CustomInput
              label="Confirm New Password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />
          </View>

          <View className="flex-row gap-3 mt-8 mb-8">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg items-center justify-center"
              style={{ backgroundColor: colors.border }}
              onPress={handleBack}
              disabled={submitting}
            >
              <Text className="font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg items-center justify-center"
              style={{ backgroundColor: colors.primary }}
              onPress={handleChangePassword}
              disabled={submitting}
            >
              <Text className="font-semibold"
                style={{ color: colors.surface }}
              >
                {submitting ? 'Updating...' : 'Update Password'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
