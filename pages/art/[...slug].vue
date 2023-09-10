<template>
<!--  <pre>Slug: {{slug}}</pre>-->
<!--  <pre>{{entries}}</pre>-->
  <div class="sm:columns-2 md:columns-3 mb-1 md:mb-2 gap-1 md:gap-2">
    <div class="mb-2">
      <h1 class="text-2xl font-avenir mb-1">{{ title }}</h1>
      <h2 class="text-2">{{ description }}</h2>
    </div>
    <ArtMasonryImage
      v-for="img in images"
      :key="img.id"
      v-bind="{...img, f:encodeURIComponent(slug)}"
    />
  </div>
</template>
<script setup>
import { useArtSeo } from '~/composables/useArtSeo.js'

definePageMeta({ layout: 'art' })
const { params } = useRoute()
const { getArtGalleryPage } = useContentful()
const slug = params.slug[0] ? `art/${params.slug.join('/')}` : 'art'

const { title, description, images } = await getArtGalleryPage(slug)
useArtSeo({ title, description, images })
</script>
