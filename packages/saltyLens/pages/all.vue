<template>
  <PageHeader :title="pageTitle" :description="pageDesc" />
  <MasonryImageGallery :images="images" slug="" show-artist/>
  <div ref="endOfScroller"></div>
</template>
<script setup>

const { t } = useI18n()
const pageTitle = t('art.all.title')
const pageDesc = t('art.all.description')

const { gtag } = useGtag()
const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()

const endOfScroller = ref(null)
const page = ref(1)
const { images, pageMainImage, fetchAllArtworkPage, loadMoreArtGalleryImages } = useContentfulPhotos()

await fetchAllArtworkPage()

useArtSeo({
  title: pageTitle,
  description: pageDesc,
  imageUrl: pageMainImage.value
})

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Page - ${pageTitle}`
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
