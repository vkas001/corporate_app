import NotificationItem from '@/components/notification/NotificaitonItem';
import CustomButton from '@/components/ui/CustomButton';
import CustomHeader from '@/components/ui/CustomHeader';
import { notificationData } from '@/data/notification/notificationdata';
import { FILTER_MAP, FilterKey, getUnreadCountByFilter } from '@/data/notification/notificationfilter';
import { useTheme } from '@/theme/themeContext';
import { AppNotification } from '@/types/notificaion';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const filters: {
    key: FilterKey;
    label: string;
    types?: AppNotification['type'][];
}[] = [
    { key: 'all', label: 'All' },
    { key: 'payment', label: 'Payments', types: ['payment'] },
    { key: 'reminders', label: 'Reminders', types: ['reminder', 'rateUpdate'] },
    { key: 'alerts', label: 'Alerts', types: ['lowStock'] },
    ];

export default function Notification() {
    const { colors } = useTheme();
    const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
    const [notifications, setNotifications] = useState<AppNotification[]>(notificationData);

    const filteredNotifications = useMemo(() => {
        const selected = filters.find(f => f.key === activeFilter);
        if (!selected?.types) return notifications;
        return notifications.filter(n => selected.types!.includes(n.type));
    }, [activeFilter, notifications]);

    const unreadCount = notifications.filter(n => n.status === "new").length;
    const paymentCount = notifications.filter(n => n.type === "payment").length;
    const alertCount = notifications.filter(n => n.type === "lowStock").length;

    const handleMarkAllAsRead = () => {
        const selected = filters.find(f => f.key === activeFilter);
        
        setNotifications(prevNotifications =>
            prevNotifications.map(notification => {
                // If "all" filter is active, mark all as read
                if (!selected?.types) {
                    return { ...notification, status: "read" as const };
                }
                
                // Otherwise, only mark notifications of the selected type(s) as read
                if (selected.types.includes(notification.type)) {
                    return { ...notification, status: "read" as const };
                }
                
                return notification;
            })
        );
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <CustomHeader title="Notifications" />

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Mark All Read */}
                <View className="mt-5 flex-row items-center justify-between pb-4 border-b"
                    style={{ borderBottomColor: colors.border }}>
                    <View>
                        <Text
                            className="text-lg font-bold"
                            style={{ color: colors.textPrimary }}
                        >
                            Activities
                        </Text>
                        <Text
                            className="text-xs mt-0.5"
                            style={{ color: colors.textSecondary }}
                        >
                            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                        </Text>
                    </View>
                    {unreadCount > 0 && (
                        <CustomButton
                            title="Mark all as read"
                            size="small"
                            onPress={handleMarkAllAsRead}
                        />
                    )}
                </View>

                {/* Filter Pills */}
                <View className="flex-row flex-wrap gap-2 mt-5 mb-4 pb-4 border-b"
                    style={{ borderBottomColor: colors.border }}>
                    {Object.entries(FILTER_MAP).map(([key]) => {
                        const filterKey = key as FilterKey;
                        const isActive = filterKey === activeFilter;
                        const count = getUnreadCountByFilter(notifications, filterKey);

                        return (
                            <TouchableOpacity
                                key={filterKey}
                                activeOpacity={0.7}
                                onPress={() => setActiveFilter(filterKey)}
                                className="px-2.5 py-1.5 rounded-full border-2 flex-row items-center justify-center"
                                style={{
                                    borderColor: isActive ? colors.primary : colors.border,
                                    backgroundColor: isActive ? colors.primary : colors.surface,
                                }}
                            >
                                <Text
                                    className="font-semibold text-sm"
                                    style={{
                                        color: isActive ? colors.textPrimary : colors.textPrimary,
                                    }}
                                >
                                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                                </Text>
                                {count > 0 && (
                                    <View
                                        className="ml-2 px-2 py-0.5 rounded-full"
                                        style={{
                                            backgroundColor: isActive ? colors.primary : colors.primary,
                                        }}
                                    >
                                        <Text
                                            className="text-xs font-bold"
                                            style={{
                                                color: isActive ? colors.background : colors.background,
                                            }}
                                        >
                                            {count}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Notification List or Empty State */}
                {filteredNotifications.length > 0 ? (
                    <View className="mt-2 gap-2.5">
                        {filteredNotifications.map(item => (
                            <NotificationItem
                                key={item.id}
                                item={item}
                                onPress={() => {
                                    // later → open notification details
                                }}
                            />
                        ))}
                    </View>
                ) : (
                    <View className="mt-16 items-center justify-center">
                        <View
                            className="w-16 h-16 rounded-full items-center justify-center mb-4"
                            style={{ backgroundColor: colors.surface }}
                        >
                            <Ionicons
                                name="notifications-off-outline"
                                size={32}
                                color={colors.textSecondary}
                            />
                        </View>
                        <Text
                            className="text-base font-semibold"
                            style={{ color: colors.textPrimary }}
                        >
                            No notifications
                        </Text>
                        <Text
                            className="text-sm text-center mt-1"
                            style={{ color: colors.textSecondary }}
                        >
                            You're all caught up! Check back soon.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}