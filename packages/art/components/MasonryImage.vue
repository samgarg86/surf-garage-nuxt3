<template>
  <div class="flex flex-col">
    <NuxtLink
      :to="localeRoute(`/prints/${id}?f=${f}`)"
      class="mb-1 md:mb-2 px-2 md:px-3 py-3 bg-grey-30 flex items-center flex-1 -mx-1 sm:mx-0"
    >
      <Image
        :src="`${url}?w=600&fm=webp`"
        :alt="`Surf Garage Art Co - ${title}`"
        class="min-h-[20rem] w-full bg-white image-frame border-[2rem] border-white"
        :fetch-priority="fetchPriority"
      />
    </NuxtLink>
    <div class="flex justify-between items-start">
      <div class="font-avenir mr-2 flex-1">
        <p class="text-2 font-bold">{{ title }}</p>
        <!--        <p class="text-[1.3rem] uppercase">{{tags?.artist ? `By ${tags.artist.name}` : ''}} {{tags.place ? `in ${tags.place.name}` : ''}}</p>-->
        <p class="text-[1.4rem] uppercase leading-loose">
          {{ tags.place ? tags.place.name : "" }}
        </p>
      </div>
      <NuxtLink
        class="underline text-1.8"
        :to="localeRoute(`/prints/${id}?f=${f}`)"
      >
        {{ $t("art.order-prints") }}
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
  f: String,
  fetchPriority: String,
});
const localeRoute = useLocaleRoute();
</script>
