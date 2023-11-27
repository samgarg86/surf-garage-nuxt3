<template>
  <swiper
      :style="`max-width: ${width}px`"
      :slides-per-view="1"
      :modules="[Navigation, Scrollbar]"
      navigation
      :autoplay="autoplay"
      :scrollbar="{ draggable: true }">
    <swiper-slide
        v-for="img in images"
        :key="img.id">
      <img
          :src="`${img.url}?w=${width || 600}&fm=webp`"
          alt="Gallery Image"
          :class="{'h-full object-cover' : fillHeight }"
          />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

defineProps({
  images: Array,
  autoplay: Boolean,
  width: Number,
  fillHeight: Boolean
})
</script>
<style lang="postcss">
.swiper-button-prev,
.swiper-button-next {
  color: white;
  text-shadow: 0 0 3px black;
}
.swiper-slide {
  height: auto;
}
</style>
