<template>
  <Hamburger
      :isOpen="isHamburgerOpen"
      @hamburger:open="onHamburgerOpen"
      @hamburger:close="onHamburgerClose"
      invert
  >
    <MenuHamburger @hamburger:click="onHamburgerClose"/>
  </Hamburger>
  <main id="page-wrap" class="mx-1 md:mx-2 mb-1 md:mb-2">
    <BoardsHeader/>
    <slot/>
    <Footer/>
  </main>
  <div hidden
       id="snipcart"
       data-api-key="YWZhYTMyNDUtZWY4Ny00ZDg0LTk1ZjYtMzMzZDFjN2NjNzYxNjM4MjE1NzE4NjM4MjYyMjk0"
       data-config-modal-style="side">
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Surf Garage - Second Hand Surf Boards',
  description: 'Buy and Sell Second Hand Surf Boards',
  ogTitle: 'Surf Garage - Second Hand Surf Boards',
  ogDescription: 'Buy and Sell Second Hand Surf Boards',
  ogImage: 'https://surfgarage.es/logo.png',
  keywords: 'guardatablas, tablas de surf, tablas segunda mano, board storage, surfboard storage, second hand surfboards, surfboards, surfboard repairs, surf art'
})

const i18nHead = useLocaleHead({
  addSeoAttributes: true
})

useHead({
  meta: [...(i18nHead.value.meta || [])],
  link: [...(i18nHead.value.link || [])]
})

const { isHamburgerOpen, onHamburgerOpen, onHamburgerClose } = useHamburgerMenu()
</script>

<style lang="postcss">
.hamburger-menu-boards {
  .bm-burger-button {
    @apply top-[1.4rem] left-[1.4rem] lg:top-[2.5rem] lg:left-[2.5rem];
  }
}
</style>
