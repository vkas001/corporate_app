import CustomHeader from '@/components/ui/CustomHeader';
import { useTheme } from '@/theme/themeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
  const { colors } = useTheme();
  const router = useRouter();
  const { fromDashboard } = useLocalSearchParams<{ fromDashboard?: string }>();

  const handleBack = () => {
    if (fromDashboard === 'true') {
      // Navigate directly to dashboard index
      router.navigate('/dashboards/(seller)');
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="History" onBackPress={handleBack} />
    </SafeAreaView>
  )
}