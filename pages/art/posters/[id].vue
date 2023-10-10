<template>
  <ArtBreadcrumbs class="h-[55px]"/>
  <div class="grid md:grid-cols-2 gap-1 md:gap-4 mb-2">
    <div class="md:hidden">
      <h1 class="text-2xl font-avenir">{{ title }}</h1>
      <p v-if="tags.artist" class="text-sm" >
        By <NuxtLink :to="localePath(artistSlug(tags.artist))" class="underline">{{ tags.artist.name }}</NuxtLink>
      </p>
    </div>
    <section class="bg-softGrey mobile:-mx-1">
      <GalleryPosters :images="images" class="max-w-[60rem] mx-auto"/>
    </section >
    <section>
      <div class="md:mt-3 mb-2">
        <h1 class="mobile:hidden text-2xl font-avenir">{{ title }}</h1>

        <p v-if="tags.artist" class="text-sm mb-1 mobile:hidden" >
           By <NuxtLink :to="localePath(artistSlug(tags.artist))" class="underline">{{ tags.artist.name }}</NuxtLink>
        </p>

        <ul v-if="tags.page?.length" class="tags mb-1 text-right md:text-left">
          <template v-for="tag in tags.page" :key="tag">
            <li v-if="tag !== 'Home'" class="inline-block text-1.8 px-1 leading-9 mr-1 last:mr-0 bg-lightGrey">
              <NuxtLink :to="localePath(categorySlug(tag))">{{ tag.name }}</NuxtLink>
            </li>
          </template>
        </ul>
        <h2 v-if="description" class="text-2">{{description}}</h2>
      </div>

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
          :image="`${images[0].url}?w=600`"
          :sizes="priceOptions(priceEntries)"
          :selectedSize="size"
          :url="validateUrl(id, host, 'posters')"
          :ecomDisabled="ecomDisabled"
      />
      <UiAccordion class="mt-3 md:mt-5">
        <UiAccordionItem :title="$t('art.accordion.shipping.title')" title-class="text-black">
          <p class="text-sm text-justify mb-1">{{$t('art.accordion.shipping.line1')}}</p>
          <p class="text-sm text-justify">{{$t('art.accordion.shipping.line2')}}</p>
        </UiAccordionItem>
        <UiAccordionItem :title="$t('art.accordion.materials.title')" title-class="text-black">
          <p class="text-sm text-justify">{{$t('art.accordion.materials.descPosters')}}</p>
        </UiAccordionItem>
      </UiAccordion>
    </section>
  </div>
</template>
<script setup>

definePageMeta({ layout: 'art' })
const { params: { id } } = useRoute()
const { getPoster } = useContentfulPosters()
const host = useHost()

const { title, description, images, tags, specialPrice } = await getPoster(id)

const { public: { priceTable: { posters } } } = useRuntimeConfig()
const pricing = computed(() => specialPrice || posters)
const priceEntries = computed(() => Object.entries(pricing.value))
const baseSize = computed(() => priceEntries.value[0][0])
const basePrice = computed(() => priceEntries.value[0][1])
const size = ref(baseSize.value)

const ecomDisabled = computed(() => tags?.settings.includes('settingEcomDisabled'))

</script>
