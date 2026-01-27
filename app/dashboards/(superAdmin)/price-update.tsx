import MarketForm from '@/components/forms/MarketForm';
import { useMarket } from '@/hooks/useMarket';
import { useTheme } from '@/theme/themeContext';
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

export default function LivePriceUpdate() {
  const { colors } = useTheme();
  const { eggTypes, loading, createEggType, deleteEggType } = useMarket();
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreateEggType = async (data: { name: string; description?: string }) => {
    console.log('Creating egg type with data:', data);
    await createEggType(data);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this egg type?',
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

  const handleEdit = (id: string) => {
    Alert.alert('Info', 'Edit functionality coming soon');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
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
            Manage Egg Prices
          </Text>
          <Text className="text-[12px]" style={{ color: colors.textSecondary }}>
            Add & Update Market Prices
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
          {!showAddForm && (
            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl mb-4"
              style={{ backgroundColor: colors.primary }}
              activeOpacity={0.8}
              onPress={() => setShowAddForm(true)}
            >
              <Ionicons name="add-circle" size={20} color={colors.surface} />
              <Text className="text-base font-bold" style={{ color: colors.surface }}>
                Add Prices
              </Text>
            </TouchableOpacity>
          )}

          {showAddForm && (
            <MarketForm
              onClose={() => setShowAddForm(false)}
              onSubmit={handleCreateEggType}
            />
          )}

          <View className="mb-6">
            <Text className="text-base font-bold mb-3" style={{ color: colors.textSecondary }}>
              Egg Types ({eggTypes.length})
            </Text>

            {loading && eggTypes.length === 0 ? (
              <View className="py-8 items-center">
                <Text style={{ color: colors.textSecondary }}>Loading...</Text>
              </View>
            ) : eggTypes.length === 0 ? (
              <View
                className="rounded-2xl border p-8 items-center"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <Ionicons name="egg-outline" size={48} color={colors.textSecondary} />
                <Text className="text-base font-semibold mt-3" style={{ color: colors.textPrimary }}>
                  No Prices Set Yet!
                </Text>
                <Text className="text-sm text-center mt-1" style={{ color: colors.textSecondary }}>
                  Add your first egg type to get started
                </Text>
              </View>
            ) : (
              eggTypes.map((eggType) => (
                <View
                  key={eggType.id}
                  className="rounded-2xl border p-4 mb-3"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <View className="mb-3">
                    <Text className="text-xs font-semibold mb-1" style={{ color: colors.textSecondary }}>
                      Name
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="text-outline" size={18} color={colors.textSecondary} />
                      <Text className="text-base font-bold" style={{ color: colors.textPrimary }}>
                        {eggType.name}
                      </Text>
                    </View>
                  </View>

                  <View className="mb-3">
                    <Text className="text-xs font-semibold mb-1" style={{ color: colors.textSecondary }}>
                      Description
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="document-text-outline" size={18} color={colors.textSecondary} />
                      <Text className="text-sm" style={{ color: colors.textPrimary }}>
                        {eggType.description || '—'}
                      </Text>
                    </View>
                  </View>

                  {eggType.units && eggType.units.length > 0 && (
                    <View className="mb-3">
                      <Text className="text-xs font-semibold mb-2" style={{ color: colors.textSecondary }}>
                        Units ({eggType.units.length})
                      </Text>
                      {eggType.units.map((unit, index) => (
                        <View key={index} className="bg-opacity-20 rounded-lg p-2 mb-1" style={{ backgroundColor: colors.primary + '20' }}>
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
                    </View>
                  )}

                  <View className="flex-row gap-2 mt-2 pt-3 border-t" style={{ borderColor: colors.border }}>
                    <TouchableOpacity
                      className="flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl"
                      style={{ backgroundColor: colors.background }}
                      onPress={() => handleEdit(eggType.id)}
                    >
                      <Ionicons name="create-outline" size={18} color={colors.primary} />
                      <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                        Edit
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl"
                      style={{ backgroundColor: '#FEE2E2' }}
                      onPress={() => handleDelete(eggType.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#DC2626" />
                      <Text className="text-sm font-semibold" style={{ color: '#DC2626' }}>
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