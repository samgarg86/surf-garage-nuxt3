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
const props = defineProps<{
  artist: {
    name: String
  },
  place?: {
    name: String
  }
}>()
const localePath = useLocalePath()
const { t } = useI18n()

const seoDescr = `${t('art.by')} ${props.artist.name}${props.place ? `, ${t('art.shot-in')} ${props.place.name}` : ''}`
useSeoMeta({
  description: seoDescr,
  ogDescription: seoDescr
})

</script>
