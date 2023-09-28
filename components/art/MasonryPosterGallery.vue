<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-1 md:mb-2 gap-1 md:gap-4">
    <ArtMasonryPoster
        v-for="{id, title, image, tags} in [...posters]"
        :key="id"
        :id="id"
        :url="image.url"
        :title="title"
        :tags="tags"
        :f="encodeURIComponent(slug)"
    />
  </div>
</template>
<script setup>
defineProps({
  posters: Array,
  slug: String
})
</script>
