<template>
  <ArtistBanner v-if="heroBanner" v-bind="heroBanner.fields" class="max-w-screen-md mx-auto"/>
  <MasonryImageGallery
    :title="title"
    :description="description"
    :show-title-desc="!heroBanner"
    :images="images"
    :slug="slug"
  />
  <MasonryPosterGallery :posters="posters" :slug="slug"/>
</template>
<script setup>

definePageMeta({ layout: 'art' })
const { params: { artistSlug } } = useRoute()
const { getArtGalleryPage } = useContentfulPhotos()
const { getPostersByTags } = useContentfulPosters()
const slug = computed(() => `art/artist/${artistSlug[0].toLowerCase()}`)
const { title, description, images, heroBanner } = await getArtGalleryPage(slug.value, 25)
if (!heroBanner?.fields) {
  useArtSeo({ title, description, imageUrl: images?.[0].url })
}
const posters = await getPostersByTags([`artist${capitalize(artistSlug[0])}`])

</script>
