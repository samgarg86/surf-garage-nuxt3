<template>
  <MenuHamburger black class="hamburger-menu-boards"/>
  <main id="page-wrap" class="mx-1 md:mx-2 mb-1 md:mb-2">
    <BoardsHeader/>
    <slot/>
    <Footer/>
  </main>
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
</script>

<style lang="postcss">
.hamburger-menu-boards {
  .bm-burger-button {
    @apply top-[1.4rem] left-[1.4rem] lg:top-[2.5rem] lg:left-[2.5rem];
  }
}
</style>
