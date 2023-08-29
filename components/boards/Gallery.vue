<template>
  <client-only>
    <swiper
        :slides-per-view="1"
        :modules="[Navigation, Scrollbar]"
        navigation
        :scrollbar="{ draggable: true }">
      <swiper-slide
          v-for="img in images"
          :key="img.id">
        <img :src="`${img.url}?w=600`" alt="Board Image" data-not-lazy/>
      </swiper-slide>
    </swiper>
  </client-only>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
defineProps({
  images: Array
})
</script>
<style lang="postcss">
.swiper-button-prev,
.swiper-button-next {
  color: white;
  text-shadow: 0 0 3px black;
}
</style>
