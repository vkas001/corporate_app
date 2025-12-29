import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  onClose: () => void;
};

interface BillingCard {
  id: string;
  last4: string;
  brand: string;
  expiry: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

const getStatusColor = (status: string, primaryColor: string) => {
  switch (status) {
    case 'paid':
      return '#1E8E3E';
    case 'pending':
      return primaryColor;
    case 'overdue':
      return '#D14343';
    default:
      return '#9CA3AF';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'paid':
      return 'checkmark-circle';
    case 'pending':
      return 'clock-outline';
    case 'overdue':
      return 'alert-circle';
    default:
      return 'help-circle-outline';
  }
};

export default function BillingScreen({ onClose }: Props) {
  const { colors } = useTheme();

  const [cards] = useState<BillingCard[]>([
    { id: '1', last4: '4242', brand: 'Visa', expiry: '12/25', isDefault: true },
    { id: '2', last4: '5555', brand: 'Mastercard', expiry: '08/26', isDefault: false },
  ]);

  const [invoices] = useState<Invoice[]>([
    { id: '1', date: 'Dec 1, 2025', amount: '$299.99', status: 'paid', description: 'Monthly subscription' },
    { id: '2', date: 'Nov 1, 2025', amount: '$299.99', status: 'paid', description: 'Monthly subscription' },
    { id: '3', date: 'Oct 1, 2025', amount: '$299.99', status: 'pending', description: 'Monthly subscription' },
  ]);

  return (
    <SafeAreaView className="flex-1 mb-8"
      style={{
        backgroundColor: colors.background

      }}>

      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          onPress={onClose}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold"
          style={{ color: colors.textPrimary }}>
          Billing Details
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* Subscription Section */}
        <View className="mb-6">
          <Text className="text-base font-bold mb-3"
            style={{ color: colors.textSecondary }}>
            Subscription
          </Text>
          <View className="rounded-2xl border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <View className="flex-row">
              <View className="w-1 rounded-l-2xl"
                style={{ backgroundColor: colors.primary }} />
              <View className="flex-1 p-4">
                <View className="flex-row items-start justify-between mb-4">
                  <View>
                    <Text className="text-lg font-bold mb-1"
                      style={{ color: colors.textPrimary }}>
                      Professional Plan
                    </Text>
                    <Text className="text-base font-semibold"
                      style={{ color: colors.textSecondary }}>
                      $299.99/month
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1 px-3 py-1 rounded-full"
                    style={{ backgroundColor: colors.primary }}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.surface} />
                    <Text className="text-sm font-medium"
                      style={{ color: colors.surface }}>
                      Active
                    </Text>
                  </View>
                </View>
                <View className="h-px mb-4"
                  style={{ backgroundColor: colors.border }} />
                <View className="gap-3 mb-4">
                  <View className="flex-row justify-between">
                    <Text className="text-sm"
                      style={{ color: colors.textSecondary }}>
                      Renewal Date
                    </Text>
                    <Text className="text-sm font-medium"
                      style={{ color: colors.textPrimary }}>
                      Jan 1, 2026
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm"
                      style={{ color: colors.textSecondary }}>
                      Billing Cycle
                    </Text>
                    <Text className="text-sm font-medium"
                      style={{ color: colors.textPrimary }}>
                      Monthly
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="py-3 rounded-xl items-center"
                  style={{ backgroundColor: colors.primary }}>
                  <Text className="text-sm font-semibold"
                    style={{ color: colors.surface }}>
                    Change Plan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold"
              style={{ color: colors.textSecondary }}>
              Payment Methods
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {cards.map((card) => (
            <View
              key={card.id}
              className="rounded-2xl p-4 mb-3 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: colors.primary,
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
              <View className="flex-row items-center mb-3">
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3 border"
                  style={{ backgroundColor: colors.background, borderColor: colors.border }}
                >
                  <Ionicons name="card-outline" size={24} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold mb-1"
                    style={{ color: colors.textPrimary }}>
                    {card.brand}
                  </Text>
                  <Text className="text-sm mb-1"
                    style={{ color: colors.textSecondary }}>
                    •••• •••• •••• {card.last4}
                  </Text>
                  <Text className="text-xs"
                    style={{ color: colors.textSecondary }}>
                    Expires {card.expiry}
                  </Text>
                </View>
                {card.isDefault && (
                  <View className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: colors.primary }}>
                    <Text className="text-xs font-medium"
                      style={{ color: colors.surface }}>
                      Default
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 py-2.5 rounded-xl border items-center flex-row justify-center gap-1.5"
                  style={{ borderColor: colors.border }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="create-outline" size={16} color={colors.primary} />
                  <Text className="text-xs font-semibold"
                    style={{ color: colors.textSecondary }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 py-2.5 rounded-xl border items-center flex-row justify-center gap-1.5"
                  style={{ borderColor: colors.border }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={16} color="#D14343" />
                  <Text className="text-xs font-semibold"
                    style={{ color: "#D14343" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Invoices */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold"
              style={{ color: colors.textSecondary }}>
              Recent Invoices
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-sm font-semibold"
                style={{ color: colors.primary }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="rounded-2xl border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            {invoices.map((invoice, index) => (
              <View
                key={invoice.id}
                className="flex-row items-center justify-between p-3"
                style={{
                  borderBottomWidth: index < invoices.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <View className="flex-1">
                  <Text className="text-sm font-medium mb-1"
                    style={{ color: colors.textPrimary }}>
                    {invoice.date}
                  </Text>
                  <Text className="text-xs"
                    style={{ color: colors.textSecondary }}>
                    {invoice.description}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-bold mb-1"
                    style={{ color: colors.textPrimary }}>
                    {invoice.amount}
                  </Text>
                  <View className="flex-row items-center gap-1.5">
                    <View
                      className="flex-row items-center gap-1 px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${getStatusColor(invoice.status, colors.primary)}15` }}
                    >
                      <Ionicons
                        name={getStatusIcon(invoice.status) as any}
                        size={11}
                        color={getStatusColor(invoice.status, colors.primary)}
                      />
                      <Text className="text-xs font-bold capitalize"
                        style={{ color: getStatusColor(invoice.status, colors.primary) }}>
                        {invoice.status}
                      </Text>
                    </View>
                    <TouchableOpacity className="w-6 h-6 rounded-full items-center justify-center"
                      style={{ backgroundColor: colors.background }}>
                      <Ionicons name="download-outline" size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Billing Address */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold"
              style={{ color: colors.textSecondary }}>
              Billing Address
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="create-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View className="rounded-2xl p-4 border flex-row"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <View className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: colors.background }}>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold mb-2"
                style={{ color: colors.textPrimary }}>
                John Doe
              </Text>
              <Text className="text-sm mb-1"
                style={{ color: colors.textSecondary }}>
                123 Main Street
              </Text>
              <Text className="text-sm mb-1"
                style={{ color: colors.textSecondary }}>
                New York, NY 10001
              </Text>
              <Text className="text-sm"
                style={{ color: colors.textSecondary }}>
                United States
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
