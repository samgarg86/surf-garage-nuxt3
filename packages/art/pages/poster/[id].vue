<template>
  <Breadcrumbs class="h-[55px]"/>
  <div class="grid md:grid-cols-[55%_auto] gap-1 md:gap-6 mb-2 max-w-screen-container mx-auto">
    <section class="mobile:-mx-1">
      <PdpGalleryPosters :images="images" />
    </section >
    <section class="md:mr-2">
      <div class="md:mt-3 mb-1">
        <h1 class="text-3xl md:text-4xl font-avenir">{{ title }}</h1>

        <LazyArtistPlaceTag v-if="tags.artist" class="mb-1" :artist="tags.artist"/>
        <h2 v-if="description" class="text-2">{{description}}</h2>

        <ul v-if="tags.page?.length" class="tags mb-1 text-right md:text-left">
          <template v-for="tag in tags.page" :key="tag">
            <li v-if="tag !== 'Home'" class="inline-block text-sm px-1 leading-9 mr-1 last:mr-0 bg-grey-10">
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
          :image="`${images[0].url}?w=600`"
          :sizes="priceOptions(priceEntries)"
          :selectedSize="size"
          :url="validateUrl(id, host, 'posters')"
          :ecomDisabled="ecomDisabled"
      />
      <Accordion class="mt-3 md:mt-5">
        <AccordionItem :title="$t('art.accordion.materials.title')" title-class="text-black font-avenir" class="border-t">
          <p class="text-sm text-justify">{{$t('art.accordion.materials.descPosters')}}</p>
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
  <LazySliderPosters
      :title="$t('art.moreBy', {name: tags.artist.name})"
      :tag="tags.artist.id"
      class="mt-6"
      order="created"
  />
</template>
<script setup>
const { params: { id } } = useRoute()
const { getPoster } = useContentfulPosters()
const localePath = useLocalePath()
const host = useHost()
const { gtag } = useGtag()
const reqUrl = useRequestURL()

const { title, description, images, tags, specialPrice } = await getPoster(id)

const { public: { priceTable: { posters } } } = useRuntimeConfig()
const pricing = computed(() => specialPrice || posters)
const priceEntries = computed(() => Object.entries(pricing.value))
const baseSize = computed(() => priceEntries.value[0][0])
const basePrice = computed(() => priceEntries.value[0][1])
const size = ref(baseSize.value)
const ecomDisabled = computed(() => tags?.settings.includes('settingEcomDisabled'))
const seoDescription = ref('')
const { t } = useI18n()

if (description) seoDescription.value = description
else if (tags.artist) {
  seoDescription.value = `Poster ${t('art.by').toLowerCase()} ${tags.artist?.name}`
}

useArtSeo({ title, description: seoDescription, imageUrl: images?.[0].url, siteUrl: reqUrl.href })

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Poster Page - ${title}`
})
</script>
