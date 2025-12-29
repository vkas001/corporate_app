import CustomHeader from '@/components/Screens/CustomHeader';
import { useTheme } from '@/theme/themeContext';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentRecords() {
  const{ colors } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Payment Records" />
    </SafeAreaView>
  )
}