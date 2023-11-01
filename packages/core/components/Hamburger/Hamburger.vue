<template>
  <div class="fixed z-50 text-left left-1 top-1">
    <button class="toggle bg-white p-1" @click="open">
      <div>
        <span class="w-3.5 h-[3px] block bg-black mb-0.5"></span>
        <span class="w-3.5 h-[3px] block bg-black mb-0.5"></span>
        <span class="w-3.5 h-[3px] block bg-black"></span>
      </div>
    </button>
    <div class="right-drawer bg-black"
         :style="{
            width: isOpen ? '300px' : 0
         }">
      <button @click="close" class="text-white ml-2 mt-2">
        <SvgoClose class="text-xl"/>
      </button>
        <div class="p-2">
          <slot/>
        </div>
    </div>

    <div v-if="isOpen" @click="close" class="drawer-mask bg-black"/>
  </div>

</template>

<script setup lang="ts">
const emit = defineEmits(['hamburger:open', 'hamburger:close'])
defineProps({
  isOpen: Boolean
})

// const isHamburgerOpen = ref(false)
const open = () => {
  emit('hamburger:open')
  // isHamburgerOpen.value = true
}

const close = () => {
  // isHamburgerOpen.value = false
  emit('hamburger:close')
}
</script>

<style lang="postcss">
.right-drawer {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 0; /* initially */
  overflow-x: hidden;
  height: 100%;
  padding-left: 0; /* initially */
  border-left: 1px solid whitesmoke;
  background: #000;
  transition: width 0.5s; /* for the animation */
  &.slide {
    width: 300px;
  }
}
.drawer-mask {
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
}
.accordion button {
  background: #000;
}
.accordion {
  margin-right: 10px;
}

#page-wrap {
  transition: all 0.5s; /* for the animation */
  &.slide {
    transform: translate3d(300px, 0px, 0px);
  }
}

</style>
