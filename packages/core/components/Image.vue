<template>
  <img
    :src="src"
    :alt="alt"
    loading="lazy"
    :fetchPriority="fetchPriority ? fetchPriority : undefined"
    @error="showNoImage"
  />
</template>
<script setup>
defineProps({
  src: String,
  alt: String,
  fetchPriority: String
})
const noImage = '/placeholder.jpg'

const showNoImage = (event) => {
  const target = event.target
  target.src = noImage
}
</script>
