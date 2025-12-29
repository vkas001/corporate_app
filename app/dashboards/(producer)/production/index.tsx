import CustomHeader from '@/components/Screens/CustomHeader';
import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Production() {
  const { colors } = useTheme();

  type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

  type RecordItem = {
    title: string;
    icon: IonIconName;
    route: string;
  };

  const records: RecordItem[] = [
    {
      title: 'Production Records',
      icon: 'document-text-outline',
      route: './production/production-records',
    },
    {
      title: 'Mortality Records',
      icon: 'time-outline',
      route: './production/mortality-records',
    },
    {
      title: 'Batch Records',
      icon: 'cube-outline',
      route: './production/batch-records',
    },
    {
      title: 'Feed Records',
      icon: 'nutrition-outline',
      route: './production/feed-records',
    },
    {
      title: 'Payment Records',
      icon: 'card-outline',
      route: './production/payment-records',
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      route: '/dashboards/notification',
    },
    {
      title: 'History',
      icon: 'time-outline',
      route: './production/history',
    }
  ];

  return (
    <SafeAreaView className="flex-1"
      style={{
        backgroundColor: colors.background

      }}>
      <CustomHeader title="Records" />

      <View className="px-4 mt-3">
        {records.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route as any)}
            className="flex-row items-center justify-between p-6 mb-3 rounded-2xl"
            style={{ backgroundColor: colors.primaryDark }}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons
                name={item.icon}
                size={24}
                color={colors.textPrimary}
              />
              <Text className="text-base font-semibold"
                style={{ color: colors.textPrimary }}>
                {item.title}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
