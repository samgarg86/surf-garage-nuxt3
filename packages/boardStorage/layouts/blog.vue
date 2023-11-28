<template>
  <Hamburger
      :isOpen="isHamburgerOpen"
      @hamburger:open="onHamburgerOpen"
      @hamburger:close="onHamburgerClose"
      invert
  >
    <MenuHamburger @hamburger:click="onHamburgerClose"/>
  </Hamburger>
  <main id="page-wrap" class="mb-1 md:mb-2">
    <BlogHeader/>
    <slot/>
    <Footer/>
  </main>
</template>
<script setup>
const { isHamburgerOpen, onHamburgerOpen, onHamburgerClose } = useHamburgerMenu()
</script>
