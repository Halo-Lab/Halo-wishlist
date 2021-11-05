import i18n from 'i18next'
import Backend from 'i18next-http-backend';
import detector from "i18next-browser-languagedetector";
import {initReactI18next} from 'react-i18next';

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    whitelist: ["en", "uk"],
    // debug: true,
    /*backend: {
      // load from i18next-gitbook repo
      loadPath: 'https://raw.githubusercontent.com/i18next/i18next-gitbook/master/locales/{{lng}}/{{ns}}.json',
      crossDomain: true
    }*/
    interpolation: {
      escapeValue: false
    }

  })
// this method detect browser lang
i18n.changeLanguage();
export default i18n;

