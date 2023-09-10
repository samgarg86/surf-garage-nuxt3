<template>
  <!--    <pre>Artist: {{placeSlug[0]}}</pre>-->
  <div class="sm:columns-2 md:columns-3 mb-1 md:mb-2 gap-1 md:gap-2">
    <div class="mb-2">
      <h1 class="text-2xl font-avenir mb-1">{{ title }}</h1>
      <h2 class="text-2">{{ description }}</h2>
    </div>
    <ArtMasonryImage
        v-for="img in images"
        :key="img.id"
        v-bind="{...img, f:encodeURIComponent(placeSlug[0])}"
    />
  </div>
</template>
<script setup>

definePageMeta({ layout: 'art' })
const { params: { placeSlug } } = useRoute()
const { getArtGalleryPage, fetchImagesByTags } = useContentful()
// const artistImages = ref([])
const { title, description, images } = await getArtGalleryPage(`art/place/${placeSlug[0].toLowerCase()}`, 50)
useArtSeo({ title, description, images })
// if (images.length) artistImages.value = images
// else {
//   artistImages.value = await fetchImagesByTags(`artist${placeSlug[0]}`)
// }
</script>
