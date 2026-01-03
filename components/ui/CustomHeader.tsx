import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
    title: string;
    onBackPress?: () => void;
};

export default function CustomHeader({ title, onBackPress }: Props) {
    const { colors } = useTheme();

    const handleBack = onBackPress || (() => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/dashboards/(producer)');
        }
    });

    return (
        <View
            style={{
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                backgroundColor: colors.background,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            }}
        >

            <TouchableOpacity
                className='mr-4'
                onPress={handleBack}
                hitSlop={10}
            >
                <Ionicons
                    name="chevron-back"
                    size={26}
                    color={colors.textPrimary}
                />
            </TouchableOpacity>

            <Text
                style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: colors.textPrimary,
                }}
            >
                {title}
            </Text>
        </View>
    );
}
