<template>
    <slot name="hamburger-icon">
      <HamburgerIcon class="left-1 top-2 md:left-2" @click="open"/>
    </slot>
    <div class="hamburger-menu bg-black"
         :class="{slide: isOpen}">
      <button @click="close" class="text-white ml-2 mt-2">
        <SvgoClose class="text-xl"/>
      </button>
      <div class="p-2">
        <slot/>
      </div>
    </div>

    <div v-if="isOpen" @click="close" class="hamburger-menu-mask bg-black"/>
</template>

<script setup lang="ts">
const emit = defineEmits(['hamburger:open', 'hamburger:close'])
defineProps({
  isOpen: Boolean
})

// const isHamburgerOpen = ref(false)
const open = () => {
  emit('hamburger:open')
}

const close = () => {
  emit('hamburger:close')
}
</script>

<style lang="postcss">
.hamburger-menu {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 0; /* initially */
  overflow-x: hidden;
  height: 100%;
  padding-left: 0; /* initially */
  background: #000;
  transition: width 0.5s; /* for the animation */
  &.slide {
    width: 330px;
  }
}
.hamburger-menu-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.6;
  z-index: 199;
}
.hamburger-menu.contact-links__link {
  @apply text-white hover:text-amberYellow;

  .accordion button {
    background: #000;
  }
  .accordion {
    margin-right: 10px;
  }
}

#page-wrap {
  transition: all 0.5s; /* for the animation */
  &.slide {
    transform: translate3d(330px, 0px, 0px);
  }
}

</style>
