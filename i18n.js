import { createI18n } from "vue-i18n";
import en from "./src/locales/en";
import es from "./src/locales/es";

const i18n = createI18n({
  legacy: false,
  locale: "es",
  fallbackLocale: "es",
  // globalInjection: true,
  messages: {
    en,
    es,
  },
});

i18n.setLocale = (locale) => {
  i18n.global.locale.value = locale;
};

i18n.getLocale = () => i18n.global.locale.value;

export default i18n;
