import CustomButton from '@/components/Buttons/CustomButton';
import CustomInput from '@/components/Buttons/CustomInput';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
  };
  onSave: (data: any) => void;
  onCancel: () => void;
};

export default function EditProfileScreen({ initialData, onSave, onCancel }: Props) {
  const { colors } = useTheme();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    company: initialData?.company || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const companyRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    setErrors(newErrors);
    const ok = Object.keys(newErrors).length === 0;
    if (!ok) {
      setTimeout(() => {
        if (newErrors.name) return nameRef.current?.focus();
        if (newErrors.email) return emailRef.current?.focus();
        if (newErrors.phone) return phoneRef.current?.focus();
        if (newErrors.company) return companyRef.current?.focus();
        addressRef.current?.focus();
      }, 0);
    }
    return ok;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Show cross-platform success feedback
      if (Platform.OS === 'android') {
        ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Profile updated successfully');
      }
      // Also render transient banner if we remain on this screen
      setSuccessMsg("Profile updated successfully");
      setTimeout(() => setSuccessMsg(""), 2500);
      onSave(formData);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <SafeAreaView className="flex-1 mb-8"
      style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={onCancel}
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
        {successMsg ? (
          <View
            className="mx-4 mt-2 mb-0 rounded-xl border px-3 py-2 flex-row items-center"
            style={{ backgroundColor: 'rgba(46,125,50,0.10)', borderColor: '#2E7D32' }}
          >
            <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
            <Text className="ml-2 font-semibold" style={{ color: colors.textPrimary }}>{successMsg}</Text>
          </View>
        ) : null}
        <ScrollView
          className="px-4 mt-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
        >

          <View
            className="rounded-2xl p-4 border mb-6"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <Text className="text-base font-bold mb-1"
              style={{ color: colors.textSecondary }}>Personal Information
            </Text>

            <CustomInput
              ref={nameRef}
              label="Full Name *"
              placeholder="John Doe"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              error={errors.name}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            <CustomInput
              ref={emailRef}
              label="Email *"
              placeholder="john@example.com"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              keyboardType="email-address"
              error={errors.email}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
            <Text className="text-xs mt-1 ml-1"
              style={{ color: colors.textSecondary }}>
              Use a valid email like name@company.com
            </Text>

            <CustomInput
              ref={phoneRef}
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              keyboardType="phone-pad"
              error={errors.phone}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => companyRef.current?.focus()}
            />
            <Text className="text-xs mt-1 ml-1"
              style={{ color: colors.textSecondary }}>
              Include country code if applicable
            </Text>
          </View>

          <View
            className="rounded-2xl p-4 border mb-6"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <Text className="text-base font-bold mb-1"
              style={{ color: colors.textSecondary }}>Business Information</Text>

            <CustomInput
              ref={companyRef}
              label="Company Name"
              placeholder="Your Company"
              value={formData.company}
              onChangeText={(value) => updateField('company', value)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => addressRef.current?.focus()}
            />

            <View className="mt-6">
              <Text className="font-semibold text-base mb-1 ml-1"
                style={{ color: colors.textSecondary }}>Address</Text>
              <TextInput
                ref={addressRef}
                placeholder="123 Main St, City, State 12345"
                value={formData.address}
                onChangeText={(value) => updateField('address', value)}
                multiline
                numberOfLines={3}
                onFocus={() => setIsAddressFocused(true)}
                onBlur={() => setIsAddressFocused(false)}
                className="px-4 py-3 rounded-2xl border text-base min-h-[96px]"
                style={{
                  backgroundColor: colors.surface,
                  color: colors.textPrimary,
                  borderColor: isAddressFocused ? colors.primary : colors.border,
                }}
                placeholderTextColor={colors.textSecondary}
                selectionColor={colors.primary}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View className="flex-row items-center justify-end gap-3 mt-2 mb-6">
            <CustomButton
              onPress={onCancel}
              title="Cancel"
              size="medium"
              style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}
              textStyle={{ color: colors.textPrimary }}
            />

            <CustomButton
              onPress={handleSave}
              title="Save Changes"
              size="medium"
              leftIcon={<Ionicons name="checkmark" size={18} color={colors.textPrimary} />}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
