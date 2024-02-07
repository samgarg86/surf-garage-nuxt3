<template>
  <PageHeader :title="pageTitle" :description="pageDesc" />
  <MasonryImageGallery :images="placeImages" :slug="slug" show-artist/>
  <div ref="endOfScroller"></div>
</template>
<script setup>

const { params: { placeSlug } } = useRoute()
const { fetchImagesByTags } = useImages()
const { gtag } = useGtag()
const { images, pageTitle: pTitle, pageDescription, fetchArtGalleryPage, loadMoreArtGalleryImages } = useContentfulPhotos()
const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()

const pageTitle = ref()
const pageDesc = ref()
const placeImages = ref([])
const slug = computed(() => `art/place/${placeSlug[0].toLowerCase()}`)
const endOfScroller = ref(null)
const page = ref(1)

await Promise.all([fetchArtGalleryPage(slug.value)])

if (images.value?.length) {
  placeImages.value = images.value
  pageTitle.value = pTitle.value
  pageDesc.value = pageDescription.value
} else {
  const siteTags = useState('siteTags', () => {})
  const placeTagId = `place${capitalize(placeSlug[0])}`
  console.log(`Tag page doesn't exist, fetching images for tag ${placeTagId}`)
  const placeTag = siteTags.value[placeTagId]
  pageTitle.value = placeTag?.name
  placeImages.value = await fetchImagesByTags(placeTagId, 25)
}
useArtSeo({
  title: pageTitle.value,
  description: pageDesc.value,
  imageUrl: placeImages.value?.[0]?.url
})

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Place Page - ${slug.value}`
})

onMounted(async () => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.intersectionRatio > 0) {
      loadMoreArtGalleryImages(page.value * pageSize)
      page.value++
    }
  }, { rootMargin: '100px' })
  observer.observe(endOfScroller.value)
})
</script>
