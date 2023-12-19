<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-1 md:mb-2 gap-4 md:gap-y-6"
  >
    <MasonryImage
      v-for="(img, index) in images"
      :key="img.id"
      :fetch-priority="index <= ABOVE_THE_FOLD_IMAGES ? 'high' : 'low'"
      :show-artist="showArtist"
      :show-place="showPlace"
      v-bind="{ ...img, f: encodeURIComponent(slug.replace('art/', '')) }"
    />
  </div>
</template>
<script setup>
const ABOVE_THE_FOLD_IMAGES = 6
defineProps({
  showTitleDesc: Boolean,
  title: String,
  description: String,
  images: Array,
  slug: String,
  showArtist: Boolean,
  showPlace: Boolean
})
</script>
