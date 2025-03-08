import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"; // Подключаем backend для загрузки JSON
import LanguageDetector from "i18next-browser-languagedetector"; // Опционально, определяет язык браузера

// i18n.changeLanguage("ru");
// console.log("Текущий язык:", i18n.language);

i18n.on("failedLoading", (lng, ns, msg) => {
  console.error(`Ошибка загрузки языка: ${lng}, пространство имен: ${ns}, сообщение: ${msg}`);
});

i18n
  .use(Backend) // Подключаем backend для загрузки переводов
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Используем i18next в React

  .init({
    // supportedLngs: ["ee", "ru"], // ✅ Исправлено: supportedLngs вместо supportedLangs
    fallbackLng: "ee",
    // lang: "ee", // Начальный язык
    debug: true,

    interpolation: {
      escapeValue: false, // Отключает экранирование HTML
    },

    detection: {
      order: ["localStorage", "navigator"], // Определение языка
      caches: ["localStorage"], // Запоминание выбора
    },

    // backend: {
    //   loadPath: "/locales/{{lng}}/{{ns}}.json", // Путь к JSON-файлам с переводами
    // },

    backend: {
      loadPath: "/locales/{{lng}}/translation.json"
    }
  });

export default i18n;