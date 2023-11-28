<template>
  <CategoryBanner :title="pageTitle" :description="pageDesc" />
  <MasonryImageGallery :images="pageImages" :slug="pageSlug"/>
</template>
<script setup>
const pageTitle = ref()
const pageDesc = ref()
const pageImages = ref([])

const { params: { slug } } = useRoute()
const { getArtGalleryPage } = useContentfulPhotos()
const { fetchImagesByTags } = useImages()
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
