<template>
  <div class="max-w-screen-container mx-auto">
    <div class="pt-4 py-3 text-center">
      <h3 class="text-xl md:text-2xl font-extrabold font-primary">{{  title }}</h3>
      <p v-if="description" class="text-center text-sm md:text-1.8">{{  description }}</p>
    </div>

    <Slider :options="{
      padding: { right: '5rem'},
      gap: '2rem',
      breakpoints: {
        1024: {
          perPage: 3,
          gap: '4rem',
          padding: 0
        },
       1600: {
          perPage: 4,
          gap: '4rem',
          padding: 0
       }
      }}">
      <SplideSlide
          v-for="{id, title, shortDescription, link, image} in mappedArtists"
          :key="id">
        <nuxt-link
            :to="link"
            class="art-category-grid-item">
          <Image :src="`${image}?w=600&fm=webp`" :alt="`Artist | ${title}`" loading="eager" class="aspect-square object-cover object-top w-full"/>
          <p class="font-primary font-extrabold text-1.8 md:text-2 my-1">{{title}}</p>
          <p class="text-xs md:text-sm">{{shortDescription}}</p>
        </nuxt-link>
      </SplideSlide>
    </Slider>
  </div>
</template>
<script setup>
import { SplideSlide } from '@splidejs/vue-splide'

const props = defineProps({
  title: String,
  description: String,
  artists: Array
})

const { mapCategory } = useCategory()

const mappedArtists = computed(() => props.artists?.map(mapCategory))
</script>
