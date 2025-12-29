import CustomButton from '@/components/Buttons/CustomButton';
import NotificationItem, { NotificationItemProps } from '@/components/Notification/NotificaitonItem';
import CustomHeader from '@/components/Screens/CustomHeader';
import { notificationData } from '@/data/notifications';
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <CustomHeader title="Notifications" />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 16, paddingBottom: 32, paddingTop: -16 }}
                showsVerticalScrollIndicator={false}
            >

                    <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '700' }}>
                                Activities
                            </Text>

                        </View>
                        <CustomButton
                            title="Mark all as read"
                            size='small'
                            onPress={() => { }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 14, paddingBottom: 8 }}>
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

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
                    {filters.map(filter => {
                        const isActive = filter.key === activeFilter;
                        return (
                            <TouchableOpacity
                                key={filter.key}
                                activeOpacity={0.85}
                                onPress={() => setActiveFilter(filter.key)}
                                style={{
                                    paddingHorizontal: 12,
                                    borderRadius: 8,
                                    marginRight: 8,
                                    marginBottom: 8,
                                    borderWidth: 0.5,
                                    borderColor: isActive ? colors.primary : colors.border,
                                    backgroundColor: isActive ? colors.primaryDark : colors.primary,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: isActive ? colors.textPrimary : colors.background,
                                        fontWeight: '700',
                                    }}
                                >
                                    {filter.label}
                                </Text>
                                <View
                                    style={{
                                        marginLeft: 6,
                                        backgroundColor: isActive ? colors.primaryDark : colors.primary,
                                        borderRadius: 20,
                                    }}
                                >
                                    <Text style={{ color: isActive ? colors.textPrimary : colors.background, fontWeight: '500' }}>
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
        style={{
            flex: 1,
            padding: 12,
            minHeight: 96,
            backgroundColor: withOpacity(color, 0.12),
            borderRadius: 12,
            borderWidth: 1,
            borderColor: withOpacity(color, 0.35),
            ...style,
        }}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Ionicons name={icon} size={16} color={color} />
            <Text style={{ marginLeft: 6, fontSize: 12, color: color, fontWeight: '700' }}>{label}</Text>
        </View>
        <Text style={{ fontSize: 22, fontWeight: '800', color: textColor, lineHeight: 26 }}>{value}</Text>
        <Text style={{ fontSize: 12, color: mutedTextColor, marginTop: 2 }}>{helper}</Text>
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