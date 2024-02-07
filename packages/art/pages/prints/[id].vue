<template>
  <Breadcrumbs class="h-[55px]"/>
  <div class="mb-3 md:mb-5 grid md:grid-cols-[55%_auto] gap-1 md:gap-6 max-w-screen-container mx-auto">
    <section class="mobile:-mx-1">
      <PdpGalleryPhotos :url="url" :title="title" />
    </section>

    <section class="md:mr-2">
      <div class="md:mt-3 md:mb-1">
        <h1 class="text-3xl md:text-4xl font-avenir">{{ title }}</h1>

        <LazyArtistPlaceTag v-if="tags.artist" class="mb-1" :artist="tags.artist" :place="tags.place"/>
        <h2 v-if="description" class="text-2">{{description}}</h2>

        <ul v-if="tags.page?.length" class="tags list-none mb-1">
          <template v-for="tag in tags.page" :key="tag">
            <li v-if="tag.name !== 'Home'" class="inline-block text-sm px-1 leading-9 mr-1 bg-grey-10">
              <NuxtLink :to="localePath(collectionSlug(tag))">{{ tag.name }}</NuxtLink>
            </li>
          </template>
        </ul>

      </div>

      <div class="text-2xl mb-1 font-avenir font-medium">€{{pricing[size]}}</div>
      <SizeSelector v-model="size" class="mb-1"/>
      <AddToCart
        :id="`${id}`"
        :price="basePrice"
        :title="title"
        :decription="size"
        :image="`${url}?w=600`"
        :sizes="priceOptions(priceEntries)"
        :selectedSize="size"
        :url="validateUrl(id, host, 'photos')"
        :ecomDisabled="ecomDisabled"
      />

      <Accordion class="mt-3 md:mt-5">
          <AccordionItem :title="$t('art.accordion.materials.title')" title-class="text-black font-avenir" class="border-t">
              <p class="text-sm text-justify">{{$t('art.accordion.materials.descPhotos')}}</p>
          </AccordionItem>
          <AccordionItem :title="$t('art.accordion.shipping.title')" title-class="text-black font-avenir" class="border-t">
              <p class="text-sm text-justify mb-1">{{$t('art.accordion.shipping.line1')}}</p>
              <p class="text-sm text-justify mb-1">{{$t('art.accordion.shipping.line2')}}</p>
            <p class="text-sm text-justify font-bold">{{$t('art.accordion.shipping.free')}}</p>
          </AccordionItem>
          <AccordionItem :title="$t('art.accordion.contact.title')" title-class="text-black font-avenir" class="border-t">
              <p class="text-sm text-justify">
                  {{$t('art.accordion.contact.desc')}} <ScrollTo to="contact" class="underline">{{$t('art.accordion.contact.link')}}</ScrollTo>
              </p>
          </AccordionItem>
      </Accordion>
    </section>
  </div>
</template>
<script setup>
const { public: { priceTable: { photos: pricing } } } = useRuntimeConfig()
const { fetchImageById } = useImages()
const localePath = useLocalePath()
const host = useHost()
const { gtag } = useGtag()
const priceEntries = Object.entries(pricing)
const baseSize = priceEntries[0][0]
const basePrice = priceEntries[0][1]
const size = ref(baseSize)
const { query, params: { id } } = useRoute()
const ecomDisabled = computed(() => tags?.settings.includes('settingEcomDisabled'))
const { t } = useI18n()
const reqUrl = useRequestURL()

if (query.size) size.value = query.size
const seoDescription = ref('')

const { url, title, description, tags } = await fetchImageById(id)
if (description) seoDescription.value = description
else if (tags.artist || tags.place) {
  seoDescription.value = `${t('art.photo')} ${t('art.by').toLowerCase()} ${tags.artist?.name}${tags.place ? `, ${t('art.shot-in')} ${tags.place.name}` : ''}`
}

useArtSeo({ title, description: seoDescription, imageUrl: url, siteUrl: reqUrl.href })

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Prints Page - ${title}`
})

</script>

<style lang="postcss">
.select-size {
  appearance: none;
  background: url('@core/assets/icons/chevron-down.svg') no-repeat right 1rem top 50% / 2rem;
}
</style>
