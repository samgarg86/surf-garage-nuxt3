import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', "@nuxtjs/tailwindcss", 'nuxt-svgo'],
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
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://app.snipcart.com" },
        { rel: "preconnect", href: "https://cdn.snipcart.com" },
        {
          rel: "stylesheet",
          href: "https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css",
        },
      ],
      script: [
        { src: "https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js" },
      ],
    },
  },
  runtimeConfig: {
    public: {
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
