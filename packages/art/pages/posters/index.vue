<template>
  <PageHeader title="Posters" />
  <MasonryPosterGallery v-if="posters.length" :posters="posters" slug="posters"/>
  <div ref="endOfScroller"></div>
</template>
<script setup>
const { gtag } = useGtag()
const { posters, loadInitialAllPosters, loadMorePosters } = useContentfulPosters()
const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()

await loadInitialAllPosters()

const endOfScroller = ref(null)
const page = ref(1)

onMounted(async () => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.intersectionRatio > 0) {
      loadMorePosters(page.value * pageSize)
      page.value++
    }
  }, { rootMargin: '100px' })
  observer.observe(endOfScroller.value)
})

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: 'Posters PLP'
})
</script>
