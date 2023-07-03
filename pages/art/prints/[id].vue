<template>
  <div class="max-w-screen-lg mx-auto my-5 grid md:grid-cols-[minmax(50%,max-content)_auto] gap-2 lg:gap-5">
    <div class="md:justify-self-end">
      <img :src="`${file.url}?w=800`" :alt="`Surf Garage - ${title}`" data-not-lazy/>
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
        :id="`${id}`"
        :price="basePrice"
        :title="title"
        :decription="size"
        :image="`${file.url}?w=600`"
        :sizes="priceOptions(priceEntries)"
        :selectedSize="size"
        :url="validateUrl(id, host)"
      />
    </div>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'art' })

const { public: { priceTable: { prints } } } = useRuntimeConfig()
const route = useRoute()
const { id } = route.params
const { client } = useContentful()
const { locale } = useI18n()
const host = useHost()
const priceEntries = Object.entries(prints)
const baseSize = priceEntries[0][0]
const basePrice = priceEntries[0][1]
const { query } = useRoute()
const size = ref(baseSize)

if (query.size) size.value = query.size

const { fields: { title, description, file } } = await client.getAsset(route.params.id, { locale: locale.value })

useSeoMeta({
  title: `Surf Garage Art - ${title}`,
  ogTitle: `${title}`,
  description: `Surf Garage Art - ${description}`,
  ogDescription: `${description}`,
  ogImage: file?.url
})
</script>
