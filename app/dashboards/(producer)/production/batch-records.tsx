import BatchCard from '@/components/Batch/BatchCard';
import CustomHeader from '@/components/Screens/CustomHeader';
import { mockBatches } from '@/data/batch';
import { useTheme } from '@/theme/themeContext';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BatchRecords() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Batch Records" />
      {mockBatches.map((batch) => (
        <BatchCard key={batch.id} batch={batch} />
      ))}
    </SafeAreaView>
  )
}