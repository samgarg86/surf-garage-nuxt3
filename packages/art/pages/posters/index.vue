<template>
<!--<pre>{{posters}}</pre>-->
  <div class="mb-2">
    <h1 class="text-2xl font-avenir mb-1">Posters</h1>
  </div>
  <MasonryPosterGallery :posters="posters" slug="posters"/>
</template>
<script setup>
const { getAllPosters } = useContentfulPosters()
const posters = await getAllPosters()
const { gtag } = useGtag()

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: 'Posters PLP'
})
</script>
