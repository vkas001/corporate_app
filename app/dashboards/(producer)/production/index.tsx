import { router } from 'expo-router';
import { createProductionStyles } from '@/style/production/productionStyleSheet';
import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Production() {
  const { colors } = useTheme();
  const styles = createProductionStyles(colors);

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
      route: './production/notification',
    }
  ];

  return (
    <SafeAreaView style={styles.safearaContainer}>
      <View style={styles.productionHeader}>
        <Text style={styles.headerTitle}>Productions</Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        {records.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route as any)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
              marginBottom: 12, // spacing between cards
              borderRadius: 12,
              backgroundColor: colors.primaryDark,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12
            }}>
              <Ionicons
                name={item.icon}
                size={24}
                color={colors.textPrimary}
              />
              <Text
                style={styles.recordsTitle}>
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
