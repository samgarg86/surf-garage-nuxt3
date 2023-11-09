<template>
    <button class="hamburger-icon fixed z-50" :class="{'color-invert': invert}" @click="$emit('click')">
      <span class="menu-bar mb-0.5"></span>
      <span class="menu-bar mb-0.5"></span>
      <span class="menu-bar"></span>
    </button>
</template>
<script setup>
defineProps({
  invert: Boolean
})
</script>
<style lang="postcss">
.hamburger-icon-1 {
  @apply bg-white p-1;
  &.color-invert {
    background-color: transparent;
    padding: 0;
  }
}
.menu-bar {
  @apply w-3 h-[3px] md:w-3.5 md:h-[3.5px] block bg-black;
}

.color-invert .menu-bar {
  @apply bg-white;
}
</style>
