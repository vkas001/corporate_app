import EggUnitForm from '@/components/forms/EggUnitForm';
import { EggTypesService } from '@/services/marketService';
import { useTheme } from '@/theme/themeContext';
import { EggUnit } from '@/types/market';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EggUnitsScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const eggTypeId = params.eggTypeId as string;
  const eggTypeName = params.eggTypeName as string;

  const [units, setUnits] = useState<EggUnit[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState<EggUnit | null>(null);

  const fetchUnits = async () => {
    setLoading(true);
    try {
      const data = await EggTypesService.getUnits(eggTypeId);
      setUnits(data);
    } catch (error) {
      console.error('Error fetching units:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eggTypeId) {
      fetchUnits();
    }
  }, [eggTypeId]);

  const handleCreateUnit = async (data: Partial<EggUnit>) => {
    try {
      await EggTypesService.createUnit(eggTypeId, data);
      await fetchUnits();
      setShowAddForm(false);
    } catch (error: any) {
      throw error;
    }
  };

  const handleUpdateUnit = async (data: Partial<EggUnit>) => {
    if (!editingUnit?.id) return;
    try {
      await EggTypesService.updateUnit(eggTypeId, editingUnit.id, data);
      await fetchUnits();
      setEditingUnit(null);
    } catch (error: any) {
      throw error;
    }
  };

  const handleEdit = (unit: EggUnit) => {
    setShowAddForm(false);
    setEditingUnit(unit);
  };

  const handleDelete = async (unit: EggUnit) => {
    if (!unit.id) return;
    
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${unit.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await EggTypesService.deleteUnit(eggTypeId, unit.id!);
              await fetchUnits();
              Alert.alert('Success', 'Unit deleted successfully');
            } catch (error: any) {
              Alert.alert('Error', error?.message || 'Failed to delete unit');
            }
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUnits();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View
        className="mb-4 h-[56px] px-[16px] flex-row items-center justify-between"
        style={{ backgroundColor: colors.surface }}
      >
        <TouchableOpacity
          className="w-[40px] h-[40px] rounded-[20px] items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back-outline" size={28} color={colors.textPrimary} />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Text className="text-[18px] font-[600]" style={{ color: colors.textPrimary }}>
            {eggTypeName} Units
          </Text>
          <Text className="text-[12px]" style={{ color: colors.textSecondary }}>
            Manage Units & Pricing
          </Text>
        </View>

        <View className="w-[40px]" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {!showAddForm && !editingUnit && (
            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl mb-4"
              style={{ backgroundColor: colors.primary }}
              activeOpacity={0.8}
              onPress={() => setShowAddForm(true)}
            >
              <Ionicons name="add-circle" size={20} color={colors.surface} />
              <Text className="text-base font-bold" style={{ color: colors.surface }}>
                Add Unit
              </Text>
            </TouchableOpacity>
          )}

          {showAddForm && (
            <EggUnitForm
              mode="create"
              onClose={() => setShowAddForm(false)}
              onSubmit={handleCreateUnit}
            />
          )}

          {editingUnit && (
            <EggUnitForm
              mode="edit"
              initialData={editingUnit}
              onClose={() => setEditingUnit(null)}
              onSubmit={handleUpdateUnit}
            />
          )}

          <View className="mb-6">
            <Text className="text-base font-bold mb-3" style={{ color: colors.textSecondary }}>
              Units ({units.length})
            </Text>

            {loading && units.length === 0 ? (
              <View className="py-8 items-center">
                <Text style={{ color: colors.textSecondary }}>Loading units...</Text>
              </View>
            ) : units.length === 0 ? (
              <View
                className="rounded-2xl border p-8 items-center"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <Ionicons name="layers-outline" size={48} color={colors.textSecondary} />
                <Text className="text-base font-semibold mt-3" style={{ color: colors.textPrimary }}>
                  No Units Yet!
                </Text>
                <Text className="text-sm text-center mt-1" style={{ color: colors.textSecondary }}>
                  Add units like "Per Piece", "Crate", etc.
                </Text>
              </View>
            ) : (
              units.map((unit, index) => (
                <View
                  key={unit.id || index}
                  className="rounded-2xl border p-4 mb-3"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Ionicons name="layers-outline" size={18} color={colors.primary} />
                        <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
                          {unit.name}
                        </Text>
                        {Boolean(unit.is_base_unit) && (
                          <View 
                            className="px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: colors.primary + '20' }}
                          >
                            <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                              Base
                            </Text>
                          </View>
                        )}
                      </View>
                      {Boolean(unit.abbreviation) && (
                        <Text className="text-xs ml-6" style={{ color: colors.textSecondary }}>
                          {unit.abbreviation}
                        </Text>
                      )}
                    </View>
                    {unit.price != null && (
                      <View className="items-end">
                        <Text className="text-xs" style={{ color: colors.textSecondary }}>
                          Price
                        </Text>
                        <Text className="text-lg font-bold" style={{ color: colors.primary }}>
                          ₹{unit.price.toFixed(2)}
                        </Text>
                      </View>
                    )}
                  </View>

                  {unit.conversion_factor != null && (
                    <View className="mb-3">
                      <Text className="text-xs font-semibold mb-1" style={{ color: colors.textSecondary }}>
                        Conversion Factor
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <Ionicons name="calculator-outline" size={16} color={colors.textSecondary} />
                        <Text className="text-sm" style={{ color: colors.textPrimary }}>
                          {unit.conversion_factor}x
                        </Text>
                      </View>
                    </View>
                  )}

                  <View className="flex-row gap-2 mt-2 pt-3 border-t" style={{ borderColor: colors.border }}>
                    <TouchableOpacity
                      className="flex-1 flex-row items-center justify-center gap-1 py-2.5 rounded-xl"
                      style={{ backgroundColor: colors.background }}
                      onPress={() => handleEdit(unit)}
                    >
                      <Ionicons name="create-outline" size={16} color={colors.primary} />
                      <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                        Edit
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 flex-row items-center justify-center gap-1 py-2.5 rounded-xl"
                      style={{ backgroundColor: '#FEE2E2' }}
                      onPress={() => handleDelete(unit)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#DC2626" />
                      <Text className="text-xs font-semibold" style={{ color: '#DC2626' }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
