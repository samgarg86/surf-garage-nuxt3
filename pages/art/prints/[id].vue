<template>
  <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-5">
    <div>
      <img :src="image" :alt="`Surf Garage - ${title}`"/>
    </div>
    <div>
      <h1 class="text-xl2 font-bold mb-1 lowercase font-metalsmith">{{ title }}</h1>
      <h2 v-if="description" class="text-xl mb-5 uppercase font-myriad text-base">{{ description }}</h2>
      <select v-model="size" class="px-2 py-1 mb-2 text-lg block w-full md:w-auto border-2">
        <option value="10x20" default>10cm x 20cm (€{{ prints['10x20'] }})</option>
        <option value="20x30">20cm x 30cm (€{{ prints['20x30'] }})</option>
        <option value="30x40">30cm x 40cm (€{{ prints['30x40'] }})</option>
      </select>
      <AddToCart
        :id="`${id}-${size}`"
        :price="prints[size]"
        :title="`${title} (${size})`"
        :decription="size"
        :image="image"
      />
    </div>
  </div>
</template>
<script setup>
import {useRoute, useContentful, useRuntimeConfig, ref} from '#imports'

definePageMeta({layout: "art"})

const {public: {priceTable: {prints}}} = useRuntimeConfig()
const route = useRoute()
const {id} = route.params
const contentful = useContentful()
const entry = await contentful?.getAsset(route.params.id)
const {fields: {title, description}} = entry || {}
const image = entry?.fields.file.url
const size = ref('10x20')

useSeoMeta({
  title: `Surf Garage Art - ${title}`,
  ogTitle: title,
  description: `Surf Garage Art - ${description}`,
  ogDescription: description,
  ogImage: image
})
</script>
