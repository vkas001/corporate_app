import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicy() {
  const { colors } = useTheme();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
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
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-full items-center justify-center border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
          Privacy Policy
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Section title="OVERVIEW">
          <Text className="leading-6" style={{ color: colors.textPrimary }}>
            We collect and process data to operate Egg Corporate, provide services to
            producers and sellers, and maintain cooperative transparency. This policy
            explains what we collect, why we collect it, and how you can control it.
          </Text>
        </Section>

        <Section title="DATA WE COLLECT">
          <Text className="leading-6 mb-2" style={{ color: colors.textPrimary }}>
            - Account data: name, email, role (producer/seller)
          </Text>
          <Text className="leading-6 mb-2" style={{ color: colors.textPrimary }}>
            - Operational data: production records, sales records, payments, settlements
          </Text>
          <Text className="leading-6" style={{ color: colors.textPrimary }}>
            - Device data: app version, device type, basic diagnostics (no PII)
          </Text>
        </Section>

        <Section title="HOW WE USE DATA">
          <Text className="leading-6 mb-2" style={{ color: colors.textPrimary }}>
            - To display production, sales, and payment information to authorized users
          </Text>
          <Text className="leading-6 mb-2" style={{ color: colors.textPrimary }}>
            - To send important notifications about records and settlements
          </Text>
          <Text className="leading-6" style={{ color: colors.textPrimary }}>
            - To improve app reliability and security
          </Text>
        </Section>

        <Section title="SHARING & ACCESS">
          <Text className="leading-6" style={{ color: colors.textPrimary }}>
            We do not sell personal data. Authorized cooperative roles may view
            operational records for transparency. Third-party services are limited to
            analytics and crash reporting without personal identifiers.
          </Text>
        </Section>

        <Section title="YOUR CONTROLS">
          <Text className="leading-6 mb-2" style={{ color: colors.textPrimary }}>
            - Update profile information from your account settings
          </Text>
          <Text className="leading-6 mb-2" style={{ color: colors.textPrimary }}>
            - Request data export or deletion via support
          </Text>
          <Text className="leading-6" style={{ color: colors.textPrimary }}>
            - Manage notification preferences in Settings
          </Text>
        </Section>

        <Section title="SECURITY">
          <Text className="leading-6" style={{ color: colors.textPrimary }}>
            Data is protected with encrypted transport and secured storage. Access is
            role-based within the cooperative.
          </Text>
        </Section>

        <Section title="CONTACT">
          <Text className="leading-6" style={{ color: colors.textPrimary }}>
            For privacy requests, contact support@eggcorporate.com.
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}
