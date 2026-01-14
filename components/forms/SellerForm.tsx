import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { useTheme } from "@/theme/themeContext";
import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";

export type CreateSellerInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
};

type Props = {
  isSubmitting?: boolean;
  onSubmit: (data: CreateSellerInput) => void | Promise<void>;
};

export default function SellerForm({ isSubmitting = false, onSubmit }: Props) {
  const { colors } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const emailTrimmed = useMemo(() => form.email.trim(), [form.email]);

  const validate = () => {
    const nextErrors: Record<string, string | undefined> = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";

    if (!emailTrimmed) {
      nextErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) nextErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (form.password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((v) => !v);
  };

  const submit = async () => {
    if (!validate()) return;
    await onSubmit({
      name: form.name.trim(),
      email: emailTrimmed,
      password: form.password,
      phone: form.phone.trim() || undefined,
      address: form.address.trim() || undefined,
    });
  };

  return (
    <View
      className="rounded-3xl p-5 border"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <Text className="text-lg font-bold" style={{ color: colors.textPrimary }}>
        Seller Details
      </Text>
      <Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
        Create a new seller account. The role will be Seller.
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
        editable={!isSubmitting}
      />

      <CustomInput
        label="Email"
        placeholder="seller@company.com"
        value={form.email}
        onChangeText={(text) => {
          setForm((p) => ({ ...p, email: text }));
          if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="mail-outline"
        error={errors.email}
        editable={!isSubmitting}
      />

      <CustomInput
        label="Phone (optional)"
        placeholder="98XXXXXXXX"
        value={form.phone}
        onChangeText={(text) => setForm((p) => ({ ...p, phone: text }))}
        keyboardType="phone-pad"
        icon="call-outline"
        editable={!isSubmitting}
      />

      <CustomInput
        label="Address (optional)"
        placeholder="City, Street"
        value={form.address}
        onChangeText={(text) => setForm((p) => ({ ...p, address: text }))}
        icon="location-outline"
        editable={!isSubmitting}
      />

      <CustomInput
        label="Password"
        placeholder="Create a password"
        value={form.password}
        onChangeText={(text) => {
          setForm((p) => ({ ...p, password: text }));
          if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
        }}
        secureTextEntry
        icon="lock-closed-outline"
        error={errors.password}
        editable={!isSubmitting}
      />

      <CustomInput
        label="Confirm Password"
        placeholder="Re-enter password"
        value={form.confirmPassword}
        onChangeText={(text) => {
          setForm((p) => ({ ...p, confirmPassword: text }));
          if (errors.confirmPassword)
            setErrors((p) => ({ ...p, confirmPassword: undefined }));
        }}
        secureTextEntry
        icon="shield-checkmark-outline"
        error={errors.confirmPassword}
        editable={!isSubmitting}
      />

      <View className="mt-6">
        <CustomButton
          title={isSubmitting ? "Creating..." : "Create Seller"}
          onPress={submit}
          isLoading={isSubmitting}
        />
      </View>
    </View>
  );
}
