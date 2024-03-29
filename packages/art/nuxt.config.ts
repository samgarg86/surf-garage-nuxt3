export default defineNuxtConfig({
  extends: ["../core"],
  alias:{
    '@art': __dirname
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots",
    "nuxt-simple-sitemap",
    "nuxt-gtag"
  ],
  site: {
    url: "https://surfgarage.art",
  },
  sitemap: {
    inferStaticPagesAsRoutes: false,
  },
  runtimeConfig: {
    public: {
      contentful: {
        space: process.env.contentfulSpace,
        accessToken: process.env.contentfulAccessToken,
      },
      enableCommerce: process.env.enableCommerce || true,
      priceTable: {
        photos: {
          A5: 8,
          A4: 15,
          A3: 20,
        },
        posters: {
          A5: 10,
          A4: 20,
          A3: 30,
        },
      },
      infiniteScrolling: {
        pageSize: 12
      }
    },
  },
  i18n: {
    langDir: "../../locales",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "es",
        iso: "es",
        file: "es.json",
      },
      {
        code: "en",
        iso: "en",
        file: "en.json",
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    lazy: true,
    types: "composition",
    skipSettingLocaleOnNavigate: false,
    baseUrl: "https://surfgarage.art",
  },
  postcss: {
    parser: require("postcss-comment"),
    plugins: {
      "postcss-simple-vars": {},
      "postcss-import": {},
      "postcss-nested": {},
    },
  },
  gtag: {
    id: 'G-KQ9XVBCK1R'
  }
});
