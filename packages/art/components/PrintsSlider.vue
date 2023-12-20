<template>
  <div class="pt-4 py-3 text-center">
    <h3 class="text-3xl md:text-[6rem] font-avenir">{{  title }}</h3>
    <p v-if="description" class="text-center text-1.8">{{  description }}</p>
  </div>

  <Splide :options="{
    pagination: true,
    arrows: true,
    mediaQuery: 'min',
    perPage: 1,
    perMove: 1,
    padding: { right: '6rem'},
    gap: '2rem',
    breakpoints: {
      1024: {
        fixedWidth: '40rem',
        padding: { right: '10rem'},
        gap: '2rem'
     }}
  }">
      <SplideSlide v-for="{id, title, url, tags} in images" :key="id">
        <LazyMasonryImage :id="id" :title="title" :url="url" :tags="tags" show-artist/>
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
const images = ref([])
onMounted(async () => {
  const { fetchImagesByTags } = useImages()
  images.value = await fetchImagesByTags(props.tag, 20)
})
</script>
