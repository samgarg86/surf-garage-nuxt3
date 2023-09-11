<template>
  <!--    <pre>Artist: {{placeSlug[0]}}</pre>-->
  <div class="sm:columns-2 md:columns-3 mb-1 md:mb-2 gap-1 md:gap-2">
    <div class="mb-2">
      <h1 class="text-2xl font-avenir mb-1">{{ pageTitle }}</h1>
      <h2 class="text-2">{{ pageDesc }}</h2>
    </div>
    <ArtMasonryImage
        v-for="img in placeImages"
        :key="img.id"
        v-bind="{...img, f:encodeURIComponent(slug)}"
    />
  </div>
</template>
<script setup>

definePageMeta({ layout: 'art' })
const { params: { placeSlug } } = useRoute()
const { getArtGalleryPage, fetchImagesByTags } = useContentful()

const pageTitle = ref()
const pageDesc = ref()
const placeImages = ref([])
const slug = computed(() => `art/place/${placeSlug[0].toLowerCase()}`)
const { title, description, images } = await getArtGalleryPage(slug.value, 50)

if (images?.length) {
  placeImages.value = images
  pageTitle.value = title
  pageDesc.value = description
} else {
  const place = placeSlug[0].charAt(0).toUpperCase() + placeSlug[0].slice(1)
  pageTitle.value = place
  placeImages.value = mapImages(await fetchImagesByTags(`place${place}`, 25))
}
useArtSeo({
  title: pageTitle.value,
  description: pageDesc.value,
  imageUrl: placeImages.value?.[0]?.url
})
</script>
