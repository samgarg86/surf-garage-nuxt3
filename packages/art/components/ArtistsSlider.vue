<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="pt-4 py-3 text-center">
      <h3 class="text-3xl md:text-[6rem] font-avenir">{{  title }}</h3>
      <p v-if="description" class="text-center text-1.8">{{  description }}</p>
    </div>

    <Splide :options="{
      pagination: true,
      arrows: true,
      mediaQuery: 'min',
      perPage: 1,
      padding: { right: '5rem'},
      gap: '1rem',
      pagination: false,
      breakpoints: {
        1024: {
          perPage: 3,
          gap: '2rem',
          padding: 0
        },
       1200: {
          perPage: 4,
          gap: '2rem',
          padding: 0
       }
      }}">
      <SplideSlide
          v-for="{id, title, description, link, image} in mappedArtists"
          :key="id">
        <nuxt-link
            :to="link"
            class="art-category-grid-item text-center">
          <Image :src="`${image}?w=600&fm=webp`" :alt="`Artist | ${title}`" class="aspect-square object-cover object-top"/>
          <p class="font-avenir my-1">{{title}}</p>
  <!--        <p class="text-1.8">{{description}}</p>-->
        </nuxt-link>
      </SplideSlide>
    </Splide>
  </div>
</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

const props = defineProps({
  title: String,
  description: String,
  artists: Array
})

const { mapCategory } = useCategory()

const mappedArtists = computed(() => props.artists?.map(mapCategory))
</script>
<style lang="postcss">
@import '@splidejs/vue-splide/css';
</style>
