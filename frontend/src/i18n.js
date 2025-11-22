import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  // Load JSON dịch từ /public/locales/{{lng}}/{{ns}}.json
  .use(HttpBackend)
  // Tự động phát hiện ngôn ngữ (query, localStorage, cookie, navigator, ...)
  .use(LanguageDetector)
  // Kết nối với React
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "vi"],
    debug: process.env.NODE_ENV === "development",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // React đã tự escape
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: [
        "querystring",
        "localStorage",
        "cookie",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false,
    },
    // Tránh trả về chuỗi rỗng khi key chưa có
    returnEmptyString: false,
  });

export default i18n;
