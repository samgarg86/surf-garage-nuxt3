<template>
  <div>
    <SliderTitleViewAll :link="getLinkFromTag(tag)" :title="title" />

    <Slider :options="{
      padding: { right: '6rem'},
      gap: '2rem',
      breakpoints: {
        800: {
          perPage: 2,
          padding: { right: '10rem'}
        },
        1200: {
          perPage: 3,
          padding: { right: '10rem'}
        },
        1400: {
          perPage: slidesPerPage || 3,
          padding: { right: '20rem'}
        },
        1600: {
          fixedWidth: `${slideWidthXlScreen || 40}rem`,
          padding: 0
       }}}"
            @splide:moved="sliderMoved"
    >
        <SplideSlide v-for="{id, title, url, tags} in images" :key="id">
          <LazyMasonryImageTile
              :id="id" :title="title" :url="url" :tags="tags"
              fetch-priority="high"
              loading="eager"
              show-artist/>
        </SplideSlide>
    </Slider>
  </div>
</template>
<script setup lang="ts">
import { SplideSlide } from '@splidejs/vue-splide'
const props = defineProps<{
  title: String,
  tag: String,
  slidesPerPage?: Number,
  slideWidthXlScreen?: Number,
  order?: 'created' | 'updated'
}>()
const PAGE_SIZE = 10
const images = ref([])
const endReached = ref(false)
const { fetchImagesByTags } = useImages()

onMounted(async () => {
  images.value = await fetchImagesByTags(props.tag, PAGE_SIZE, 0, props.order)
})

const sliderMoved = async (instance, index) => {
  // console.log('slider moved..', index, images.value?.length)
  if (index > images.value?.length - 5 && !endReached.value) {
    // console.log('fetching more images', index)
    const newImages = await fetchImagesByTags(props.tag, PAGE_SIZE, images.value.length, props.order)
    if (newImages.length > 0) { images.value.push(...newImages) } else { endReached.value = true }
  }
}
</script>
