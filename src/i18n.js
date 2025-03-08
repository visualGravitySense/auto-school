import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

async function loadLocales() {
  const ru = await fetch('/locales/ru/translation.json').then(res => res.json());
  const et = await fetch('/locales/et/translation.json').then(res => res.json());

  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      et: { translation: et }
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false }
  });
}

loadLocales();

export default i18n;
