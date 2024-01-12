<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-1 md:mb-2 gap-4 md:gap-y-6 lg:grid-cols-4 lg:max-w-[192rem] lg:mx-auto"
  >
    <MasonryImageTile
      v-for="(img, index) in images"
      :key="img.id"
      :fetch-priority="index <= ABOVE_THE_FOLD_IMAGES ? 'high' : 'low'"
      :show-artist="showArtist"
      :show-place="showPlace"
      v-bind="{ ...img, f: encodeURIComponent(slug.replace('art/', '')) }"
    />
  </div>
</template>
<script setup lang="ts">
const ABOVE_THE_FOLD_IMAGES = 6
defineProps<{
  images: Array<any>,
  slug: string,
  showArtist?: boolean,
  showPlace?: boolean
}>()
</script>
