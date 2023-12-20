<template>
  <div>
  <div class="pt-4 py-3 text-center">
    <h3 class="text-3xl md:text-[6rem] font-avenir">{{  title }}</h3>
    <p v-if="description" class="text-center text-1.8">{{  description }}</p>
  </div>

  <Splide :options="{
    pagination: false,
    arrows: true,
    mediaQuery: 'min',
    drag: true,
    perPage: 1,
    perMove: 1,
    padding: { right: '6rem'},
    gap: '1rem',
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
     }}}"
          @splide:moved="sliderMoved"
  >
      <SplideSlide v-for="{id, title, url, tags} in images" :key="id">
        <LazyMasonryImageTile
            :id="id" :title="title" :url="url" :tags="tags"
            fetch-priority="high"
            show-artist/>
      </SplideSlide>
    </Splide>
  </div>
</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

const props = defineProps({
  title: String,
  description: String,
  tag: String,
  slidesPerPage: Number
})
const PAGE_SIZE = 10
const images = ref([])
const endReached = ref(false)
const { fetchImagesByTags } = useImages()

onMounted(async () => {
  images.value = await fetchImagesByTags(props.tag, PAGE_SIZE)
})

const sliderMoved = async (instance, index) => {
  // console.log('slider moved..', index, images.value?.length)
  if (index > images.value?.length - 5 && !endReached.value) {
    // console.log('fetching more images', index)
    const newImages = await fetchImagesByTags(props.tag, PAGE_SIZE, images.value.length)
    if (newImages.length > 0) { images.value.push(...newImages) } else { endReached.value = true }
  }
}
</script>
