<template>
  <Breadcrumbs class="h-[55px]"/>
  <div class="grid md:grid-cols-2 gap-1 md:gap-4 mb-2 max-w-screen-lg mx-auto">
    <div class="md:hidden">
      <h1 class="text-2xl font-avenir">{{ title }}</h1>
      <p v-if="tags.artist" class="text-sm" >
        By <NuxtLink :to="localePath(artistSlug(tags.artist))" class="underline">{{ tags.artist.name }}</NuxtLink>
      </p>
    </div>
    <section class="mobile:-mx-1">
      <GalleryPosters :images="images" />
    </section >
    <section class="md:mr-2">
      <div class="md:mt-3 mb-2">
        <h1 class="mobile:hidden text-2xl font-avenir">{{ title }}</h1>

        <p v-if="tags.artist" class="text-sm mb-1 mobile:hidden" >
           By <NuxtLink :to="localePath(artistSlug(tags.artist))" class="underline">{{ tags.artist.name }}</NuxtLink>
        </p>

        <ul v-if="tags.page?.length" class="tags mb-1 text-right md:text-left">
          <template v-for="tag in tags.page" :key="tag">
            <li v-if="tag !== 'Home'" class="inline-block text-sm px-1 leading-9 mr-1 last:mr-0 bg-lightGrey">
              <NuxtLink :to="localePath(categorySlug(tag))">{{ tag.name }}</NuxtLink>
            </li>
          </template>
        </ul>
        <h2 v-if="description" class="text-2">{{description}}</h2>
      </div>
      <div class="text-xl mb-1 font-avenir font-bold">€{{pricing[size]}}</div>
      <SizeSelector v-model="size" class="mb-2"/>

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
        <AccordionItem :title="$t('art.accordion.materials.title')" title-class="text-black" class="border-t">
          <p class="text-sm text-justify">{{$t('art.accordion.materials.descPosters')}}</p>
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
useArtSeo({ title, description, imageUrl: images[0].url })

</script>
