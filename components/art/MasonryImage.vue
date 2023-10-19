<template>
  <div class="flex flex-col">
    <NuxtLink
      :to="localeRoute(`/art/prints/${id}?f=${f}`)"
      class="masonry-image mb-1 md:mb-2 p-2 md:p-3 bg-softGrey flex items-center flex-1 -mx-1 sm:mx-0"
    >
      <img
        :src="`${url}?w=600`"
        :alt="`Surf Garage Art Co - ${title}`"
        class="min-h-[20rem] w-full bg-white image-frame border-[1.5rem] md:border-[2rem] border-white"
        v-lazy-load/>
    </NuxtLink>
    <div class="flex justify-between items-start px-0.5">
      <div class="font-avenir">
        <p class="text-2 font-bold">{{title}}</p>
<!--        <p class="text-[1.3rem] uppercase">{{tags?.artist ? `By ${tags.artist.name}` : ''}} {{tags.place ? `in ${tags.place.name}` : ''}}</p>-->
        <p class="text-[1.4rem] uppercase leading-loose">{{tags.place ? tags.place.name : ''}}</p>
      </div>
      <NuxtLink class="underline text-1.8" :to="localeRoute(`/art/prints/${id}?f=${f}`)">
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
