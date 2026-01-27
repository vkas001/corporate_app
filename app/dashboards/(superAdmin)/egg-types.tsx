import EggTypeCard from '@/components/eggTypes/EggTypeCard';
import EggTypeForm from '@/components/forms/EggTypeForm';
import { useMarket } from '@/hooks/useMarket';
import { useTheme } from '@/theme/themeContext';
import { EggType } from '@/types/market';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
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

export default function EggTypesScreen() {
  const { colors } = useTheme();
  const { eggTypes, loading, createEggType, updateEggType, deleteEggType, fetchEggTypes } = useMarket();
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEggType, setEditingEggType] = useState<EggType | null>(null);

  const handleCreateEggType = async (data: { name: string; description?: string }) => {
    await createEggType(data);
    setShowAddForm(false);
  };

  const handleUpdateEggType = async (data: { name: string; description?: string }) => {
    if (!editingEggType) return;
    await updateEggType(editingEggType.id, data);
    setEditingEggType(null);
  };

  const handleEdit = (id: string) => {
    const eggType = eggTypes.find((et) => et.id === id);
    if (eggType) {
      setShowAddForm(false);
      setEditingEggType(eggType);
    }
  };

  const handleDelete = async (id: string) => {
    const eggType = eggTypes.find((et) => et.id === id);
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${eggType?.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEggType(id);
              Alert.alert('Success', 'Egg type deleted successfully');
            } catch (error: any) {
              Alert.alert('Error', error?.message || 'Failed to delete egg type');
            }
          },
        },
      ]
    );
  };

  const handleManageUnits = (id: string, name: string) => {
    router.push({
      pathname: '/(superAdmin)/egg-units' as any,
      params: { eggTypeId: id, eggTypeName: name },
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEggTypes();
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
            Manage Egg Types
          </Text>
          <Text className="text-[12px]" style={{ color: colors.textSecondary }}>
            Create, Update & Delete Types
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
          {!showAddForm && !editingEggType && (
            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl mb-4"
              style={{ backgroundColor: colors.primary }}
              activeOpacity={0.8}
              onPress={() => setShowAddForm(true)}
            >
              <Ionicons name="add-circle" size={20} color={colors.surface} />
              <Text className="text-base font-bold" style={{ color: colors.surface }}>
                Add Egg Type
              </Text>
            </TouchableOpacity>
          )}

          {showAddForm && (
            <EggTypeForm
              mode="create"
              onClose={() => setShowAddForm(false)}
              onSubmit={handleCreateEggType}
            />
          )}

          {editingEggType && (
            <EggTypeForm
              mode="edit"
              initialData={editingEggType}
              onClose={() => setEditingEggType(null)}
              onSubmit={handleUpdateEggType}
            />
          )}

          <View className="mb-6">
            <Text className="text-base font-bold mb-3" style={{ color: colors.textSecondary }}>
              Egg Types ({eggTypes.length})
            </Text>

            {loading && eggTypes.length === 0 ? (
              <View className="py-8 items-center">
                <Text style={{ color: colors.textSecondary }}>Loading egg types...</Text>
              </View>
            ) : eggTypes.length === 0 ? (
              <View
                className="rounded-2xl border p-8 items-center"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <Ionicons name="egg-outline" size={48} color={colors.textSecondary} />
                <Text className="text-base font-semibold mt-3" style={{ color: colors.textPrimary }}>
                  No Egg Types Yet!
                </Text>
                <Text className="text-sm text-center mt-1" style={{ color: colors.textSecondary }}>
                  Add your first egg type to get started
                </Text>
              </View>
            ) : (
              eggTypes.map((eggType) => (
                <EggTypeCard
                  key={eggType.id}
                  eggType={eggType}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onManageUnits={handleManageUnits}
                />
              ))
            )}
          </View>

          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
