<template>
  <div class="grid md:grid-cols-2 gap-2 md:gap-4 mb-2">
    <div class="md:hidden">
      <h1 class="text-2xl font-avenir">{{ title }}</h1>
      <p v-if="tags.artist" class="text-sm" >
        By <NuxtLink :to="localePath(`/art/artist/${tags.artist.replace(' ','').toLowerCase()}`)" class="underline">{{ tags.artist }}</NuxtLink>
      </p>
    </div>
    <section class="bg-softGrey mobile:-mx-1">
      <GalleryIllustrations :images="images" class="max-w-[60rem] mx-auto"/>
    </section >
    <section>
      <div class="lg:mt-3 mb-2">
        <h1 class="sm:hidden text-2xl font-avenir">{{ title }}</h1>

        <p v-if="tags.artist" class="text-sm mb-1" >
           By <NuxtLink :to="localePath(`/art/artist/${tags.artist.replace(' ','').toLowerCase()}`)" class="underline">{{ tags.artist }}</NuxtLink>
        </p>

        <ul v-if="tags.page.length" class="tags mb-1">
          <template v-for="tag in tags.page" :key="tag">
            <li v-if="tag !== 'Home'" class="inline-block text-1.8 px-1 leading-9 mr-1 bg-lightGrey">
              <NuxtLink :to="localePath(`/art/${tag}`)">{{ tag }}</NuxtLink>
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
          :url="validateUrl(id, host)"
          :ecomDisabled="ecomDisabled"
      />
    </section>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'art' })
const { params: { id } } = useRoute()
const { getIllustration } = useContentfulImages()
const { public: { priceTable: { illustrations } } } = useRuntimeConfig()
const host = useHost()

const { title, description, images, tags } = await getIllustration(id)
const ecomDisabled = computed(() => tags?.settings.includes('Ecommerce Disabled'))
const pricing = computed(() => {
  // if (special price) return special price
  if (tags?.artist) return illustrations[tags.artist]
})

const priceEntries = computed(() => Object.entries(pricing.value))
const baseSize = computed(() => priceEntries.value[0][0])
const basePrice = computed(() => priceEntries.value[0][1])
const size = ref(baseSize.value)
</script>
