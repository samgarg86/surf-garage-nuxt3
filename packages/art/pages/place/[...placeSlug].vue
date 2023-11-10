<template>
  <MasonryImageGallery
      :title="pageTitle"
      :description="pageDesc"
      :show-title-desc="true"
      :images="placeImages"
      :slug="slug"
      class="mt-3"
  />
</template>
<script setup>

const { params: { placeSlug } } = useRoute()
const { getArtGalleryPage } = useContentfulPhotos()
const { fetchImagesByTags } = useImages()

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
