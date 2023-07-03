<template>
  <NuxtLink
    :to="`/art/prints/${id}`"
    class="masonry-image mb-1 md:mb-2 relative block"
  >
    <img
      :src="`${url}?w=500`"
      :alt="`Surf Garage Art Co - ${title}`"
      class="min-h-[20rem] w-full"
      v-lazy-load/>
    <div class="masonry-image__hover hidden bg-lightYellow/75 flex justify-center items-center">
      <div class="text-center">
        <div class="text-xl font-avenir text-white mb-10">{{title}}</div>
        <span class="px-5 py-1.5 bg-white font-avenir text-sm uppercase">{{ $t('art.order-prints') }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  id: String,
  title: String,
  url: String,
  description: String
})
</script>

<style lang="postcss">
@media (hover: hover) {
  .masonry-image:hover .masonry-image__hover {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
