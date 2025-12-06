import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "../locales/en.json";
import np from "../locales/np.json";

const locale = (Localization as any).locale || "en";

i18n.use(initReactI18next).init({
  lng: locale.startsWith("np") ? "np" : "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    np: { translation: np },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
