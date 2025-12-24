import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { createLanguageToggleStyles } from './languageStyleSheet';

export default function LanguageToggle() {
  const { colors } = useTheme();
  const styles = createLanguageToggleStyles(colors);

  const { i18n } = useTranslation();

  const toggleLanguage = (lang: string) => i18n.changeLanguage(lang);

  return (
    <View style={styles.langContainer}>
      <View style={styles.langLeft}>
        <Ionicons
          name="globe-outline"
          size={18}
          color={colors.textPrimary}
        />
        <Text style={styles.langLabel}>Language</Text>
      </View>

      <View style={styles.langToggle}>
        <View
          style={[
            styles.langIndicator,
            { left: i18n.language === "en" ? 0 : "50%" },
          ]}
        />

        <TouchableOpacity
          style={styles.langItem}
          onPress={() => toggleLanguage("en")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.langText,
              i18n.language === "en" && styles.langTextActive,
            ]}
          >
            EN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.langItem}
          onPress={() => toggleLanguage("np")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.langText,
              i18n.language === "np" && styles.langTextActive,
            ]}
          >
            NP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
