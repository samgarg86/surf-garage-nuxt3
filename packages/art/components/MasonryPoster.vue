<template>
  <div class="flex flex-col">
    <NuxtLink
      :to="localeRoute(`/posters/${id}?f=${f}`)"
      class="masonry-poster mb-1 md:mb-2 p-3 md:p-5 bg-softGrey flex items-center flex-1 -mx-1 sm:mx-0"
    >
      <img
        :src="`${url}?w=600`"
        :alt="`Surf Garage Art Co - ${title}`"
        class="min-h-[20rem] w-full image-frame"
        v-lazy-load/>
    </NuxtLink>
    <div class="flex justify-between items-start">
      <div class="font-avenir">
        <p class="text-2 font-bold">{{title}}</p>
        <p v-if="tags?.artist" class="text-sm">By {{tags.artist.name}}</p>
      </div>
      <NuxtLink class="underline text-1.8" :to="localeRoute(`/posters/${id}?f=${f}`)">
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
