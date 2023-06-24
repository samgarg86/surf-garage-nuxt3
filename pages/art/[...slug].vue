<template>
  <div class="sm:columns-2 md:columns-3 mb-2">
    <div class="mb-2">
      <h1 class="text-2xl lowercase font-metalsmith mb-1">{{ title }}</h1>
      <h2 class="text-base">{{ description }}</h2>
    </div>
    <ArtMasonryImage
      v-for="{id, title, url} in mappedImages"
      :key="id"
      v-bind="{id, title, url}"
    />
  </div>
</template>
<script setup>
definePageMeta({ layout: 'art' })
const { params } = useRoute()
const { client } = useContentful()
const { locale } = useI18n()

const entries = await client.getEntries({
  content_type: 'artGalleryPage',
  include: 10,
  locale: locale.value,
  'fields.slug[match]': params.slug[0] || 'art-homepage'
})

const { title, description, images } = entries?.items?.[0].fields || {}
const mappedImages = images.map(i => ({
  id: i.sys.id,
  url: i.fields.file.url,
  title: i.fields.title
}))
</script>
