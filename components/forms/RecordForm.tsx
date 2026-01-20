import { useTheme } from '@/theme';
import { formatFullDate } from '@/utils/dateFormatter';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../ui/CustomButton';
import CustomInput from '../ui/CustomInput';

type Props = {
    visible: boolean;
    title: string;

    categories: string[];
    unitMap: Record<string, string[]>;

    onSubmit: (data: {
        category: string;
        unit: string;
        quantity: number;
        date?: string;
    }) => void;

    onClose: () => void;
};

export default function RecordFormModal({
    visible,
    title,
    categories,
    unitMap,
    onSubmit,
    onClose,
}: Props) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const [category, setCategory] = useState(categories[0]);
    const [unit, setUnit] = useState(unitMap[categories[0]][0]);
    const [quantity, setQuantity] = useState('');
    const [quantityError, setQuantityError] = useState<string | undefined>();
    const [isSaving, setIsSaving] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [date] = useState<Date>(new Date());

    const unitsForCategory = useMemo(() => unitMap[category] ?? [], [unitMap, category]);

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    useEffect(() => {
        setUnit((unitMap[category] && unitMap[category][0]) || '');
    }, [category, unitMap]);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const renderSegmented = (
        options: string[],
        selected: string,
        onSelect: (value: string) => void
    ) => (
        <View
            className="flex-row rounded-xl p-1"
            style={{ backgroundColor: colors.primary }}
        >
            {options.map((item) => {
                const isActive = selected === item;

                return (
                    <TouchableOpacity
                        key={item}
                        onPress={() => onSelect(item)}
                        className="flex-1 items-center rounded-lg py-2"
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: isActive ? colors.primaryDark : 'transparent',
                        }}
                    >
                        <Text
                            className="font-semibold text-xs"
                            style={{
                                color: isActive ? colors.textPrimary : colors.background,
                            }}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    const validate = () => {
        const n = Number(quantity);
        if (!quantity || Number.isNaN(n)) {
            setQuantityError('Enter a valid number');
            return false;
        }
        if (n <= 0) {
            setQuantityError('Quantity must be greater than 0');
            return false;
        }
        setQuantityError(undefined);
        return true;
    };

    const handleSave = async () => {
        if (!validate()) return;
        setIsSaving(true);
        try {
            onSubmit({
                category,
                unit,
                quantity: Number(quantity),
                date: formatFullDate(date),
            });
            setQuantity('');
            onClose();
        } catch (error) {
            console.error('Error saving record:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
            >
                <View className="flex-1 justify-end">
                    {/* Dimmed backdrop that closes on tap */}
                    <Pressable
                        onPress={() => {
                            if (isSaving) return;
                            if (isKeyboardVisible) {
                                Keyboard.dismiss();
                                return;
                            }
                            onClose();
                        }}
                        className="flex-1"
                        style={{ backgroundColor: '#00000066' }}
                    />

                    {/* Bottom sheet */}
                    <View
                        className="rounded-t-3xl px-4 pb-4"
                        style={{
                            backgroundColor: colors.background,
                            paddingTop: 6,
                            paddingBottom: Math.max(12, insets.bottom || 0) + 8,
                            maxHeight: '85%',
                        }}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 16 }}
                        >
                            {/* Handle + Header */}
                            <View className="items-center">
                                <View
                                    className="w-10 h-1.5 rounded-full my-2"
                                    style={{ backgroundColor: colors.border }}
                                />
                            </View>
                            {/* Date */}
                            <View className="items-center gap-2 mt-3 mb-4">
                                <Text className="font-semibold" style={{ color: colors.textSecondary }}>
                                    {formatFullDate(date)}
                                </Text>
                            </View>

                            <View className="flex-row items-center justify-between mb-2">
                                <Text
                                    className="text-lg font-semibold"
                                    style={{ color: colors.textSecondary }}
                                >
                                    {title}
                                </Text>
                            </View>

                            {/* Category */}
                            <Text className="mb-2 text-sm" style={{ color: colors.textSecondary }}>
                                Category
                            </Text>
                            {renderSegmented(categories, category, handleCategoryChange)}

                            {/* Quantity */}
                            <CustomInput
                                placeholder="Enter quantity"
                                value={quantity}
                                onChangeText={(text) => {
                                    setQuantity(text);
                                    if (quantityError) setQuantityError(undefined);
                                }}
                                label="Quantity"
                                keyboardType="numeric"
                                error={quantityError}
                            />

                            {/* Actions */}
                            <View className="flex-row justify-end mt-4 gap-3">
                                <TouchableOpacity
                                    onPress={onClose}
                                    disabled={isSaving}
                                    className="px-3 py-2 rounded-xl"
                                    style={{ opacity: isSaving ? 0.6 : 1 }}
                                >
                                    <Text className="font-semibold" style={{ color: colors.textSecondary }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <CustomButton
                                    title={isSaving ? 'Saving...' : 'Save'}
                                    onPress={handleSave}
                                    isLoading={isSaving}
                                    size="small"
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}