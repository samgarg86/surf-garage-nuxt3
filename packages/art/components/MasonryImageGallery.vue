<template>
  <div>
    <div class="mb-2" v-if="showTitleDesc">
      <h1 class="text-2xl font-avenir mb-1">{{ title }}</h1>
      <h2 class="text-2">{{ description }}</h2>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-1 md:mb-2 gap-4 md:gap-y-6"
    >
      <MasonryImage
        v-for="(img, index) in images"
        :key="img.id"
        :fetch-priority="index <= ABOVE_THE_FOLD_IMAGES ? 'high' : 'low'"
        v-bind="{ ...img, f: encodeURIComponent(slug.replace('art/', '')) }"
      />
    </div>
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
});
</script>
