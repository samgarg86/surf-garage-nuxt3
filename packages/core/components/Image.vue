<template>
  <img
    :src="src"
    :alt="alt || ''"
    :loading="loading ?? undefined"
    :fetchPriority="fetchPriority ? fetchPriority : 'auto'"
    @error="showNoImage"
  />
</template>
<script setup lang="ts">

type ImageProps = {
  src: string,
  alt?: string,
  fetchPriority?: 'low' | 'high' | 'auto'
  loading?: 'lazy' | 'eager'
}

withDefaults(defineProps<ImageProps>(), {
  loading: 'lazy'
})
const noImage = '/placeholder.jpg'

const showNoImage = (event) => {
  const target = event.target
  target.src = noImage
}
</script>
