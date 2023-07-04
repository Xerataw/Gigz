import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const envVars = import.meta.env;

// Importing translation files
import translationEN from './assets/i18n/en.json';
import translationFR from './assets/i18n/fr.json';

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

//i18N Initialization
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: envVars.VITE_ENV === 'DEV' ? true : false,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
