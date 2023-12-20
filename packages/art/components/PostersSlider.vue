<template>
  <div class="pt-4 py-3 text-center">
    <h3 class="text-3xl md:text-[6rem] font-avenir">{{  title }}</h3>
    <p v-if="description" class="text-center text-1.8">{{  description }}</p>
  </div>

  <Splide :options="{
    pagination: false,
    arrows: true,
    mediaQuery: 'min',
    perPage: 1,
    perMove: 1,
    padding: { right: '6rem'},
    gap: '2rem',
    breakpoints: {
      800: {
        perPage: 2,
        padding: { right: '10rem'},
        gap: '2rem'
      },
      1200: {
        perPage: 3,
        padding: { right: '10rem'},
        gap: '2rem'
      },
      1440: {
        fixedWidth: '40rem',
        padding: 0,
        gap: '2rem'
     }}
  }">
      <SplideSlide v-for="{id, title, image, tags} in posters" :key="id">
        <LazyMasonryPosterTile :id="id" :title="title" :url="image.url" :tags="tags"/>
      </SplideSlide>
    </Splide>
</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

const props = defineProps({
  title: String,
  description: String,
  tag: String,
  slidesPerPage: Number
})
const posters = ref([])
onMounted(async () => {
  const { getPostersByTags } = useContentfulPosters()
  posters.value = await getPostersByTags(props.tag)
})
</script>
