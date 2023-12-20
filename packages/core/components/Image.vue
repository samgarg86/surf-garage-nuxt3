<template>
  <img
    :src="src"
    :alt="alt || ''"
    loading="lazy"
    :fetchPriority="fetchPriority ? fetchPriority : 'auto'"
    @error="showNoImage"
  />
</template>
<script setup lang="ts">
defineProps<{
  src: string,
  alt?: string,
  fetchPriority?: 'low' | 'high' | 'auto'
}>()
const noImage = '/placeholder.jpg'

const showNoImage = (event) => {
  const target = event.target
  target.src = noImage
}
</script>
