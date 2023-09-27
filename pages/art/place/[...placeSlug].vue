<template>
  <!--    <pre>Artist: {{placeSlug[0]}}</pre>-->
  <ArtMasonryImageGallery
      :title="pageTitle"
      :description="pageDesc"
      :show-title-desc="true"
      :images="placeImages"/>
</template>
<script setup>

definePageMeta({ layout: 'art' })
const { params: { placeSlug } } = useRoute()
const { getArtGalleryPage, fetchImagesByTags } = useContentfulPhotos()

const pageTitle = ref()
const pageDesc = ref()
const placeImages = ref([])
const slug = computed(() => `art/place/${placeSlug[0].toLowerCase()}`)
const { title, description, images } = await getArtGalleryPage(slug.value)

if (images?.length) {
  placeImages.value = images
  pageTitle.value = title
  pageDesc.value = description
} else {
  const siteTags = useState('siteTags', () => {})
  const placeTagId = `place${capitalize(placeSlug[0])}`
  const placeTag = siteTags.value[placeTagId]
  pageTitle.value = placeTag?.name
  placeImages.value = await fetchImagesByTags(placeTagId, 25)
}
useArtSeo({
  title: pageTitle.value,
  description: pageDesc.value,
  imageUrl: placeImages.value?.[0]?.url
})
</script>
