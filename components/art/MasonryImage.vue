<template>
  <NuxtLink
    :to="localeRoute(`/art/prints/${id}?f=${f}`)"
    class="masonry-image mb-1 md:mb-2 relative block"
  >
    <img
      :src="`${url}?w=600`"
      :alt="`Surf Garage Art Co - ${title}`"
      class="min-h-[20rem] w-full"
      v-lazy-load/>
    <div class="masonry-image__title ">{{title}}</div>
    <div class="masonry-image__buy">{{ $t('art.order-prints') }}</div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  id: String,
  title: String,
  url: String,
  description: String,
  f: String
})
const localeRoute = useLocaleRoute()
</script>

<style lang="postcss">
.masonry-image__title {
  @apply text-center absolute top-2 left-1/2 font-avenir text-1.8 md:text-2 text-white bg-black/40 px-1;
  transform: translateX(-50%);
  max-width: calc(100% - 2rem);
}

.masonry-image__buy {
  @apply bg-black/40 absolute bottom-0 w-full font-avenir text-sm md:text-1.8 text-white uppercase text-center p-1;
}

@media (hover: hover) {
  .masonry-image:hover .masonry-image__buy {
    @apply bg-black border-black text-white;
  }
}


</style>
