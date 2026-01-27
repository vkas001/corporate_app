import { useTheme } from '@/theme/themeContext';
import { EggType } from '@/types/market';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  eggType: EggType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MarketCard({ eggType, onEdit, onDelete }: Props) {
  const { colors } = useTheme();

  return (
    <View
      className="rounded-2xl border p-4 mb-3"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <View
              className="w-8 h-8 rounded-lg items-center justify-center"
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <Ionicons name="egg-outline" size={16} color={colors.primary} />
            </View>
            <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
              {eggType.name}
            </Text>
          </View>

          {eggType.description ? (
            <Text className="text-xs mt-1 ml-10" style={{ color: colors.textSecondary }}>
              {eggType.description}
            </Text>
          ) : null}

        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity onPress={() => onEdit(eggType.id)}>
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(eggType.id)}>
            <Ionicons name="trash-outline" size={20} color="#D14343" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
