import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type RecordEntry = {
  category: string;
  unit: string;
  quantity: number;
};

type Props = {
  records: RecordEntry[];
  onDelete?: (index: number) => void;
  onHistory?: (index: number) => void;
};

/* 🔒 SINGLE SOURCE OF TRUTH FOR COLUMNS */
const columns = [
  { key: 'category', flex: 2, align: 'flex-start' as const },
  { key: 'quantity', flex: 1.2, align: 'center' as const },
  { key: 'history', flex: 1, align: 'center' as const },
  { key: 'action', flex: 1, align: 'center' as const },
];

function TableRow({
  children,
  backgroundColor,
  borderColor,
}: {
  children: React.ReactNode[];
  backgroundColor?: string;
  borderColor?: string;
}) {
  return (
    <View
      className="flex-row flex-nowrap"
      style={{
        backgroundColor,
        borderBottomWidth: borderColor ? 1 : 0,
        borderBottomColor: borderColor,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <View
          className="px-1.5 py-2 justify-center"
          style={{
            flex: columns[index].flex,
            alignItems: columns[index].align,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

export default function RecordTable({
  records,
  onDelete,
  onHistory,
}: Props) {
  const { colors } = useTheme();

  return (
    <ScrollView className="mt-4 px-3 pb-6">
      <View
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: colors.surface,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
        }}
      >
        {/* 🧾 HEADER */}
        <TableRow backgroundColor={colors.primaryDark}>
          <Text
            numberOfLines={1}
            className="py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: colors.textPrimary }}
          >
            Category
          </Text>
          <Text
            numberOfLines={1}
            className="py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: colors.textPrimary }}
          >
            Quantity
          </Text>
          <Text
            numberOfLines={1}
            className="py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: colors.textPrimary }}
          >
            History
          </Text>
          <Text
            numberOfLines={1}
            className="py-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: colors.textPrimary }}
          >
            Action
          </Text>
        </TableRow>

        {/* 📄 EMPTY STATE */}
        {records.length === 0 ? (
          <View className="py-12 items-center justify-center">
            <View
              className="mb-3 p-4 rounded-full"
              style={{ backgroundColor: withOpacity(colors.primary, 0.15) }}
            >
              <Ionicons
                name="document-text-outline"
                size={40}
                color={colors.primary}
              />
            </View>
            <Text
              className="text-base font-semibold"
              style={{ color: colors.textPrimary }}
            >
              No records yet
            </Text>
            <Text
              className="text-sm mt-2 px-6 text-center"
              style={{ color: colors.textSecondary }}
            >
              Start by adding your first record
            </Text>
          </View>
        ) : (
          records.map((record, index) => (
            <TableRow
              key={`${record.category}-${index}`}
              backgroundColor={
                index % 2 === 0
                  ? colors.surface
                  : withOpacity(colors.primary, 0.04)
              }
              borderColor={
                index === records.length - 1
                  ? undefined
                  : colors.border
              }
            >
              {/* Category */}
              <View className="px-1.5 py-3.5">
                <Text
                  numberOfLines={1}
                  className="text-xs font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  {record.category}
                </Text>
              </View>

              {/* Quantity */}
              <View
                className="px-1.5 py-1 rounded-lg"
                style={{ backgroundColor: withOpacity(colors.primary, 0.15) }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: colors.primary }}
                >
                  {record.quantity.toLocaleString()}
                </Text>
              </View>

              {/* History */}
              <TouchableOpacity
                onPress={() => onHistory?.(index)}
                activeOpacity={0.7}
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: withOpacity(colors.primary, 0.15) }}
              >
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={colors.primary}
                />
              </TouchableOpacity>

              {/* Action */}
              <TouchableOpacity
                onPress={() => onDelete?.(index)}
                activeOpacity={0.7}
                disabled={!onDelete}
                className="p-1.5 rounded-lg"
                style={{
                  backgroundColor: onDelete
                    ? withOpacity('#EF4444', 0.15)
                    : withOpacity(colors.textSecondary, 0.1),
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={14}
                  color={onDelete ? '#EF4444' : colors.textSecondary}
                />
              </TouchableOpacity>
            </TableRow>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const withOpacity = (hexColor: string, opacity: number) => {
  const sanitized = hexColor.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
