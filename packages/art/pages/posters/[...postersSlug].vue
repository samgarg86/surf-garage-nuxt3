<template>
  <PageHeader :title="pageTitle" :description="pageDescription" />
  <MasonryPosterGallery v-if="posters?.length" :posters="posters" :slug="slug"/>
  <div ref="endOfScroller"></div>
</template>
<script lang="ts" setup>
const { params: { postersSlug } } = useRoute()
const { posters, getPostersByTags, loadMorePosters } = useContentfulPosters()
const { pageTitle, pageDescription, pageMainImage, fetchArtGalleryPage, pageTags } = useContentfulPhotos()
const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()
const slug = `art/posters/${Array.isArray(postersSlug) ? postersSlug.join('/') : postersSlug}`
const { gtag } = useGtag()
const reqUrl = useRequestURL()

await fetchArtGalleryPage(slug)
pageTags.value && await getPostersByTags(pageTags.value)

const endOfScroller = ref(null)
const page = ref(1)

useArtSeo({
  title: pageTitle.value,
  description: pageDescription.value,
  imageUrl: pageMainImage.value,
  siteUrl: reqUrl.href
})

onMounted(async () => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.intersectionRatio > 0) {
      loadMorePosters(page.value * pageSize, pageTags.value)
      page.value++
    }
  }, { rootMargin: '100px' })
  observer.observe(endOfScroller.value)
})

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Page - ${pageTitle.value}`
})
</script>
