import CustomButton from '@/components/ui/CustomButton';
import CustomInput from '@/components/ui/CustomInput';
import { useTheme } from '@/theme/themeContext';
import { EggUnit } from '@/types/market';
import React, { useRef, useState } from 'react';
import { Alert, Switch, Text, TextInput, View } from 'react-native';

interface EggUnitFormProps {
  onClose: () => void;
  onSubmit: (data: Partial<EggUnit>) => Promise<void>;
  initialData?: EggUnit;
  mode?: 'create' | 'edit';
}

export default function EggUnitForm({
  onClose,
  onSubmit,
  initialData,
  mode = 'create'
}: EggUnitFormProps) {
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: initialData?.name || '',
    abbreviation: initialData?.abbreviation || '',
    conversion_factor: initialData?.conversion_factor?.toString() || '',
    price: initialData?.price?.toString() || '',
    is_base_unit: initialData?.is_base_unit || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<TextInput>(null);
  const abbreviationRef = useRef<TextInput>(null);
  const conversionRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    if (form.conversion_factor && isNaN(parseFloat(form.conversion_factor))) {
      nextErrors.conversion_factor = 'Must be a valid number';
    }

    if (form.price && isNaN(parseFloat(form.price))) {
      nextErrors.price = 'Must be a valid number';
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

      const data: Partial<EggUnit> = {
        name: form.name.trim(),
        abbreviation: form.abbreviation.trim() || undefined,
        is_base_unit: form.is_base_unit,
      };

      if (form.conversion_factor) {
        data.conversion_factor = parseFloat(form.conversion_factor);
      }

      if (form.price) {
        data.price = parseFloat(form.price);
      }

      await onSubmit(data);

      setForm({
        name: '',
        abbreviation: '',
        conversion_factor: '',
        price: '',
        is_base_unit: false
      });
      setErrors({});
      Alert.alert('Success', `Unit ${mode === 'create' ? 'created' : 'updated'} successfully`);
    } catch (error: any) {
      Alert.alert('Error', error?.message || `Failed to ${mode} unit`);
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
        <Text className="text-lg font-bold"
          style={{ color: colors.textPrimary }}>
          {mode === 'create' ? 'Add New Unit' : 'Edit Unit'}
        </Text>
      </View>

      <CustomInput
        ref={nameRef}
        label="Unit Name *"
        placeholder="e.g., Per Piece, Crate, Dozen"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        error={errors.name}
        icon="layers-outline"
        returnKeyType="next"
        onSubmitEditing={() => abbreviationRef.current?.focus()}
      />

      <CustomInput
        ref={abbreviationRef}
        label="Abbreviation"
        placeholder="e.g., pcs, crt, dz"
        value={form.abbreviation}
        onChangeText={(text) => setForm({ ...form, abbreviation: text })}
        error={errors.abbreviation}
        icon="text-outline"
        returnKeyType="next"
        onSubmitEditing={() => conversionRef.current?.focus()}
      />

      <CustomInput
        ref={conversionRef}
        label="Conversion Factor"
        placeholder="e.g., 30 (if 1 crate = 30 pieces)"
        value={form.conversion_factor}
        onChangeText={(text) => setForm({ ...form, conversion_factor: text })}
        error={errors.conversion_factor}
        icon="calculator-outline"
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => priceRef.current?.focus()}
      />

      <CustomInput
        ref={priceRef}
        label="Price (NPR)"
        placeholder="e.g., 150.00"
        value={form.price}
        onChangeText={(text) => setForm({ ...form, price: text })}
        error={errors.price}
        icon="cash-outline"
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      <View className="mb-4">
        <View className="flex-row items-center justify-between py-3 px-1">
          <View className="flex-1">
            <Text className="text-sm font-semibold"
              style={{ color: colors.textPrimary }}>
              Base Unit
            </Text>
            <Text className="text-xs mt-1"
              style={{ color: colors.textSecondary }}>
              Mark as the base unit for this egg type
            </Text>
          </View>
          <Switch
            value={form.is_base_unit}
            onValueChange={(value) => setForm({ ...form, is_base_unit: value })}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
      </View>

      <View className="flex-row gap-3 mt-2">
        <View className="flex-1">
          <CustomButton
            title="Cancel"
            onPress={() => {
              onClose();
              setForm({
                name: '',
                abbreviation: '',
                conversion_factor: '',
                price: '',
                is_base_unit: false
              });
              setErrors({});
            }}
          />
        </View>
        <View className="flex-1">
          <CustomButton
            title={mode === 'create' ? 'Create' : 'Update'}
            onPress={handleSubmit}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </View>
  );
}
