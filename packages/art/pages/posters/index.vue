<template>
<!--<pre>{{posters}}</pre>-->
  <div class="mb-2">
    <h1 class="text-2xl font-avenir mb-1">Posters</h1>
  </div>
  <MasonryPosterGallery :posters="posters" slug="posters"/>
</template>
<script setup>

definePageMeta({ layout: 'art' })
const { getAllPosters } = useContentfulPosters()
const posters = await getAllPosters()
</script>
