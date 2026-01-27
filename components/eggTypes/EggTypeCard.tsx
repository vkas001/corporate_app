import { useTheme } from '@/theme/themeContext';
import { EggType } from '@/types/market';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface EggTypeCardProps {
  eggType: EggType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onManageUnits?: (id: string, name: string) => void;
}

export default function EggTypeCard({ eggType, onEdit, onDelete, onManageUnits }: EggTypeCardProps) {
  const { colors } = useTheme();

  return (
    <View
      className="rounded-2xl border p-4 mb-3"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <View className="mb-3">
        <Text className="text-xs font-semibold mb-1" style={{ color: colors.textSecondary }}>
          Name
        </Text>
        <View className="flex-row items-center gap-2">
          <Ionicons name="egg-outline" size={18} color={colors.primary} />
          <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
            {eggType.name}
          </Text>
        </View>
      </View>

      {eggType.description && (
        <View className="mb-3">
          <Text className="text-xs font-semibold mb-1" style={{ color: colors.textSecondary }}>
            Description
          </Text>
          <View className="flex-row gap-2">
            <Ionicons name="document-text-outline" size={18} color={colors.textSecondary} />
            <Text className="text-sm flex-1" style={{ color: colors.textPrimary }}>
              {eggType.description}
            </Text>
          </View>
        </View>
      )}

      {eggType.units && eggType.units.length > 0 && (
        <View className="mb-3">
          <Text className="text-xs font-semibold mb-2" style={{ color: colors.textSecondary }}>
            Units ({eggType.units.length})
          </Text>
          {eggType.units.slice(0, 3).map((unit, index) => (
            <View 
              key={index} 
              className="rounded-lg p-2 mb-1" 
              style={{ backgroundColor: colors.primary + '15' }}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  {unit.name}
                </Text>
                {unit.price != null && (
                  <Text className="text-sm font-bold" style={{ color: colors.primary }}>
                    NPR {unit.price.toFixed(2)}
                  </Text>
                )}
              </View>
              {unit.abbreviation && (
                <Text className="text-xs" style={{ color: colors.textSecondary }}>
                  {unit.abbreviation}
                </Text>
              )}
            </View>
          ))}
          {eggType.units.length > 3 && (
            <Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
              +{eggType.units.length - 3} more
            </Text>
          )}
        </View>
      )}

      <View className="flex-row gap-2 mt-2 pt-3 border-t" style={{ borderColor: colors.border }}>
        {onManageUnits && (
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-1 py-2.5 rounded-xl"
            style={{ backgroundColor: colors.primary + '15' }}
            onPress={() => onManageUnits(eggType.id, eggType.name)}
          >
            <Ionicons name="layers-outline" size={16} color={colors.primary} />
            <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
              Units
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1 py-2.5 rounded-xl"
          style={{ backgroundColor: colors.background }}
          onPress={() => onEdit(eggType.id)}
        >
          <Ionicons name="create-outline" size={16} color={colors.primary} />
          <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-1 py-2.5 rounded-xl"
          style={{ backgroundColor: '#FEE2E2' }}
          onPress={() => onDelete(eggType.id)}
        >
          <Ionicons name="trash-outline" size={16} color="#DC2626" />
          <Text className="text-xs font-semibold" style={{ color: '#DC2626' }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
