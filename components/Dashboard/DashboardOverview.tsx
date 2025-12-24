import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

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

    return (
        <>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12, color: colors.textPrimary }}>
                {title}
            </Text>

            <View
                style={{
                    backgroundColor: colors.background,
                    borderRadius: 16,
                }}
            >
                <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                        onPress={onDropdownPress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                            {dropdownLabel}
                        </Text>
                        <Ionicons
                            name="chevron-down"
                            size={18}
                            color={colors.textPrimary}
                            style={{
                                transform: [{ rotate: dropdownOpen ? '180deg' : '0deg' }],
                            }}
                        />
                    </TouchableOpacity>
                    {dropdownOpen && (
                    <View
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 0,
                            backgroundColor: colors.background,
                            borderRadius: 12,
                            paddingVertical: 8,
                            minWidth: 140,
                            zIndex: 100,
                            elevation: 5,
                        }}
                    >
                        {categories
                        .filter(item => item !== dropdownLabel)
                        .map(item => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => onCategorySelect(item)}
                                style={{
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    )}
                </View>

                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    {(['Today', 'Week', 'Month'] as Period[]).map(item => {
                        const active = period === item;

                        return (
                            <TouchableOpacity
                                key={item}
                                onPress={() => onPeriodChange(item)}
                                style={{
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 12,
                                    backgroundColor: active ? colors.primaryDark : 'transparent',
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.textPrimary,
                                        fontWeight: '600',
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                    {stats.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                width: '48%',
                                backgroundColor: colors.primaryDark,
                                borderRadius: 14,
                                padding: 14,
                            }}
                        >
                            <Text style={{ color: colors.textPrimary, fontSize: 12 }}>
                                {item.label}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '700',
                                    color: colors.textPrimary,
                                    marginVertical: 4,
                                }}
                            >
                                {item.value}
                            </Text>

                            {item.subText && (
                                <Text style={{ color: colors.textPrimary, fontSize: 12 }}>
                                    {item.subText}
                                </Text>
                            )}

                            {item.change && (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                    <Ionicons
                                        name={item.trend === 'down' ? 'arrow-down' : 'arrow-up'}
                                        size={14}
                                        color={item.trend === 'down' ? 'red' : 'green'}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 4,
                                            fontSize: 12,
                                            color: colors.textPrimary,
                                        }}
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
