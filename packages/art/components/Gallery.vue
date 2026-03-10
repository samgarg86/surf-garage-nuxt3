
<!--
  Gallery component for art package
  This component exists primarily to avoid "Failed to resolve component: Gallery" errors
  when RichText content includes contentGallery entries from Contentful.
  The RichText component (in core package) references <Gallery>, but the original Gallery
  component exists only in the boardStorage package and uses Swiper.
  This version uses Splide to match the art package's existing slider library.
-->
<template>
  <Splide
      :options="splideOptions"
      :style="`max-width: ${width || 600}px`"
      class="mx-auto">
    <SplideSlide v-for="img in images" :key="img.id">
      <img
          :src="`${img.url}?w=${width || 600}&fm=webp`"
          alt="Gallery Image"
          :class="{'h-full object-cover': fillHeight}"
          class="w-full" />
    </SplideSlide>
  </Splide>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

const props = defineProps({
  images: Array,
  autoplay: Boolean,
  width: Number,
  fillHeight: Boolean
})

const splideOptions = {
  type: 'slide',
  perPage: 1,
  arrows: true,
  pagination: true,
  autoplay: props.autoplay || false,
  drag: true,
  gap: '1rem',
  height: props.fillHeight ? '400px' : 'auto'
}
</script>

<style scoped>
/* Additional Gallery-specific styles if needed */
</style>
