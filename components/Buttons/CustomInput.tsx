import { useTheme } from '@/theme/themeContext';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

interface CustomInputProps {
  placeholder?: string;
  value: string;
  label: string;
  error?: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  disabled?: boolean;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send' | 'default';
  blurOnSubmit?: boolean;
}

const CustomInput = forwardRef<TextInput, CustomInputProps>(({ 
  placeholder = "Enter text",
  value,
  label,
  error,
  maxLength,
  onChangeText,
  onSubmitEditing,
  secureTextEntry = false,
  autoCapitalize = "none",
  keyboardType = "default",
  disabled = false,
  returnKeyType = 'default',
  blurOnSubmit,
}, ref) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
  }) as any);

  return (
    <View className="mt-6">
      <Pressable onPress={() => inputRef.current?.focus()} hitSlop={8}>
        <Text
          className="font-semibold text-base mb-1 ml-1"
          style={{ color: colors.textSecondary }}
        >
          {label}
        </Text>
      </Pressable>

      <TextInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        blurOnSubmit={blurOnSubmit}
        onChangeText={onChangeText}
        editable={!disabled}
        selectionColor={colors.primary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`px-4 py-3 rounded-2xl border text-base ${disabled ? 'opacity-60' : ''}`}
        style={{
          backgroundColor: colors.surface,
          color: colors.textPrimary,
          borderColor: error ? '#EF4444' : (isFocused ? colors.primary : colors.border),
        }}
      />

      {error ? (
        <Text className="mt-1 ml-1 text-xs font-medium text-red-500">
          {error}
        </Text>
      ) : null}
    </View>
  );
});

export default CustomInput;