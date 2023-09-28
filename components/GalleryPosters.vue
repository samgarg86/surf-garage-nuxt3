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
    <SplideSlide
        v-for="(img, i) in images"
        :key="img.id"
        :class="{'slide-first': i === 0}"
    >
      <img
        :class="{'image-frame': i === 0}"
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
.slide-first {
  @apply p-2 md:p-4;
}

.splide__slide img {
  @apply w-full h-full object-contain;
}
</style>
