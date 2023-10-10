<template>
  <ArtBreadcrumbs class="h-[55px]"/>
  <div class="max-w-screen-lg mx-auto mb-3 md:mb-5 grid md:grid-cols-[minmax(50%,max-content)_auto] gap-1 md:gap-2 lg:gap-5">
    <section class="md:justify-self-end">
      <div class="p-2 md:p-4 bg-softGrey mobile:-mx-1">
        <img class="bg-white image-frame" :src="`${url}?w=800`" :alt="`Surf Garage - ${title}`" data-not-lazy/>
      </div>
    </section>

    <section>
      <div class="md:mt-3 md:mb-1">
        <h1 class="text-2xl font-avenir">{{ title }}</h1>
<!--        <pre>{{tags}}</pre>-->

        <p class="text-sm mb-1">
          <template v-if="tags.artist">
            By <NuxtLink :to="localePath(artistSlug(tags.artist))" class="underline">{{ tags.artist.name }}</NuxtLink>
          </template>
          <span v-if="tags.artist && tags.place">, </span>
          <template v-if="tags.place">
            shot in <NuxtLink :to="localePath(placeSlug(tags.place))" class="underline">{{ tags.place.name }}</NuxtLink>
          </template>
        </p>

        <h2 v-if="description" class="text-2">{{description}}</h2>
      </div>

      <ul class="tags list-none mb-2">
        <template v-for="tag in tags.page" :key="tag">
          <li v-if="tag.name !== 'Home'" class="inline-block text-1.8 px-1 leading-9 mr-1 bg-lightGrey">
            <NuxtLink :to="localePath(categorySlug(tag))">{{ tag.name }}</NuxtLink>
          </li>
        </template>
      </ul>

      <select v-model="size" class="select-size py-1 px-3.5 mb-1 text-2 block w-full md:w-30 font-avenir border-2 text-center">
        <option value="A5" default>A5 (15x21 cm): €{{ pricing['A5'] }}</option>
        <option value="A4">A4 (21x30 cm): €{{ pricing['A4'] }}</option>
        <option value="A3">A3 (30x42 cm): €{{ pricing['A3'] }}</option>
      </select>

      <AddToCart
        :id="`${id}`"
        :price="basePrice"
        :title="title"
        :decription="size"
        :image="`${url}?w=600`"
        :sizes="priceOptions(priceEntries)"
        :selectedSize="size"
        :url="validateUrl(id, host, 'photos')"
      />

      <UiAccordion class="mt-3 md:mt-5">
        <UiAccordionItem :title="$t('art.accordion.shipping.title')" title-class="text-black">
            <p class="text-sm text-justify mb-1">{{$t('art.accordion.shipping.line1')}}</p>
            <p class="text-sm text-justify">{{$t('art.accordion.shipping.line2')}}</p>
        </UiAccordionItem>
        <UiAccordionItem :title="$t('art.accordion.materials.title')" title-class="text-black">
            <p class="text-sm text-justify">{{$t('art.accordion.materials.descPhotos')}}</p>
        </UiAccordionItem>
      </UiAccordion>
    </section>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'art' })

const { public: { priceTable: { photos: pricing } } } = useRuntimeConfig()
const { fetchImageById } = useImages()
const localePath = useLocalePath()
const host = useHost()
const priceEntries = Object.entries(pricing)
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
