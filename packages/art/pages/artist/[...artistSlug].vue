<template>
  <div class="mt-3">
    <LazyArtistBanner v-if="pageHeroBanner" v-bind="pageHeroBanner.fields" class="max-w-screen-md mx-auto"/>
    <LazyMasonryImageGallery
        v-if="images?.length"
      :title="title"
      :description="description"
      :show-title-desc="!pageHeroBanner"
      :images="images"
      :slug="slug"
    />
    <LazyMasonryPosterGallery
        v-if="posters?.length"
        :posters="posters" :slug="slug"/>
    <div ref="endOfScroller"></div>
  </div>
</template>
<script setup>

const { params: { artistSlug } } = useRoute()
const { getPostersByTags } = useContentfulPosters()
const { gtag } = useGtag()
const { images, pageHeroBanner, pageTitle, pageDescription, fetchArtGalleryPage, loadMoreArtGalleryImages } = useContentfulPhotos()
const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()

const slug = computed(() => `art/artist/${artistSlug[0].toLowerCase()}`)
const endOfScroller = ref(null)
const page = ref(1)

await Promise.all([fetchArtGalleryPage(slug.value)])

if (!pageHeroBanner.value?.fields) {
  useArtSeo({ title: pageTitle.value, description: pageDescription.value, imageUrl: images.value?.at(0).url })
}
const posters = await getPostersByTags([`artist${capitalize(artistSlug[0])}`])

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Artist Page - ${artistSlug[0]}`
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
