<template>
  <div class="flex flex-col">
    <NuxtLink
      :to="localeRoute(`/posters/${id}?f=${f || ''}`)"
      class="mb-1 md:mb-2 p-3 md:p-5 bg-grey-30 flex items-center flex-1"
    >
      <Image
        :src="`${url}?w=600&fm=webp`"
        :alt="`Surf Garage Art Co - ${title}`"
        class="min-h-[20rem] w-full image-frame"
        :fetch-priority="fetchPriority"
        :loading="loading"
      />
    </NuxtLink>
    <div class="flex justify-between items-start px-1">
      <div class="font-avenir mr-2 flex-1">
        <p class="text-1.8 font-medium">{{title}}</p>
        <p v-if="tags?.artist" class="text-[1.2rem] uppercase leading-loose">{{$t('art.by')}} {{tags.artist.name}}</p>
      </div>
      <NuxtLink class="underline text-1.8" :to="localeRoute(`/posters/${id}?f=${f}`)">
        {{ $t('art.order-prints') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: String,
  url: String,
  title: String,
  tags: Object,
  f: String,
  fetchPriority: String,
  loading?: 'lazy' | 'eager'
}>()
const localeRoute = useLocaleRoute()
</script>
