import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

type Period = 'Today' | 'Week' | 'Month';

type StatItem = {
    label: string;
    value: string | number;
    subText?: string;
    change?: string;
    trend?: 'up' | 'down';
};

type Props = {
    categories: string[];
    onCategorySelect: (category: string) => void;
    title: string;

    dropdownLabel: string;
    onDropdownPress: () => void;
    dropdownOpen: boolean;

    period: Period;
    onPeriodChange: (period: Period) => void;

    stats: StatItem[];
};

export default function DashboardOverview({
    title,
    categories,
    onCategorySelect,
    dropdownLabel,
    onDropdownPress,
    dropdownOpen,
    period,
    onPeriodChange,
    stats,
}: Props) {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const periods: Period[] = ['Today', 'Week', 'Month'];

    const translatedPeriod = (period: Period) => {
        return t(`dashboard.periods.${period.toLowerCase()}`);
    };

    const translateCategory = (category: string) => {
        return t(`categories.${category.toLowerCase()}`, category);
    };

    return (
        <>
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                    {title}
                </Text>
                <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: `${colors.primary}15` }}>
                    <Ionicons name="stats-chart" size={20} color={colors.primary} />
                </View>
            </View>

            <View 
                className="rounded-2xl p-4 border"
                style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    shadowColor: colors.primary,
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 3,
                }}
            >
                <View className="relative mb-4">
                    <TouchableOpacity
                        onPress={onDropdownPress}
                        activeOpacity={0.7}
                        className="flex-row items-center justify-between px-4 py-3 rounded-xl border"
                        style={{ 
                            backgroundColor: colors.background,
                            borderColor: colors.border,
                        }}
                    >
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="grid-outline" size={18} color={colors.primary} />
                            <Text className="font-semibold text-base" style={{ color: colors.textPrimary }}>
                                {dropdownLabel}
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-down"
                            size={20}
                            color={colors.textSecondary}
                            style={{
                                transform: [{ rotate: dropdownOpen ? '180deg' : '0deg' }],
                            }}
                        />
                    </TouchableOpacity>
                    {dropdownOpen && (
                        <View
                            className="absolute top-14 left-0 right-0 rounded-xl py-1 border z-50"
                            style={{
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                shadowColor: '#000',
                                shadowOpacity: 0.15,
                                shadowRadius: 8,
                                shadowOffset: { width: 0, height: 4 },
                                elevation: 8,
                            }}
                        >
                            {categories
                                .filter(item => item !== dropdownLabel)
                                .map(item => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => onCategorySelect(item)}
                                        activeOpacity={0.7}
                                        className="py-3 px-4 flex-row items-center gap-2"
                                    >
                                        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                                        <Text className="font-semibold" style={{ color: colors.textPrimary }}>
                                            {t(`dashboard.categories.${item.toLowerCase()}`, item)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    )}
                </View>

                <View className="flex-row gap-2 mb-5 p-1 rounded-xl" style={{ backgroundColor: colors.background }}>
                    {(['Today', 'Week', 'Month'] as Period[]).map(item => {
                        const active = period === item;

                        return (
                            <TouchableOpacity
                                key={item}
                                onPress={() => onPeriodChange(item)}
                                activeOpacity={0.8}
                                className="flex-1 px-3 py-2.5 rounded-lg items-center"
                                style={{
                                    backgroundColor: active ? colors.primaryDark : 'transparent',
                                }}
                            >
                                <Text className="font-bold text-xs" style={{ color: colors.textPrimary }}>
                                    {t(`dashboard.periods.${item.toLowerCase()}`)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View className="flex-row flex-wrap gap-3">
                    {stats.map((item, index) => (
                        <View
                            key={index}
                            className="w-[48%] rounded-2xl p-4 border"
                            style={{ 
                                backgroundColor: colors.background,
                                borderColor: colors.border,
                            }}
                        >
                            <Text className="text-xs font-semibold uppercase mb-2" style={{ color: colors.textSecondary }}>
                                {item.label}
                            </Text>

                            <Text className="text-2xl font-black mb-1" style={{ color: colors.textPrimary }}>
                                {item.value}
                            </Text>

                            {item.subText && (
                                <Text className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                                    {item.subText}
                                </Text>
                            )}

                            {item.change && (
                                <View 
                                    className="flex-row items-center gap-1 mt-2 px-2 py-1 rounded-full self-start"
                                    style={{ 
                                        backgroundColor: item.trend === 'down' ? '#fee2e2' : '#dcfce7' 
                                    }}
                                >
                                    <Ionicons
                                        name={item.trend === 'down' ? 'arrow-down' : 'arrow-up'}
                                        size={12}
                                        color={item.trend === 'down' ? '#dc2626' : '#16a34a'}
                                    />
                                    <Text 
                                        className="text-xs font-bold"
                                        style={{ color: item.trend === 'down' ? '#dc2626' : '#16a34a' }}
                                    >
                                        {item.change}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </>
    );
}
