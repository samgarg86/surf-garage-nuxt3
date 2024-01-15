<template>
  <PdpGallery>
      <SplideSlide
          v-for="(img, i) in images"
          :key="img.id"
          :class="{'slide-first': i === 0}"
      >
        <div :class="{'image-frame': i === 0}">
          <Image
            :src="`${img.url}?w=${600}&fm=webp`"
            :alt="img.title"
            class="w-full h-full object-contain object-top"
          />
        </div>
      </SplideSlide>
  </PdpGallery>
</template>
<script setup>
import { SplideSlide } from '@splidejs/vue-splide'

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
  @apply bg-grey-30 p-2;
  img {
    @apply md:max-w-[50rem] md:h-auto;
  }
}
</style>
