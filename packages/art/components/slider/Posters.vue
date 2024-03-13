<template>
  <div>
    <SliderTitleViewAll :link="postersSlug(tag)" :title="title" />

    <Slider
      :options="{
        padding: { right: '6rem' },
        gap: '2rem',
        breakpoints: {
          800: {
            perPage: 2,
            padding: { right: '10rem' }
          },
          1200: {
            perPage: 3,
            padding: { right: '10rem' }
          },
          1440: {
            fixedWidth: '40rem',
            padding: 0
          }
        }
      }"
    >
      <SplideSlide v-for="{ id, title, image, tags } in posters" :key="id">
        <LazyMasonryPosterTile
          :id="id"
          :title="title"
          :url="image.url"
          :tags="tags"
          loading="eager"
        />
      </SplideSlide>
    </Slider>
  </div>
</template>
<script setup>
import { SplideSlide } from '@splidejs/vue-splide';
const props = defineProps({
  title: String,
  description: String,
  tag: String,
  slidesPerPage: Number
});
const posters = ref([]);
onMounted(async () => {
  const { posters: fetchedPosters, getPostersByTags } = useContentfulPosters();
  await getPostersByTags(props.tag, 10);
  posters.value = fetchedPosters.value;
});
</script>

<style lang="postcss">
.splide__pagination__page {
  &.is-active {
    @apply bg-black;
  }
}
</style>
