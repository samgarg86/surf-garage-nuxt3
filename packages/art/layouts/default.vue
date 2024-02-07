<template>
  <Hamburger
      :isOpen="isHamburgerOpen"
      @hamburger:open="onHamburgerOpen"
      @hamburger:close="onHamburgerClose">
    <template #hamburger-icon>
      <HamburgerIcon class="left-1 top-2 md:left-2" invert @click="onHamburgerOpen"/>
    </template>
    <ArtHamburger @hamburger:click="onHamburgerClose"/>
  </Hamburger>
  <main id="page-wrap" :class="{ 'slide': isHamburgerOpen }" class="pt-6">
    <Header/>
    <div class="mx-1 md:mx-2 mb-4">
      <slot/>
    </div>
    <Footer/>
  </main>

  <div hidden
       id="snipcart"
       data-api-key="YWZhYTMyNDUtZWY4Ny00ZDg0LTk1ZjYtMzMzZDFjN2NjNzYxNjM4MjE1NzE4NjM4MjYyMjk0"
       data-config-modal-style="side">
  </div>
</template>

<script lang="ts" setup>
const i18nHead = useLocaleHead({
  addSeoAttributes: true
})

const { isHamburgerOpen, onHamburgerOpen, onHamburgerClose } = useHamburgerMenu()

useHead({
  link: [
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: 'https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css'
    },
    ...(i18nHead.value.link || [])
  ],
  script: [
    { src: 'https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js', async: true }
  ]
})

useSeoMeta({
  title: 'Surf Garage Art Co',
  description: 'Discover artwork created by photographers and illustrators based in the Canary Islands who bring to life their travels, experiences, emotions and surf vibes through prints and posters.',
  ogTitle: 'Surf Garage Art Co',
  ogDescription: 'Discover artwork created by photographers and illustrators based in the Canary Islands who bring to life their travels, experiences, emotions and surf vibes through prints and posters.',
  ogImage: 'https://surfgarage.es/logo.png',
  keywords: 'surf art, surf photography, surf illustrations, art, photography, illustrations, photo prints, surfing, art gallery'
})
</script>

<style lang="postcss">
@import "~/assets/css/snipcart.css";
</style>
