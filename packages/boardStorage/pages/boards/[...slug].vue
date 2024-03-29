<template>
  <div class="lg:grid grid-cols-2 gap-3 mb-2">
    <section class="hidden lg:grid grid-cols-2 gap-2">
      <img
          v-for="{id, url} in images"
          :key="id"
          :src="`${url}?w=600&fm=webp`"
          />
    </section>
    <section>
      <h1 class="text-base md:text-2xl mb-0.5 lg:mb-1 font-avenir font-bold upper">{{ title }}</h1>
      <p class="font-avenir text-base md:text-2xl mb-1">€{{ price }}</p>
      <div class="lg:hidden mb-1">
         <Gallery :images="images" :style="{gridArea: 'gallery-mobile'}"/>
      </div>
      <h2 v-if="description" class="whitespace-pre-line mb-2 leading-relaxed text-2" :style="{gridArea: 'desc'}">{{description}}</h2>
      <div class="text-1.8 font-avenir uppercase">
        <p v-if="type" class="mb-0.5"><span class="font-bold text-sm">{{$t('boards.typeLabel')}}:</span> {{$t(`boards.type.${type}`)}}</p>
        <p v-if="size" class="mb-0.5"><span class="font-bold text-sm">{{$t('boards.size')}}:</span> {{size}}</p>
        <p v-if="volume" class="mb-0.5"><span class="font-bold text-sm">{{$t('boards.volume')}}:</span> {{volume}}L</p>
        <p v-if="brand" class="mb-2"><span class="font-bold text-sm">{{$t('boards.brand')}}:</span> {{brand}}</p>
      </div>
      <p class="text-2 md:text-base">{{$t('boards.message')}}</p>
      <div class="inline-flex w-full lg:w-auto items-center">
        <ScrollTo to="contact" class="flex-1"><button class="add-to-cart">{{$t('boards.contact')}}</button></ScrollTo>
        <a :href="socialMedia.whatsapp"
           class="border-2 p-0.5"
            target="_blank">
          <SvgoWhatsapp filled class="text-2xl"/>
        </a>
      </div>
    </section>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'surf-boards' })
const { params } = useRoute()
const { client } = useContentful()
const { mapImages } = useImages()
const { locale } = useI18n()
const { public: { socialMedia } } = useRuntimeConfig()
const { gtag } = useGtag()

const slug = params.slug[0] ? `boards/${params.slug[0]}` : 'boards/homepage'
const entries = await client.getEntries({
  content_type: 'surfBoard',
  include: 10,
  locale: locale.value,
  'fields.slug[match]': slug
})

const { fields: { title, description, images: rawImages, price, type, size, volume, brand } } = entries?.items?.[0] || {}
const images = mapImages(rawImages)

gtag('event', 'page_view', {
  app_name: 'Surfgarage',
  screen_name: `Secondhand Boards Page - ${slug}`
})
</script>
