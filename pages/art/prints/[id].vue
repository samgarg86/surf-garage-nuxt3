<template>
  <div class="max-w-screen-lg mx-auto my-3 md:my-5 grid md:grid-cols-[minmax(50%,max-content)_auto] gap-2 lg:gap-5">
    <div class="md:justify-self-end">
      <ArtBreadcrumbs class="h-[55px]"/>
      <img :src="`${file.url}?w=800`" :alt="`Surf Garage - ${title}`" data-not-lazy/>
    </div>

    <div>
      <div class="md:mt-5 md:mb-1">
        <h1 class="text-2xl font-avenir">{{ title }}</h1>
<!--        <pre>{{tags}}</pre>-->

        <p class="text-sm mb-1">
          <template v-if="printTags.artist">
            By <NuxtLink :to="localePath(`/art/artist/${printTags.artist.replace(' ','').toLowerCase()}`)" class="underline">{{ printTags.artist }}</NuxtLink>
          </template>
          <template v-if="printTags.place">
            shot in <NuxtLink :to="localePath(`/art/place/${printTags.place.toLowerCase()}`)" class="underline">{{ printTags.place }}</NuxtLink>
          </template>
        </p>

        <h2 v-if="description" class="text-2">{{description}}</h2>
      </div>

      <ul class="tags list-none mb-2">
        <template v-for="tag in printTags.page" :key="tag">
          <li v-if="tag !== 'Home'" class="inline-block text-1.8 px-1 leading-9 mr-1 bg-lightGrey">
            <NuxtLink :to="localePath(`/art/${tag}`)">{{ tag }}</NuxtLink>
          </li>
        </template>
      </ul>

      <select v-model="size" class="select-size py-1 px-3.5 mb-1 text-2 block w-full md:w-30 font-avenir border-2 text-center">
        <option value="10x20" default>10x20 cm (€{{ prints['10x20'] }})</option>
        <option value="20x30">20x30 cm (€{{ prints['20x30'] }})</option>
        <option value="30x40">30x40 cm (€{{ prints['30x40'] }})</option>
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

if (query.size) size.value = query.size

const { fields: { title, description, file }, metadata: { tags } } = await client.getAsset(id, { locale: locale.value })
const printTags = computed(() => imageTags(tags))

useSeoMeta({
  title: `Surf Garage Art - ${title}`,
  ogTitle: `${title}`,
  ...(description && {
    description,
    ogDescription: `${description}`
  }),
  ogImage: file?.url
})
</script>

<style lang="postcss">
.select-size {
  appearance: none;
  background: url('~/assets/icons/chevron-down.svg') no-repeat right 1rem top 50% / 2rem;
}
</style>
