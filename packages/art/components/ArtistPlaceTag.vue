<template>
  <p class="text-sm">
    <template v-if="artist">
      {{$t('art.by')}} <NuxtLink :to="localePath(artistSlug(artist))" class="underline">{{ artist.name }}</NuxtLink>
    </template>
    <span v-if="artist && place">, </span>
    <template v-if="place">
      {{$t('art.shot-in')}} <NuxtLink :to="localePath(placeSlug(place))" class="underline">{{ place.name }}</NuxtLink>
    </template>
  </p>
</template>
<script setup lang="ts">
defineProps<{
  artist: {
    name: String
  },
  place?: {
    name: String
  }
}>()
const localePath = useLocalePath()
</script>
