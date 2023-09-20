<template>
  <div class="max-w-screen-lg mx-auto my-3 md:my-5 grid md:grid-cols-[minmax(50%,max-content)_auto] gap-2 lg:gap-5">
    <section class="md:justify-self-end">
      <ArtBreadcrumbs class="h-[55px]"/>
      <img class="border" :src="`${url}?w=800`" :alt="`Surf Garage - ${title}`" data-not-lazy/>
    </section>

    <section>
      <div class="md:mt-5 md:mb-1">
        <h1 class="text-2xl font-avenir">{{ title }}</h1>
<!--        <pre>{{tags}}</pre>-->

        <p class="text-sm mb-1">
          <template v-if="tags.artist">
            By <NuxtLink :to="localePath(`/art/artist/${tags.artist.replace(' ','').toLowerCase()}`)" class="underline">{{ tags.artist }}</NuxtLink>
          </template>
          <span v-if="tags.artist && tags.place">, </span>
          <template v-if="tags.place">
            shot in <NuxtLink :to="localePath(`/art/place/${tags.place.toLowerCase()}`)" class="underline">{{ tags.place }}</NuxtLink>
          </template>
        </p>

        <h2 v-if="description" class="text-2">{{description}}</h2>
      </div>

      <ul class="tags list-none mb-2">
        <template v-for="tag in tags.page" :key="tag">
          <li v-if="tag !== 'Home'" class="inline-block text-1.8 px-1 leading-9 mr-1 bg-lightGrey">
            <NuxtLink :to="localePath(`/art/${tag}`)">{{ tag }}</NuxtLink>
          </li>
        </template>
      </ul>

      <select v-model="size" class="select-size py-1 px-3.5 mb-1 text-2 block w-full md:w-30 font-avenir border-2 text-center">
        <option value="A5" default>A5 (15x21 cm): €{{ prints['A5'] }}</option>
        <option value="A4">A4 (21x30 cm): €{{ prints['A4'] }}</option>
        <option value="A3">A3 (30x42 cm): €{{ prints['A3'] }}</option>
      </select>

      <AddToCart
        :id="`${id}`"
        :price="basePrice"
        :title="title"
        :decription="size"
        :image="`${url}?w=600`"
        :sizes="priceOptions(priceEntries)"
        :selectedSize="size"
        :url="validateUrl(id, host)"
      />
    </section>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'art' })

const { public: { priceTable: { prints } } } = useRuntimeConfig()
const { fetchImageById } = useContentfulImages()
const localePath = useLocalePath()
const host = useHost()
const priceEntries = Object.entries(prints)
const baseSize = priceEntries[0][0]
const basePrice = priceEntries[0][1]
const size = ref(baseSize)
const { query, params: { id } } = useRoute()

if (query.size) size.value = query.size

const { url, title, description, tags } = await fetchImageById(id)

useArtSeo({ title, description, imageUrl: url })

</script>

<style lang="postcss">
.select-size {
  appearance: none;
  background: url('~/assets/icons/chevron-down.svg') no-repeat right 1rem top 50% / 2rem;
}
</style>
