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
    strategy: "prefix_and_default",
    defaultLocale: 'es',
    locales: [{
      code: 'es',
      iso: 'es',
      file: 'es.json'
    },
      {
        code: 'en',
        iso: 'en',
        file: 'en.json'
      }]
  },
  runtimeConfig: {
    public: {
      enableCommerce: true,
      contentful: {
        space: "5im2bow6vhih",
        accessToken: "Urr45xvziePBNjMuCasC4fiCJRRqz8yMguoNKhW4Veo",
      },
      priceTable: {
        prints: {
          "10x20": 10,
          "20x30": 20,
          "30x40": 30,
        },
      },
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
