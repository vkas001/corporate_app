import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  onBackPress: () => void;
  rightElement?: React.ReactNode;
};

export default function ScreenHeader({ title, onBackPress, rightElement }: Props) {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <TouchableOpacity
        onPress={onBackPress}
        className="w-10 h-10 rounded-full items-center justify-center border"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text className="text-lg font-bold"
        style={{ color: colors.textPrimary }}>
        {title}
      </Text>
      {rightElement || <View style={{ width: 40 }} />}
    </View>
  );
}
