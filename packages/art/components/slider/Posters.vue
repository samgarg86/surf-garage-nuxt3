<template>
  <div>
    <SliderTitleViewAll :tag="tag" :title="title" />

    <Slider :options="{
      padding: { right: '6rem'},
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
        <LazyMasonryPosterTile :id="id" :title="title" :url="image.url" :tags="tags" loading="eager"/>
      </SplideSlide>
    </Slider>
  </div>
</template>
<script setup>
import { SplideSlide } from '@splidejs/vue-splide'
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
