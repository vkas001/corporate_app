import NotificationItem, { NotificationItemProps } from '@/components/notification/NotificaitonItem';
import CustomButton from '@/components/ui/CustomButton';
import CustomHeader from '@/components/ui/CustomHeader';
import { notificationData } from '@/data/notificationdata';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FilterKey = 'all' | 'payment' | 'alerts' | 'reminders';

const filters: { key: FilterKey; label: string; types?: NotificationItemProps['type'][] }[] = [
    { key: 'all', label: 'All' },
    { key: 'payment', label: 'Payments', types: ['payment'] },
    { key: 'alerts', label: 'Alerts', types: ['lowStock'] },
    { key: 'reminders', label: 'Reminders', types: ['reminder', 'rateUpdate'] },
];

export default function Notification() {
    const { colors } = useTheme();
    const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

    const filteredNotifications = useMemo(() => {
        const selected = filters.find(filter => filter.key === activeFilter);
        if (!selected || !selected.types) return notificationData;
        return notificationData.filter(item => selected.types?.includes(item.type));
    }, [activeFilter]);

    const unreadCount = useMemo(
        () => notificationData.filter(item => item.status === 'new').length,
        []
    );
    const alertCount = useMemo(
        () => notificationData.filter(item => item.type === 'lowStock').length,
        []
    );
    const paymentCount = useMemo(
        () => notificationData.filter(item => item.type === 'payment').length,
        []
    );

    return (
        <SafeAreaView className="flex-1"
            style={{ backgroundColor: colors.background }}>
            <CustomHeader title="Notifications" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 50, paddingTop: -16 }}
                showsVerticalScrollIndicator={false}
            >

                <View className="mt-4 flex-row items-center">
                    <View className="flex-1">
                        <Text className="text-base font-bold"
                            style={{ color: colors.textPrimary }}>
                            Activities
                        </Text>

                    </View>
                    <CustomButton
                        title="Mark all as read"
                        size='small'
                        onPress={() => { }}
                    />
                </View>

                <View className="flex-row mt-3.5 pb-2">
                    <StatPill
                        label="Unread"
                        value={`${unreadCount}`}
                        helper="need review"
                        icon="mail-unread-outline"
                        color={colors.primary}
                        textColor={colors.textPrimary}
                        mutedTextColor={colors.textSecondary}
                        style={{ marginRight: 10 }}
                    />
                    <StatPill
                        label="Payments"
                        value={`${paymentCount}`}
                        helper="this week"
                        icon="card-outline"
                        color={colors.primary}
                        textColor={colors.textPrimary}
                        mutedTextColor={colors.textSecondary}
                        style={{ marginRight: 8 }}
                    />
                    <StatPill
                        label="Alerts"
                        value={`${alertCount}`}
                        helper="requires action"
                        icon="alert-circle-outline"
                        color="#D64545"
                        textColor={colors.textPrimary}
                        mutedTextColor={colors.textSecondary}
                    />
                </View>

                <View className="flex-row flex-wrap mb-2">
                    {filters.map(filter => {
                        const isActive = filter.key === activeFilter;
                        return (
                            <TouchableOpacity
                                key={filter.key}
                                activeOpacity={0.85}
                                onPress={() => setActiveFilter(filter.key)}
                                className="px-3 rounded-lg mr-2 mb-2 border-[0.5px] flex-row items-center"
                                style={{
                                    borderColor: isActive ? colors.primary : colors.border,
                                    backgroundColor: isActive ? colors.primaryDark : colors.primary,
                                }}
                            >
                                <Text
                                    className="font-bold"
                                    style={{
                                        color: isActive ? colors.textPrimary : colors.background,
                                    }}
                                >
                                    {filter.label}
                                </Text>
                                <View
                                    className="ml-1.5 rounded-full"
                                    style={{
                                        backgroundColor: isActive ? colors.primaryDark : colors.primary,
                                    }}
                                >
                                    <Text className="font-medium"
                                        style={{ color: isActive ? colors.textPrimary : colors.background }}>
                                        {
                                            filter.types
                                                ? notificationData.filter(item => filter.types?.includes(item.type)).length
                                                : notificationData.length
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View>
                    {filteredNotifications.map(item => (
                        <NotificationItem key={item.id} {...item} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

interface StatPillProps {
    label: string;
    value: string;
    helper: string;
    color: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
    textColor: string;
    mutedTextColor: string;
    style?: ViewStyle;
}

const StatPill: React.FC<StatPillProps> = ({
    label,
    value,
    helper,
    color,
    icon,
    textColor,
    mutedTextColor,
    style,
}) => (
    <View
        className="flex-1 p-3 min-h-[96px] rounded-xl border"
        style={{
            backgroundColor: withOpacity(color, 0.12),
            borderColor: withOpacity(color, 0.35),
            ...style,
        }}
    >
        <View className="flex-row items-center mb-1.5">
            <Ionicons name={icon} size={16} color={color} />
            <Text className="ml-1.5 text-xs font-bold"
                style={{ color }}>{label}</Text>
        </View>
        <Text className="text-[22px] font-extrabold leading-[26px]"
            style={{ color: textColor }}>{value}</Text>
        <Text className="text-xs mt-0.5"
            style={{ color: mutedTextColor }}>{helper}</Text>
    </View>
);

const withOpacity = (hexColor: string, opacity: number) => {
    const sanitized = hexColor.replace('#', '');
    const bigint = parseInt(sanitized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};