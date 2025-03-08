import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"; // Подключаем backend для загрузки JSON
import LanguageDetector from "i18next-browser-languagedetector"; // Опционально, определяет язык браузера

i18n
  .use(Backend) // Подключаем backend для загрузки переводов
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Используем i18next в React
  .init({
    fallbackLng: "ee", // Язык по умолчанию
    debug: true, // Включить логирование в консоли

    interpolation: {
      escapeValue: false, // Отключает экранирование HTML
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Путь к JSON-файлам с переводами
    },
  });

export default i18n;
 