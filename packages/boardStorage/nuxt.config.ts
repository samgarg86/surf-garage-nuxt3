export default defineNuxtConfig({
  extends: [
    '../core'
  ],
  modules: ['@nuxtjs/i18n', "@nuxtjs/tailwindcss", 'nuxt-svgo', '@nuxtjs/robots'],
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
  runtimeConfig: {
    public: {
      contentful: {
        space: process.env.contentfulSpace,
        accessToken: process.env.contentfulAccessToken,
      }
    },
  },
  postcss: {
    parser: require('postcss-comment'),
    plugins: {
      "postcss-simple-vars": {},
      'postcss-import': {},
      'postcss-nested': {},
    },
  }
})
