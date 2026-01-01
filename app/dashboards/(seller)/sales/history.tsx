import CustomHeader from '@/components/ui/CustomHeader';
import { useTheme } from '@/theme/themeContext';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="History" />
    </SafeAreaView>
  )
}