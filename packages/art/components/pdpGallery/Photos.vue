<template>
  <PdpGallery>
    <SplideSlide class="bg-grey-30 px-2 py-3 md:px-5 md:py-6">
      <div class="image-frame image-frame__pdp max-w-[50rem] mx-auto">
        <Image
            :src="`${url}?w=700&fm=webp`"
            :alt="`Surf Garage - ${title}`"
            class="bg-white mx-auto border-[2rem] border-white"
            fetch-priority="high"
        />
      </div>
    </SplideSlide>
    <SplideSlide class="relative">
      <Image
          src="/living-room.jpg"
          :alt="`Surf Garage - living room`"
          class="w-full"
          fetch-priority="high"
      />
      <div class="absolute top-4 md:top-10 left-1/2 -translate-x-1/2">
        <div class="image-frame image-frame__living-room mx-auto">
          <Image
              :src="`${url}?w=700&fm=webp`"
              :alt="`Surf Garage - ${title}`"
              class="bg-white mx-auto max-h-[12rem] sm:max-h-20"
              fetch-priority="high"
          />
        </div>
      </div>
    </SplideSlide>
    <SplideSlide>
      <Image
          :src="`${url}?w=1000&fm=webp`"
          :alt="`Surf Garage - ${title}`"
          class="w-full mx-auto"
          fetch-priority="high"
      />
    </SplideSlide>
  </PdpGallery>
</template>
<script setup>
import { SplideSlide } from '@splidejs/vue-splide'

import '@splidejs/vue-splide/css'

defineProps({
  url: String,
  title: String
})

</script>
<style lang="postcss">
</style>
