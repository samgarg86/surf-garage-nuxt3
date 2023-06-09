import contentful from 'contentful';

export default defineNuxtPlugin((/* nuxtApp */) => {
  return {
    provide: {
      contentful: () => contentful.createClient({
        space: '5im2bow6vhih',
        accessToken: 'Urr45xvziePBNjMuCasC4fiCJRRqz8yMguoNKhW4Veo'
      })
    }
  }
})
