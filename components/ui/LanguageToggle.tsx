import { useTheme } from '@/theme';
import { saveLanguagePreference } from '@/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

export default function LanguageToggle() {
  const { colors } = useTheme();
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const toggleLanguage = async (lang: string) => {
    console.log('Changing language from', i18n.language, 'to', lang);
    await i18n.changeLanguage(lang);
    setCurrentLang(lang);
    await saveLanguagePreference(lang);
    console.log('Language changed to', i18n.language);
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 rounded-2xl"
      style={{ backgroundColor: colors.surface }}
    >

      <View className="flex-row items-center gap-2">
        <Ionicons
          name="globe-outline"
          size={18}
          color={colors.textPrimary}
        />
        <Text
          className="font-semibold text-base"
          style={{ color: colors.textPrimary }}
        >
          Language
        </Text>
      </View>

      <View className="flex-row rounded-full gap-1"
        style={{ backgroundColor: colors.border, padding: 3 }}
      >

        <TouchableOpacity
          className="items-center justify-center px-2 py-1 rounded-full"
          onPress={() => toggleLanguage("en")}
          activeOpacity={0.8}
          style={{
            backgroundColor: currentLang === "en" ? colors.primary : "transparent",
          }}
        >
          <Text
            className="font-semibold text-xs"
            style={{
              color: currentLang === "en" ? colors.textPrimary : colors.textSecondary,
            }}
          >
            EN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center justify-center px-2 py-1 rounded-full"
          onPress={() => toggleLanguage("np")}
          activeOpacity={0.8}
          style={{
            backgroundColor: currentLang === "np" ? colors.primary : "transparent",
          }}
        >
          <Text
            className="font-semibold text-xs"
            style={{
              color: currentLang === "np" ? colors.textPrimary : colors.textSecondary,
            }}
          >
            NP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}