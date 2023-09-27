<template>
<!--<pre>{{posters}}</pre>-->
  <div class="mb-2">
    <h1 class="text-2xl font-avenir mb-1">Posters</h1>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-1 md:mb-2 gap-1 md:gap-2">
    <ArtMasonryPoster
        v-for="{id, title, image, tags} in [...posters, ...posters, ...posters, ...posters, ...posters]"
        :key="id"
        :id="id"
        :url="image.url"
        :title="title"
        :tags="tags"
        :f="encodeURIComponent('art/posters')"
    />
  </div>
</template>
<script setup>

definePageMeta({ layout: 'art' })
const { getAllPosters } = useContentfulPosters()
const posters = await getAllPosters()
</script>
