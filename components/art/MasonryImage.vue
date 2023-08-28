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
  @apply text-center font-avenir text-2 mb-2 bg-white absolute px-1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - 2rem);
  top: 0;
}

.masonry-image__buy {
  @apply bg-white font-avenir text-sm uppercase border text-center p-1 mt-1;
}
</style>
