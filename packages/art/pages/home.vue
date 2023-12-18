<template>
  <div>
    <template v-for="cmp in pageContent" :key="cmp.sys.id">
      <component :is="homepageComponent[cmp.sys.contentType.sys.id]" v-bind="cmp.fields" />
    </template>
  </div>
</template>
<script setup>
const homepageComponent = {
  artHeroBanner: resolveComponent('LazyHeroBanner'),
  artCategoryGrid: resolveComponent('LazyCategoryGrid'),
  artistsSlider: resolveComponent('LazyArtistsSlider')
}
const { fetchHomepage, pageTitle, pageDescription, pageContent } = useContentfulPhotos()
fetchHomepage()
</script>
