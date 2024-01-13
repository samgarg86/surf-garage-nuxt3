<template>
  <div class="flex flex-col h-full">
    <NuxtLink
      :to="localeRoute(`/prints/${id}?f=${f || ''}`)"
      class="mb-1 md:mb-2 px-2 md:px-3 py-3 bg-grey-30 flex items-center flex-1"
    >
      <Image
        :src="`${url}?w=600&fm=webp`"
        :alt="`Surf Garage Art Co - ${title}`"
        class="w-full bg-white image-frame border-[1.5rem] border-white"
        :fetch-priority="fetchPriority"
        :loading="loading"
      />
    </NuxtLink>
    <div class="flex justify-between items-start px-1">
      <div class="mr-2 flex-1 font-avenir">
        <p class="text-1.8 font-medium">{{ title }}</p>
        <p v-if="showArtist && tags?.artist?.name" class="text-[1.2rem] uppercase leading-loose">{{$t('art.by')}} {{tags.artist.name}}</p>
        <p v-if="showPlace && tags?.place" class="text-[1.2rem] uppercase leading-loose">{{ tags.place.name }}</p>
      </div>
      <NuxtLink class="underline text-1.8" :to="localeRoute(`/prints/${id}?f=${f}`)">
        {{ $t("art.order-prints") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  title: string,
  url: string,
  tags: Object,
  f?: string,
  fetchPriority?: string,
  showArtist?: boolean,
  showPlace?: boolean
  loading?: 'lazy' | 'eager'
}>()
const localeRoute = useLocaleRoute()
</script>
