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

  const categories = ['Nepali', 'Indian', 'Chinese'];
  const unitMap: Record<string, string[]> = {
    Nepali: ['1sac', '12sac', '50sac', '100sac'],
    Indian: ['1', '12', '50', '100'],
    Chinese: ['12', '25', '50', '100'],
  };

  return (
    <SafeAreaView className="flex-1"
      style={{ backgroundColor: colors.background }}>
      <CustomHeader title="Feed Records" />

      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="flex-row items-center justify-center rounded-lg gap-2 p-4"
        style={{ backgroundColor: colors.primaryDark }}
      >
        <Ionicons name="add-circle-outline"
          size={22} color={colors.textPrimary} />
        <Text className="font-semibold"
          style={{ color: colors.textPrimary }}>
          Add Feed Record
        </Text>
      </TouchableOpacity>

      <RecordFormModal
        visible={showModal}
        title=" Add Feed Record"
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
            type: 'feed',
            title: data.category,
            description: 'Feed record',
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
