<template>
  <Splide :options="{
    pagination: true,
    arrows: false,
    mediaQuery: 'min',
    breakpoints: {
      1024: {
        direction: 'ttb',
        heightRatio: 1.414,
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
        class="w-full h-full object-contain object-top"
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
  @apply grid items-center justify-center;
  @apply bg-softGrey p-2;
  img {
    @apply md:max-w-[57rem] md:h-auto;
  }
}
</style>
