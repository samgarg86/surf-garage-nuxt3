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
    cloudinaryCloudName: process.env.cloudinaryCloudName || 'dvhajzz5s',
    cloudinaryApiKey: process.env.cloudinaryApiKey,
    cloudinaryApiSecret: process.env.cloudinaryApiSecret,
    public: {
      contentful: {
        space: process.env.contentfulArtSpace,
        accessToken: process.env.contentfulArtAccessToken,
      },
      cloudinaryCloudName: process.env.cloudinaryCloudName || 'dvhajzz5s',
      enableCommerce: process.env.enableCommerce || true,
      priceTable: {
        photos: {
          '15x20': 8,
          '21x30': 15,
          '30x40': 20,
          '50x70': 45,
          '60x80': 60
        },
        posters: {
          '15x20': 10,
          '21x30': 20,
          '30x40': 30,
          '50x70': 50,
          '60x80': 70
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
