<template>
  <PageHeader :title="pageTitle" :description="pageDesc" />
  <MasonryImageGallery :images="pageImages" :slug="pageSlug" show-artist/>
  <div ref="endOfScroller"></div>
</template>
<script setup>
const pageTitle = ref()
const pageDesc = ref()
const pageImages = ref([])
const pageMainImg = ref('')

const { params: { slug } } = useRoute()
const { images, pageTitle: pTitle, pageDescription, pageMainImage, fetchArtGalleryPage, loadMoreArtGalleryImages } = useContentfulPhotos()
const { fetchImagesByTags } = useImages()
const { gtag } = useGtag()
const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()

const pageSlug = slug?.[0] ? `art/${slug.join('/')}` : 'art'
const endOfScroller = ref(null)
const page = ref(1)

await fetchArtGalleryPage(pageSlug)

if (images.value?.length) {
  pageImages.value = images.value
  pageTitle.value = pTitle.value
  pageDesc.value = pageDescription.value
  pageMainImg.value = pageMainImage.value
} else {
  const siteTags = useState('siteTags', () => {})
  const pageTagId = `page${capitalize(slug[0])}`
  const placeTag = siteTags.value[pageTagId]
  pageTitle.value = placeTag?.name
  pageImages.value = await fetchImagesByTags(pageTagId, 25)
  pageMainImg.value = pageImages.value?.[0]?.url || ''
}
useArtSeo({
  title: pageTitle.value,
  description: pageDesc.value,
  imageUrl: pageMainImg.value
})

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Page - ${pageTitle.value}`
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
