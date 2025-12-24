import RecordFormModal from '@/components/Forms/RecordFormModal';
import RecordList from '@/components/Records/RecordList';
import CustomHeader from '@/components/Screens/CustomHeader';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductionRecords() {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState<{
    category: string;
    unit: string;
    quantity: number;
  }[]>([]);

  const categories = ['Eggs', 'Chicken', 'Chicks'];
  const unitMap: Record<string, string[]> = {
    Eggs: ['pcs', '12pcs', 'crates', 'cartons'],
    Chicken: ['pcs', 'kg', 'per50', 'per100'],
    Chicks: ['pcs', 'per100', 'per200', 'per500'],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Production Records" />

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
          Add Production
        </Text>
      </TouchableOpacity>

      <RecordFormModal
        visible={showModal}
        title="Add Daily Production"
        categories={['Eggs', 'Chicken', 'Chicks']}
        unitMap={unitMap}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => setRecords((prev) => [...prev, data])}
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
