<template>
  <Hamburger
      :isOpen="isHamburgerOpen"
      :show-icon="false"
      @hamburger:open="onHamburgerOpen"
      @hamburger:close="onHamburgerClose">
    <ArtHamburger @hamburger:click="onHamburgerClose"/>
  </Hamburger>
  <main id="page-wrap" :class="{ 'slide': isHamburgerOpen }" class="pt-6 md:pt-15">
    <Header/>
    <div class="mx-1 md:mx-2 mb-4">
      <slot/>
    </div>
    <Footer/>
  </main>

  <CartDrawer />
</template>

<script lang="ts" setup>
const { isHamburgerOpen, onHamburgerOpen, onHamburgerClose } = useHamburgerMenu()

useSeoMeta({
  title: 'Salty Lens - That feeling from your last surf trip - framed',
  description: 'Fine art prints by artists who capture their travels, waves and surf vibes',
  ogTitle: 'Salty Lens',
  ogDescription: 'Fine art prints by artists who capture their travels, waves and surf vibes',
  ogImage: 'https://saltylens.art/logo.png',
  keywords: 'surf art, surf photography, surf illustrations, art, photography, illustrations, photo prints, surfing, art gallery'
})
</script>
