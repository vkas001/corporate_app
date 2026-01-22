import CustomHeader from '@/components/ui/CustomHeader';
import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Sales() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleBack = () => {
    // From sales tab landing, always go back to dashboard
    router.navigate('/dashboards/(seller)');
  };

  type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

  type RecordItem = {
    title: string;
    icon: IonIconName;
    route: string;
  };

  const records: RecordItem[] = [
    {
      title: 'Sales Records',
      icon: 'document-text-outline',
      route: '/dashboards/(seller)/sales/sales-records',
    },
    {
      title: 'Purchase Records',
      icon: 'time-outline',
      route: '/dashboards/(seller)/sales/purchase-records',
    },
  
    {
      title: 'Payment Records',
      icon: 'card-outline',
      route: '/dashboards/(seller)/sales/payment-records',
    },
    {
      title: 'History',
      icon: 'time-outline',
      route: '/dashboards/(seller)/sales/history',
    }
  ];

  return (
    <SafeAreaView className="flex-1"
      style={{
        backgroundColor: colors.background

      }}>
      <CustomHeader title="Records" onBackPress={handleBack} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              try {
                setRefreshing(true);
                await new Promise((r) => setTimeout(r, 600));
              } finally {
                setRefreshing(false);
              }
            }}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {records.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route as any)}
            className="flex-row items-center justify-between p-6 mb-3 rounded-2xl"
            style={{ backgroundColor: colors.primaryDark }}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name={item.icon} size={24} color={colors.textPrimary} />
              <Text className="text-base font-semibold" style={{ color: colors.textPrimary }}>
                {item.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
