export default defineNuxtConfig({
  alias: {
    '@core': __dirname
  },
  css: ['@core/assets/css/tailwind.css'],
  modules: ['nuxt-svgo'],
  svgo: {
    autoImportPath: '@core/assets/icons/',
    customComponent: 'SvgoIcon'
  },
  runtimeConfig: {
    instaAccessToken: process.env.instaAccessToken,
    public: {
      socialMedia: {
        insta: 'https://www.instagram.com/surfgaragelpa/',
        whatsapp:
          'https://wa.me/34600273559?text=Hello%2C%20I%27d%20like%20to%20store%20my%20board%20at%20Surf%20Garage',
        maps: 'https://goo.gl/maps/8qRXWmk34xwfq5Hz7'
      }
    }
  }
});
