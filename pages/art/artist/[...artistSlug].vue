<template>
<!--    <pre>Artist: {{artistSlug[0]}}</pre>-->
  <div class="sm:columns-2 md:columns-3 mb-1 md:mb-2 gap-1 md:gap-2">
    <div class="mb-2">
      <h1 class="text-2xl font-avenir mb-1">{{ title }}</h1>
      <h2 class="text-2">{{ description }}</h2>
    </div>
    <ArtMasonryImage
        v-for="img in images"
        :key="img.id"
        v-bind="{...img, f:encodeURIComponent(artistSlug[0])}"
    />
  </div>
</template>
<script setup>
definePageMeta({ layout: 'art' })
const { params: { artistSlug } } = useRoute()
const { getArtGalleryPage } = useContentful()
// const artistImages = ref([])
const { title, description, images } = await getArtGalleryPage(`art/artist/${artistSlug[0].toLowerCase()}`, 25)
useArtSeo({ title, description, imageUrl: images?.[0].url })
// if (images.length) artistImages.value = images
// else {
//   artistImages.value = await fetchImagesByTags(`artist${artistSlug[0]}`)
// }
</script>
