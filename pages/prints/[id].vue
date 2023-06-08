<template>
  <div class="container mx-auto md:columns-2 gap-10">
    <div>
      <img :src="image" :alt="`Surf Garage - ${title}`"/>
    </div>
    <div>
      <h1 class="text-xl font-bold mb-5">{{ title }}</h1>
      <h2 v-if="description" class="text-xl mb-5">{{description}}</h2>
      <select v-model="size" class="px-5 py-3 mb-5 text-lg block w-full md:w-auto">
        <option value="10x20" default>10cm x 20cm (€{{prints['10x20']}})</option>
        <option value="20x30">20cm x 30cm (€{{prints['20x30']}})</option>
        <option value="30x40">30cm x 40cm (€{{prints['30x40']}})</option>
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
<script setup lang="js">
import {useRoute, useContentful, useRuntimeConfig, ref} from '#imports'
import {AddToCart} from "#components"

const { public: {priceTable : {prints}}} = useRuntimeConfig()
const route = useRoute()
const { id } = route.params
const contentful = useContentful()
const entry = await contentful.getAsset(route.params.id)
const { fields: {title, description} } = entry || {}
const image = entry?.fields.file.url
const size = ref('10x20')
</script>
