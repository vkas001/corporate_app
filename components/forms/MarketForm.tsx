import CustomButton from '@/components/ui/CustomButton';
import CustomInput from '@/components/ui/CustomInput';
import { useTheme } from '@/theme/themeContext';
import React, { useRef, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

interface AddEggTypeFormProps {
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
}

export default function MarketForm({ onClose, onSubmit }: AddEggTypeFormProps) {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      if (errors.name) nameRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        name: form.name.trim(),
        description: form.description.trim() || undefined,
      });

      setForm({ name: '', description: '' });
      setErrors({});
      Alert.alert('Success', 'Egg type created successfully');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to create egg type');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View
      className="rounded-2xl border p-4 mb-4"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold" style={{ color: colors.textPrimary }}>
          Add New Egg Type
        </Text>
      </View>

      <CustomInput
        ref={nameRef}
        label="Name *"
        placeholder="e.g., Chicken, Brown, Quail"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        error={errors.name}
        icon="text-outline"
        returnKeyType="next"
        onSubmitEditing={() => descriptionRef.current?.focus()}
      />

      <CustomInput
        ref={descriptionRef}
        label="Description (Optional)"
        placeholder="Enter description"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
        error={errors.description}
        icon="document-text-outline"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      <View className="flex-row gap-3 mt-6">
        <View className="flex-1">
          <CustomButton
            title="Cancel"
            onPress={() => {
              onClose();
              setForm({ name: '', description: '' });
              setErrors({});
            }}
            style={{ backgroundColor: colors.border }}
            textStyle={{ color: colors.textPrimary }}
          />
        </View>
        <View className="flex-1">
          <CustomButton
            title="Create"
            onPress={handleSubmit}
            isLoading={isSubmitting}
            style={{ backgroundColor: colors.primary }}
            textStyle={{ color: colors.surface }}
          />
        </View>
      </View>
    </View>
  );
}
