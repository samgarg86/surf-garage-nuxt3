<template>
  <Splide :options="{
    pagination: true,
    arrows: false,
    mediaQuery: 'min',
    breakpoints: {
      1024: {
        direction: 'ttb',
        heightRatio: 1.2,
        wheel: true,
        wheelSleep: 300
     }}
  }" class="pdp-gallery">
    <slot/>
  </Splide>
</template>
<script setup lang="ts">
import { Splide } from '@splidejs/vue-splide'
</script>

<style lang="postcss">
.pdp-gallery .splide__pagination__page {
  @apply bg-white border border-black border-solid;

  &.is-active {
    @apply bg-black;
  }
}
</style>
