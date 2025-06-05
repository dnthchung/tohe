import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "vi",
    debug: false,
    ns: [
      "common",
      "home",
      "footer",
      "header",
      "connect",
      "faq",
      "chapter1",
      "chapter2",
      "chapter3",
      "products",
      "12ty",
      "12suu",
      "12dan",
      "12mao",
      "12thin",
      "12ti",
      "12ngo",
      "12mui",
      "12than",
      "12dau",
      "12tuat",
      "12hoi"
    ],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
