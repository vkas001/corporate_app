import RecordFormModal from '@/components/forms/RecordForm';
import RecordList from '@/components/records/RecordList';
import CustomHeader from '@/components/ui/CustomHeader';
import { useHistory } from '@/hooks/useHistory';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedRecords() {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const { addHistoryItem } = useHistory('producer');
  const [records, setRecords] = useState<{
    category: string;
    unit: string;
    quantity: number;
  }[]>([]);

  const categories = ['Boilers', 'Hybrid', 'Chicks'];
  const unitMap: Record<string, string[]> = {
    Boilers: ['15day', '20day', '30day', '35day'],
    Hybrid: ['1day', '15day', '250day', '35day'],
    Chicks: ['1day', '3day', '7day', '10day'],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Mortality Records" />

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
          Add Mortality
        </Text>
      </TouchableOpacity>

      <RecordFormModal
        visible={showModal}
        title=" Add Mortality Record"
        categories={categories}
        unitMap={unitMap}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => {
          setRecords((prev) => {
            const idx = prev.findIndex(r => r.category === data.category && r.unit === data.unit);
            if (idx !== -1) {
              const next = [...prev];
              next[idx] = { ...next[idx], quantity: next[idx].quantity + data.quantity };
              return next;
            }
            return [...prev, data];
          });

          addHistoryItem({
            type: 'mortality',
            title: data.category,
            description: 'Mortality record',
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
