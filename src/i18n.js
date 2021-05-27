import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import { env } from './environment'

// Set the base url from environment file
const base_url = env().mode === 'prod' ? '/covidsafar':'';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
    backend: {
      /* translation file path */
      loadPath: base_url + "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en",
    useSuspense : true,
    // debug: true,
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
      useSuspense: false,
    },
  });

export default i18n;
