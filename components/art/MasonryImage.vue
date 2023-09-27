<template>
  <NuxtLink
    :to="localeRoute(`/art/prints/${id}?f=${f}`)"
    class="masonry-image mb-1 md:mb-2 relative block image-frame"
  >
    <img
      :src="`${url}?w=600`"
      :alt="`Surf Garage Art Co - ${title}`"
      class="min-h-[20rem] w-full"
      v-lazy-load/>
    <div class="masonry-image__buy">{{ $t('art.order-prints') }}</div>
    <div class="absolute right-0 top-0 bg-white text-right text-black px-1 pt-0.5">
      <p class="font-bold mb-0.5 text-sm font-avenir">{{title}}</p>
      <p v-if="tags?.place" class="uppercase text-[1.3rem]">{{tags.place.name}}</p>
    </div>
  </NuxtLink>
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
.masonry-image__buy {
  @apply absolute bottom-3 left-5 font-avenir font-bold text-sm text-white uppercase text-center p-1 border;
  width: calc(100% - 10rem);
}

@media (hover: hover) {
  .masonry-image:hover .masonry-image__buy {
    @apply bg-white text-black;
  }
}

</style>
