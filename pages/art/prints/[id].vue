<template>
  <div class="max-w-screen-lg mx-auto my-5 grid md:grid-cols-2 gap-5">
    <div>
      <img :src="image" :alt="`Surf Garage - ${title}`" data-not-lazy/>
    </div>
    <div>
      <div class="mb-3">
        <h1 class="text-2xl mb-1 lowercase font-metalsmith">{{ title }}</h1>
        <h2 v-if="description" class="text-xl font-myriad text-base">{{ description }}</h2>
      </div>
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
        :url="`https://${host}/art/prints/${id}?size=${size}`"
      />
    </div>
  </div>
</template>
<script setup>
import { useRoute, useContentful, useRuntimeConfig, ref } from '#imports'

definePageMeta({ layout: 'art' })

const { public: { priceTable: { prints } } } = useRuntimeConfig()
const route = useRoute()
const { id } = route.params
const { client } = useContentful()
const title = ref('')
const description = ref('')
const image = ref('')
const size = ref('10x20')
const host = useHost()

const { query } = useRoute()
if (query.size) size.value = query.size
const getProductImage = async () => {
  return await client.getAsset(route.params.id)
}

getProductImage().then(({ fields }) => {
  title.value = fields.title
  description.value = fields.description
  image.value = fields.file.url
})

useSeoMeta({
  title: `Surf Garage Art - ${title.value}`,
  ogTitle: title.value,
  description: `Surf Garage Art - ${description.value}`,
  ogDescription: description.value,
  ogImage: image.value
})
</script>
