<template>
  <div>
    <Hamburger
        :isOpen="isHamburgerOpen"
        @hamburger:open="onHamburgerOpen"
        @hamburger:close="onHamburgerClose">
      <MenuHamburger @hamburger:click="onHamburgerClose"/>
    </Hamburger>

    <main id="page-wrap" class="m-1 md:m-2 mb-1 md:mb-2" :class="{ 'slide': isHamburgerOpen }">
      <slot/>
      <Footer />
    </main>
  </div>
</template>
<script setup>
const { isHamburgerOpen, onHamburgerOpen, onHamburgerClose } = useHamburgerMenu()
useSeoMeta({
  title: 'Surf Garage Guardatablas LPA',
  description: 'Surf Garage - Un Club Premio Para Surfistas. Board Storage, GuardaTablas, Second Hand Boards, Surf Art, Surf Board Repairs',
  ogTitle: 'Surf Garage Guardatablas LPA',
  ogDescription: 'Surf Garage - A Premium Club for Surfers',
  ogImage: 'https://surfgarage.es/logo.png',
  keywords: 'guardatablas, tablas de surf, tablas segunda mano, board storage, surfboard storage, second hand surfboards, surfboards, surfboard repairs, surf art'
})
</script>
