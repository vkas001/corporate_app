import { useTheme } from '@/theme';
import React, { useEffect, useState } from 'react';
import {
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CustomInput from '../Buttons/CustomInput';

type Props = {
    visible: boolean;
    title: string;

    categories: string[];
    unitMap: Record<string, string[]>;

    onSubmit: (data: {
        category: string;
        unit: string;
        quantity: number;
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
    const [category, setCategory] = useState(categories[0]);
    const [unit, setUnit] = useState(unitMap[categories[0]][0]);
    const [quantity, setQuantity] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    useEffect(() => {
        setUnit(unitMap[category][0]);
    }, [category, unitMap]);

    const renderSegmented = (
        options: string[],
        selected: string,
        onSelect: (value: string) => void
    ) => (
        <View style={{
            flexDirection: 'row',
            backgroundColor: colors.primary,
            borderRadius: 14,
            padding: 4
        }}>
            {options.map((item) => {
                const isActive = selected === item;

                return (
                    <TouchableOpacity
                        key={item}
                        onPress={() => onSelect(item)}
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            backgroundColor: isActive
                                ? colors.primaryDark
                                : 'transparent',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '600',
                                color: isActive
                                    ? colors.textPrimary
                                    : colors.background,
                            }}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    const handleSave = async () => {
        if (!quantity) return;
        setIsSaving(true);
        try {
            await onSubmit({
                category,
                unit,
                quantity: Number(quantity),
            });
            onClose();
        } catch (error) {
            console.error('Error saving record:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <Pressable
                    onPress={isSaving ? undefined : onClose}
                    style={{ flex: 1 }}
                />
                <View
                    style={{
                        backgroundColor: colors.background,
                        padding: 16,
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            marginBottom: 16,
                            color: colors.textPrimary,
                        }}
                    >
                        {title}
                    </Text>

                    <Text style={{ marginBottom: 8, color: colors.textSecondary }}>
                        Category
                    </Text>
                    {renderSegmented(categories, category, handleCategoryChange)}

                    <Text
                        style={{
                            marginVertical: 12,
                            color: colors.textSecondary,
                        }}
                    >
                        Unit
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                        borderRadius: 14,
                        padding: 4
                    }}>
                        {unitMap[category].map((item) => {
                            const isActive = unit === item;
                            return (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => setUnit(item)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 10,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        backgroundColor: isActive
                                            ? colors.primaryDark
                                            : 'transparent',
                                    }}
                                >
                                    <Text style={{
                                        fontWeight: '600',
                                        color: isActive
                                            ? colors.textPrimary
                                            : colors.background,
                                    }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                    </View>

                    <CustomInput
                        placeholder="Enter quantity"
                        value={quantity}
                        onChangeText={(text) => setQuantity(text)}
                        label="Quantity"
                        keyboardType="numeric"
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 20,
                            gap: 16,
                        }}
                    >
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={isSaving}
                        >
                            <Text style={{ color: colors.textSecondary }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleSave}
                            disabled={isSaving || !quantity}
                        >
                            <Text
                                style={{
                                    color: colors.primary,
                                    fontWeight: '600',
                                }}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
