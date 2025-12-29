import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import ne from "../locales/np.json";
const LANGUAGE_KEY = "app_language";

const deviceLanguage =
  Localization.getLocales()[0]?.languageCode ?? "en";

let initialLanguage = deviceLanguage;

// Try to load saved language preference
const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      initialLanguage = savedLanguage;
      await i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error("Error loading saved language:", error);
  }
};

i18n
  .use(initReactI18next)
  .init({
    lng: initialLanguage, 
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      np: { translation: ne },
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Load saved language on app start
loadSavedLanguage();

export default i18n;
