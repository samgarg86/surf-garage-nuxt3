<template>
<!--  <pre>Slug: {{slug}}</pre>-->
<!--  <pre>{{entries}}</pre>-->
  <div class="sm:columns-2 md:columns-3 mb-1 md:mb-2 gap-1 md:gap-2">
    <div class="mb-2">
      <h1 class="text-2xl font-avenir mb-1">{{ pageTitle }}</h1>
      <h2 class="text-2">{{ pageDesc }}</h2>
    </div>
    <ArtMasonryImage
      v-for="img in pageImages"
      :key="img.id"
      v-bind="{...img, f:encodeURIComponent(pageSlug)}"
    />
  </div>
</template>
<script setup>
const pageTitle = ref()
const pageDesc = ref()
const pageImages = ref([])
definePageMeta({ layout: 'art' })
const { params: { slug } } = useRoute()
const { getArtGalleryPage, fetchImagesByTags } = useContentfulImages()
const pageSlug = slug?.[0] ? `art/${slug.join('/')}` : 'art'

const { title, description, images } = await getArtGalleryPage(pageSlug)
if (images?.length) {
  pageImages.value = images
  pageTitle.value = title
  pageDesc.value = description
} else {
  const siteTags = useState('siteTags', () => {})
  const pageTagId = `page${capitalize(slug[0])}`
  const placeTag = siteTags.value[pageTagId]
  pageTitle.value = placeTag?.name
  pageImages.value = await fetchImagesByTags(pageTagId, 25)
}
useArtSeo({
  title: pageTitle.value,
  description: pageDesc.value,
  imageUrl: pageImages.value?.[0]?.url
})
</script>
