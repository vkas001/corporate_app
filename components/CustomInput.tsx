import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTheme } from '@/theme/themeContext';

const { colors } = useTheme();

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
}

const CustomInput = ({
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
}: CustomInputProps) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-11/12 self-center mt-6">
      
      <Text
        style={{ 
          color: colors.primary,
          marginBottom: 4,
          marginLeft: 4,
          fontWeight: '600',
          fontSize: 16,
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: "100%",
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderRadius: 16,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: isFocused ? colors.primary : colors.border,
          fontSize: 16,
        }}
        
      />
    </View>
  );
};

export default CustomInput;