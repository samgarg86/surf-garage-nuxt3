const locales = [{
    code: 'es',
    iso: 'es',
    file: 'es.json'
  },
  {
    code: 'en',
    iso: 'en',
    file: 'en.json'
  }
]

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', "@nuxtjs/tailwindcss", 'nuxt-svgo', 'nuxt-lazy-load'],
  lazyLoad: {
    directiveOnly: true,
    defaultImage: '/placeholder.jpg'
  },
  svgo: {
    svgo: false
  },
  i18n: {
    langDir: "./locales",
    strategy: "prefix_except_default",
    defaultLocale: 'es',
    locales,
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
    instaAccessToken: process.env.instaAccessToken,
    public: {
      contentful: {
        space: process.env.contentfulSpace,
        accessToken: process.env.contentfulAccessToken,
      },
      enableCommerce: process.env.enableCommerce || true,
      priceTable: {
        photos: {
          'A5': 8,
          'A4': 15,
          'A3': 20
        },
        posters: {
          'A5': 10,
          'A4': 20,
          'A3': 30
        }
      },
      socialMedia: {
        insta: 'https://www.instagram.com/surfgaragelpa/',
        whatsapp: 'https://wa.me/34600273559?text=Hello%2C%20I%27d%20like%20to%20store%20my%20board%20at%20Surf%20Garage',
        maps: 'https://goo.gl/maps/8qRXWmk34xwfq5Hz7'
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
  },
});
