<template>
  <div class="product-grid max-w-screen-lg mx-auto my-5 grid md:grid-cols-[minmax(50%,max-content)_auto] gap-2 lg:gap-5">
    <div class="md:justify-self-end">
      <nav class="h-[55px]">
        <ol class="list-none flex font-avenir text-1.8 font-bold">
          <li><span v-if="!from">&lt;</span> <NuxtLink :to="localePath('/art')" class="pr-1 py-1.5 inline-block underline"> Surf Garage Art</NuxtLink></li>
          <li v-if="from" class="py-1.5"> / </li>
          <li v-if="from" >
            <NuxtLink :to="localePath(from.slug)"
                      class="pl-1 pr-2 py-1.5 inline-block underline">
              {{ from.title }}
            </NuxtLink>
          </li>
        </ol>
      </nav>
      <img :src="`${file.url}?w=800`" :alt="`Surf Garage - ${title}`" data-not-lazy/>
    </div>
    <div>
      <div class="md:mt-5 mb-3">
        <h1 class="text-2xl mb-1 font-avenir">{{ title }}</h1>
        <h2 v-if="description" class="text-2">{{description}}</h2>
      </div>
      <select v-model="size" class="py-1 px-2 mb-2 text-2 block w-full md:w-auto font-avenir border-2 text-center">
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
const { client } = useContentful()
const { locale } = useI18n()
const localePath = useLocalePath()
const host = useHost()
const priceEntries = Object.entries(prints)
const baseSize = priceEntries[0][0]
const basePrice = priceEntries[0][1]
const { query, params: { id } } = useRoute()
const size = ref(baseSize)
const from = ref()

if (query.size) size.value = query.size
const { siteNav } = useSiteNav()
if (query.f && siteNav?.surfArtMenu) {
  from.value = siteNav?.surfArtMenu?.find(({ slug }) => slug === `/${decodeURIComponent(query.f)}`)
}

const { fields: { title, description, file } } = await client.getAsset(id, { locale: locale.value })

useSeoMeta({
  title: `Surf Garage Art - ${title}`,
  ogTitle: `${title}`,
  description: `Surf Garage Art - ${description}`,
  ogDescription: `${description}`,
  ogImage: file?.url
})

useHead({
  link: [
    { rel: 'canonical', href: `https://surfgarage.es/art/prints/${id}` }
  ]
})
</script>
