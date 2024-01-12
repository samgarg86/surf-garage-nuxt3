<template>
  <template v-for="cmp in pageContent" :key="cmp.sys.id">
    <component
        v-if="cmp.metadata.tags"
        :is="homepageComponent[cmp.sys.contentType.sys.id]"
        v-bind="{...cmp.fields, tag: cmp.metadata.tags.map(tag => tag.sys.id).join(',')}"
        class="mb-4"/>
  </template>
</template>
<script setup>

const homepageComponent = {
  artHeroBanner: resolveComponent('LazyHeroBanner'),
  artCategoryGrid: resolveComponent('LazyCategoryGrid'),
  artistsSlider: resolveComponent('LazySliderArtists'),
  artPrintsSlider: resolveComponent('LazySliderPrints'),
  artPosterSlider: resolveComponent('LazySliderPosters')
}
const { fetchHomepage, pageTitle, pageDescription, pageContent } = useContentfulPhotos()
await fetchHomepage()
useArtSeo({ title: pageTitle.value, description: pageDescription.value })
</script>
<style>
@import '@splidejs/vue-splide/css';
</style>
