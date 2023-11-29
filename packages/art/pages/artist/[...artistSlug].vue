<template>
  <div class="mt-3">
    <LazyArtistBanner v-if="heroBanner" v-bind="heroBanner.fields" class="max-w-screen-md mx-auto"/>
    <LazyMasonryImageGallery
        v-if="images?.length"
      :title="title"
      :description="description"
      :show-title-desc="!heroBanner"
      :images="images"
      :slug="slug"
    />
    <LazyMasonryPosterGallery
        v-if="posters?.length"
        :posters="posters" :slug="slug"/>
  </div>
</template>
<script setup>

const { params: { artistSlug } } = useRoute()
const { getArtGalleryPage } = useContentfulPhotos()
const { getPostersByTags } = useContentfulPosters()
const { gtag } = useGtag()
const slug = computed(() => `art/artist/${artistSlug[0].toLowerCase()}`)
const { title, description, images, heroBanner } = await getArtGalleryPage(slug.value, 25)
if (!heroBanner?.fields) {
  useArtSeo({ title, description, imageUrl: images?.[0].url })
}
const posters = await getPostersByTags([`artist${capitalize(artistSlug[0])}`])

gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Artist Page - ${artistSlug[0]}`
})

</script>
