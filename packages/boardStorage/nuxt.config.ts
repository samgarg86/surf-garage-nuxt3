export default defineNuxtConfig({
  extends: [
    './core'
  ],
  i18n: {
    langDir: "../../locales",
    strategy: "prefix_except_default",
    defaultLocale: 'es',
    locales: [
      {
        code: 'es',
        iso: 'es',
        file: 'es.json'
      },
      {
        code: 'en',
        iso: 'en',
        file: 'en.json'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true
    },
    lazy: true,
    types: 'composition',
    skipSettingLocaleOnNavigate: false,
    baseUrl: 'https://surfgarage.es'
  },
})
