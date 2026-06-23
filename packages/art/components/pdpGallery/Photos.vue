<template>
  <PdpGallery>
    <SplideSlide class="bg-grey-30 px-2 py-3 md:px-5 md:py-6">
      <div class="image-frame image-frame__pdp max-w-[50rem] mx-auto">
        <Image
            :src="`${url}?w=700&fm=webp`"
            :alt="`Salty Lens - ${title}`"
            class="bg-white mx-auto border-[2rem] border-white"
            fetch-priority="high"
        />
      </div>
    </SplideSlide>
    <SplideSlide class="relative">
      <Image
          src="/Sofa-wall-surf-boards.jpg"
          :alt="`Salty Lens - living room`"
          class="w-full"
          fetch-priority="high"
      />
      <div class="absolute bottom-[53%] left-1/2 -translate-x-1/2 ">
        <div class="image-frame image-frame__living-room mx-auto">
          <Image
              :src="`${url}?w=700&fm=webp`"
              :alt="`Salty Lens - ${title}`"
              class="bg-white mx-auto h-[40%] max-h-30"
              fetch-priority="high"
          />
        </div>
      </div>
    </SplideSlide>
    <SplideSlide>
      <Image
          :src="`${url}?w=1000&fm=webp`"
          :alt="`Salty Lens - ${title}`"
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
.image-frame__living-room {
  @apply p-[0.4rem] bg-black;
  box-shadow: 4px 2px 6px rgba(0,0,0,.3);

  &::after {
    @apply m-[0.4rem];
    box-shadow: inset 2px 0 3px rgba(0,0,0,0.3);
  }

  img {
    @apply border-[0.8rem] md:border-[1rem] border-white;
  }
}
</style>
