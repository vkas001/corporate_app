import React from 'react'
import { useTheme } from '@/theme/themeContext';
import CustomHeader from '@/components/Screens/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BatchRecords() {
  const{ colors } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Batch Records" />
    </SafeAreaView>
  )
}