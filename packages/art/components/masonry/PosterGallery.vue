<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-1 md:mb-2 gap-4 md:gap-y-6">
    <MasonryPosterTile
        v-for="({id, title, image, tags}, index) in [...posters]"
        :key="id"
        :id="id"
        :url="image.url"
        :title="title"
        :tags="tags"
        :f="encodeURIComponent(slug.replace('art/', ''))"
        :fetch-priority="index <= ABOVE_THE_FOLD_IMAGES ? 'high' : 'low'"
    />
  </div>
</template>
<script setup>
defineProps({
  posters: Array,
  slug: String
})
const ABOVE_THE_FOLD_IMAGES = 6

</script>
