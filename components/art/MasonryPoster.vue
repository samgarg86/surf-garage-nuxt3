<template>
  <div class="mb-3 lg:mb-5">
    <NuxtLink
      :to="localeRoute(`/art/posters/${id}?f=${f}`)"
      class="masonry-poster mb-1 md:mb-2 relative block image-frame"
    >
      <img
        :src="`${url}?w=600`"
        :alt="`Surf Garage Art Co - ${title}`"
        class="min-h-[20rem] w-full"
        v-lazy-load/>
    </NuxtLink>
    <div class="flex justify-between items-start px-0.5">
      <div class="font-avenir">
        <p class="text-base font-bold">{{title}}</p>
        <p v-if="tags?.artist" class="text-sm">By {{tags.artist.name}}</p>
      </div>
      <NuxtLink class="underline text-1.8" :to="localeRoute(`/art/posters/${id}?f=${f}`)">
        {{ $t('art.order-prints') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  title: String,
  url: String,
  tags: Object,
  f: String
})
const localeRoute = useLocaleRoute()
</script>

<style lang="postcss">
</style>
