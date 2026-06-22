<template>
    <button class="hamburger-icon" :class="{ 'fixed z-50': !inline, 'color-invert': invert }" @click="$emit('click')">
      <span class="menu-bar mb-0.5"></span>
      <span class="menu-bar mb-0.5"></span>
      <span class="menu-bar"></span>
    </button>
</template>
<script setup>
defineProps({
  invert: Boolean,
  inline: Boolean
})
</script>
<style lang="postcss">
.menu-bar {
  @apply w-3 h-[3px] md:w-[3.2rem] md:h-[3.5px] block bg-black;
}

.color-invert .menu-bar {
  @apply bg-white;
}
</style>
