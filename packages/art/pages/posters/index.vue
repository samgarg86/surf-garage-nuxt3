<template>
<!--<pre>{{posters}}</pre>-->
  <CategoryBanner title="Posters" />
  <MasonryPosterGallery :posters="posters" slug="posters"/>
</template>
<script setup>
import CategoryBanner from '~/components/CategoryBanner.vue'

const { getAllPosters } = useContentfulPosters()
const posters = await getAllPosters()
const { gtag } = useGtag()

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: 'Posters PLP'
})
</script>
