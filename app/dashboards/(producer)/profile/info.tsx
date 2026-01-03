import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    onClose: () => void;
};

export default function InfoScreen({ onClose }: Props) {
    const { colors } = useTheme();

    const Section = ({
        title,
        children,
    }: {
        title: string;
        children: React.ReactNode;
    }) => (
        <View className="mb-4">
            <Text
                className="text-sm font-semibold mb-2 px-1"
                style={{ color: colors.textSecondary }}
            >
                {title}
            </Text>
            <View
                className="rounded-2xl p-4 border"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
                {children}
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 mb-10"
            style={{
                backgroundColor: colors.background

            }}>

            <View className="flex-row items-center justify-between px-4 py-3">
                <TouchableOpacity
                    className="w-10 h-10 rounded-full items-center justify-center border"
                    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                    onPress={onClose}
                >
                    <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text className="text-lg font-semibold"
                    style={{ color: colors.textPrimary }}>
                    About
                </Text>
                <View className="w-10" />
            </View>
            <ScrollView className="px-4" showsVerticalScrollIndicator={false}>

                {/* App Header */}
                <View className="items-center py-6">
                    <View
                        className="w-20 h-20 rounded-3xl items-center justify-center mb-4"
                        style={{ backgroundColor: colors.primary + "15" }}
                    >
                        <Ionicons name="egg-outline" size={40} color={colors.primary} />
                    </View>

                    <Text
                        className="text-2xl font-bold"
                        style={{ color: colors.textPrimary }}
                    >
                        Egg Corporate
                    </Text>
                    <Text
                        className="text-sm mt-1.5"
                        style={{ color: colors.textSecondary }}
                    >
                        Version 1.0.0
                    </Text>
                </View>

                {/* About */}
                <Section title="ABOUT THE APP">
                    <Text className="leading-6" style={{ color: colors.textPrimary }}>
                        Egg Corporate is a cooperative management app designed to help
                        producers and sellers record daily activities, track payments,
                        and maintain transparency in egg production and sales.
                    </Text>
                </Section>

                {/* Who can use */}
                <Section title="WHO CAN USE THIS APP">
                    <View className="gap-2">
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                            <Text style={{ color: colors.textPrimary }}>Egg Producers</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                            <Text style={{ color: colors.textPrimary }}>Egg Sellers</Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                            <Text style={{ color: colors.textPrimary }}>Cooperative Members</Text>
                        </View>
                    </View>
                </Section>

                {/* Features */}
                <Section title="KEY FEATURES">
                    <View className="gap-2">
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: colors.primary }}
                            />
                            <Text
                                style={{ color: colors.textPrimary }}
                            >
                                Record daily production or sales
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: colors.primary }}
                            />
                            <Text
                                style={{ color: colors.textPrimary }}
                            >
                                View payment and settlement history
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: colors.primary }}
                            />
                            <Text
                                style={{ color: colors.textPrimary }}>
                                Track egg rates and stock status
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: colors.primary }}
                            />
                            <Text
                                style={{ color: colors.textPrimary }}
                            >
                                Receive important notifications
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                            <View className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: colors.primary }}
                            />
                            <Text
                                style={{ color: colors.textPrimary }}
                            >
                                Maintain transparent records
                            </Text>
                        </View>
                    </View>
                </Section>

                {/* Transparency */}
                <Section title="TRANSPARENCY & DATA">
                    <Text className="leading-6" style={{ color: colors.textPrimary }}>
                        All production, sales, and payment records are calculated
                        based on cooperative-defined rules. This app provides
                        read-only financial transparency to members.
                    </Text>
                </Section>

                {/* Support */}
                <Section title="HELP & SUPPORT">
                    <Text className="leading-6" style={{ color: colors.textPrimary }}>
                        For support or questions, please contact your cooperative
                        administrator or the official support channel.
                    </Text>
                </Section>

                {/* Legal */}
                <Section title="LEGAL">
                    <View className="gap-2">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="flex-row items-center gap-3"
                            onPress={() => router.push("/dashboards/(modal)/privacy-policy")}
                        >
                            <Ionicons name="document-text-outline" size={16} color={colors.textPrimary} />
                            <Text style={{ color: colors.textPrimary }}>
                                Privacy Policy
                            </Text>
                            <View className="flex-1 items-end">
                                <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
}
