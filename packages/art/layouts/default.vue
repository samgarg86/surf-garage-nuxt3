<template>
  <Hamburger
      :isOpen="isHamburgerOpen"
      @hamburger:open="onHamburgerOpen"
      @hamburger:close="onHamburgerClose">
    <template #hamburger-icon>
      <HamburgerIcon class="left-1 top-2 mobile:block hidden" invert @click="onHamburgerOpen"/>
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
const { isHamburgerOpen, onHamburgerOpen, onHamburgerClose } = useHamburgerMenu()

useHead({
  link: [
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: 'https://cdn.snipcart.com/themes/v3.7.0/default/snipcart.css'
    }
  ],
  script: [
    { src: 'https://cdn.snipcart.com/themes/v3.7.0/default/snipcart.js', async: true }
  ]
})

useSeoMeta({
  title: 'Salty Lens - That feeling from your last surf trip - framed',
  description: 'Fine art prints by artists who capture their travels, waves and surf vibes',
  ogTitle: 'Salty Lens',
  ogDescription: 'Fine art prints by artists who capture their travels, waves and surf vibes',
  ogImage: 'https://saltylens.art/logo.png',
  keywords: 'surf art, surf photography, surf illustrations, art, photography, illustrations, photo prints, surfing, art gallery'
})
</script>

<style lang="postcss">
@import "~/assets/css/snipcart.css";
</style>
