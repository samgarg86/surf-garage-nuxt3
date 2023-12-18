<template>
  <h3 class="text-center text-3xl md:text-[6rem] font-avenir py-4">{{  title }}</h3>
  <p v-if="description" class="text-center py-4">{{  description }}</p>
  <div class="grid md:grid-cols-4 gap-2">
    <nuxt-link
        v-for="{id, title, description, link, image} in mappedArtists"
        :key="id"
        :to="link"
        class="art-category-grid-item aspect-square text-center"
    >
      <Image :src="`${image}?w=600&fm=webp`" :alt="`Artist | ${title}`" class="aspect-square object-cover object-top"/>
      <p class="font-avenir my-1">{{title}}</p>
<!--      <p class="text-1.8">{{description}}</p>-->
    </nuxt-link>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  description: String,
  artists: Array
})

const { mapCategory } = useCategory()

const mappedArtists = computed(() => props.artists?.map(mapCategory))
</script>
