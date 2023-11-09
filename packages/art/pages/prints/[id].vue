<template>
  <Breadcrumbs class="h-[55px]"/>
  <div class="max-w-screen-lg mx-auto mb-3 md:mb-5 grid md:grid-cols-[60%_auto] gap-1 md:gap-8">
    <section class="bg-softGrey mobile:-mx-1">
      <div class="px-2 py-3 md:px-5 md:py-6">
        <img class="bg-white image-frame mx-auto border-[2rem] md:border-[3rem] border-white max-h-[70rem]" :src="`${url}?w=700`" :alt="`Surf Garage - ${title}`" data-not-lazy/>
      </div>
    </section>

    <section class="md:mr-2">
      <div class="md:mt-3 md:mb-1">
        <h1 class="text-2xl font-avenir">{{ title }}</h1>

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

      <ul class="tags list-none mb-1">
        <template v-for="tag in tags.page" :key="tag">
          <li v-if="tag.name !== 'Home'" class="inline-block text-sm px-1 leading-9 mr-1 bg-lightGrey">
            <NuxtLink :to="localePath(categorySlug(tag))">{{ tag.name }}</NuxtLink>
          </li>
        </template>
      </ul>

      <div class="text-xl mb-1 font-avenir font-bold">€{{pricing[size]}}</div>
      <SizeSelector v-model="size" class="mb-2"/>
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

      <Accordion class="mt-3 md:mt-5">
          <AccordionItem :title="$t('art.accordion.materials.title')" title-class="text-black" class="border-t">
              <p class="text-sm text-justify">{{$t('art.accordion.materials.descPhotos')}}</p>
          </AccordionItem>
          <AccordionItem :title="$t('art.accordion.shipping.title')" title-class="text-black" class="border-t">
              <p class="text-sm text-justify mb-1">{{$t('art.accordion.shipping.line1')}}</p>
              <p class="text-sm text-justify mb-1">{{$t('art.accordion.shipping.line2')}}</p>
            <p class="text-sm text-justify font-bold">{{$t('art.accordion.shipping.free')}}</p>
          </AccordionItem>
          <AccordionItem :title="$t('art.accordion.contact.title')" title-class="text-black" class="border-t">
              <p class="text-sm text-justify">
                  {{$t('art.accordion.contact.desc')}} <ScrollTo to="contact" class="underline">{{$t('art.accordion.contact.link')}}</ScrollTo>
              </p>
          </AccordionItem>
      </Accordion>
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
  background: url('@core/assets/icons/chevron-down.svg') no-repeat right 1rem top 50% / 2rem;
}
</style>
