import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/theme';

type RecordEntry = {
  category: string;
  unit: string;
  quantity: number;
};

type Props = {
  records: RecordEntry[];
  onDelete?: (index: number) => void; 
};

export default function RecordTable({ records, onDelete }: Props) {
  const { colors } = useTheme();

  return (
    <ScrollView horizontal style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <View style={{ minWidth: 350 }}>
        {/* Table Header */}
        <View style={{
          flexDirection: 'row',
          paddingVertical: 12,
          backgroundColor: colors.primaryDark,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
          <Text style={{ flex: 2, color: colors.textPrimary, fontWeight: '700', textAlign: 'center' }}>
            Category
          </Text>
          <Text style={{ flex: 1, color: colors.textPrimary, fontWeight: '700', textAlign: 'center' }}>
            Unit
          </Text>
          <Text style={{ flex: 1, color: colors.textPrimary, fontWeight: '700', textAlign: 'center' }}>
            Quantity
          </Text>
          {onDelete && (
            <Text style={{ flex: 1, color: colors.textPrimary, fontWeight: '700', textAlign: 'center' }}>
              Action
            </Text>
          )}
        </View>

        {/* Table Rows */}
        {records.length === 0 ? (
          <Text style={{ color: colors.textSecondary, padding: 16, textAlign: 'center' }}>
            No records yet
          </Text>
        ) : (
          records.map((record, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: index % 2 === 0 ? colors.background : colors.primaryDark,
              }}
            >
              <Text style={{ flex: 2, color: colors.textPrimary, textAlign: 'center' }}>
                {record.category}
              </Text>
              <Text style={{ flex: 1, color: colors.textPrimary, textAlign: 'center' }}>
                {record.unit}
              </Text>
              <Text style={{ flex: 1, color: colors.textPrimary, textAlign: 'center' }}>
                {record.quantity}
              </Text>
              {onDelete && (
                <TouchableOpacity onPress={() => onDelete(index)} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: colors.primary }}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
