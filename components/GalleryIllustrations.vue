<template>
  <Splide :options="{
    pagination: true,
    arrows: false,
    heightRatio: 1.414,
    mediaQuery: 'min',
    breakpoints: {
      1024: {
        direction: 'ttb',
        wheel: true,
        wheelSleep: 300
     }}
  }">
    <SplideSlide v-for="img in images" :key="img.id">
      <img
        :src="`${img.url}?w=${600}`"
        :alt="img.title"
        data-not-lazy/>
    </SplideSlide>
  </Splide>
</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

import '@splidejs/vue-splide/css'

defineProps({
  images: Array
})

</script>
<style lang="postcss">
.splide__pagination__page {
  background: none;
  border: 1px solid theme('colors.black');

  &.is-active {
    background: theme('colors.black');
  }
}
.splide__slide {
  @apply bg-softGrey p-2 md:p-4;
}

.splide__slide img {
  @apply w-full h-full object-contain bg-white;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.5);
}
</style>
