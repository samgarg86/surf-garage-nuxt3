<template>
  <div class="mt-3">
    <LazyArtistBanner :name="pageTitle" :description="pageDescription" :image="pageMainImage" class="max-w-screen-md mx-auto"/>
    <LazyMasonryImageGallery
      v-if="images?.length"
      :images="images"
      :slug="slug"
      show-place
    />
    <LazyMasonryPosterGallery v-if="posters?.length" :posters="posters" :slug="slug"/>
    <div ref="endOfScroller"></div>
  </div>
</template>
<script setup>

const { params: { artistSlug } } = useRoute()
const { getPostersByTags } = useContentfulPosters()
const { gtag } = useGtag()
const { images, pageTitle, pageDescription, pageMainImage, pageTags, fetchArtGalleryPage, loadMoreArtGalleryImages } = useContentfulPhotos()
const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()

const slug = computed(() => `art/artist/${artistSlug[0].toLowerCase()}`)
const endOfScroller = ref(null)
const page = ref(1)

await fetchArtGalleryPage(slug.value)

const posters = await getPostersByTags(pageTags.value)

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Artist Page - ${artistSlug[0]}`
})

onMounted(async () => {
  if (images.value.length === 0) return
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.intersectionRatio > 0) {
      loadMoreArtGalleryImages(page.value * pageSize)
      page.value++
    }
  }, { rootMargin: '100px' })
  observer.observe(endOfScroller.value)
})

useArtSeo({ title: pageTitle.value, description: pageDescription.value, imageUrl: pageMainImage.value })
</script>
