import RecordFormModal from '@/components/forms/RecordForm';
import RecordList from '@/components/records/RecordList';
import CustomHeader from '@/components/ui/CustomHeader';
import { useHistory } from '@/hooks/useHistory';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductionRecords() {
  const { colors } = useTheme();
  const router = useRouter();
  const { fromDashboard } = useLocalSearchParams<{ fromDashboard?: string }>();
  const [showModal, setShowModal] = useState(false);
  const { addHistoryItem } = useHistory('seller');

  const handleBack = () => {
    if (fromDashboard === 'true') {
      // Navigate directly to dashboard index
      router.navigate('/dashboards/(seller)');
    } else {
      router.back();
    }
  };
  const [records, setRecords] = useState<{
    category: string;
    unit: string;
    quantity: number;
  }[]>([]);
  const unitMap: Record<string, string[]> = {
    Eggs: ['pcs', '12pcs', 'crates', 'cartons'],
    Chicken: ['pcs', 'kg', 'per50', 'per100'],
    Chicks: ['pcs', 'per100', 'per200', 'per500'],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Sales Records" onBackPress={handleBack} />

      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          gap: 8,
          padding: 16,
          backgroundColor: colors.primaryDark,
        }}
      >
        <Ionicons name="add-circle-outline" size={22} color={colors.textPrimary} />
        <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
          Add Sales
        </Text>
      </TouchableOpacity>

      <RecordFormModal
        visible={showModal}
        title="Add Daily Sales"
        categories={['Eggs', 'Chicken', 'Chicks']}
        unitMap={unitMap}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => {
          setRecords((prev) => [...prev, data]);
          addHistoryItem({
            type: 'sale',
            title: data.category,
            description: 'Sales record',
            value: data.quantity,
            unit: data.unit,
            date: data.date ?? new Date().toISOString().slice(0, 10),
            meta: { category: data.category, unit: data.unit, quantity: data.quantity },
          });
        }}
      />
      <RecordList
        records={records}
        onDelete={
          (index) => setRecords((prev) => prev.filter(
            (_, i) => i !== index)
          )}
      />

    </SafeAreaView>
  );
}