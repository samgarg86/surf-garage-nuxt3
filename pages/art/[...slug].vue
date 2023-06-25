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
const mappedImages = ref([])
const slug = params.slug[0] ? `art/${params.slug[0]}` : 'art/homepage'
// console.log('Looking for art gallery page with slug', slug)

const entries = await client.getEntries({
  content_type: 'artGalleryPage',
  include: 10,
  locale: locale.value,
  'fields.slug[match]': slug
})

const { fields: { title, description, images }, metadata: { tags } } = entries?.items?.[0] || {}

if (tags?.length) {
  const { items } = await client.getAssets({
    'metadata.tags.sys.id[all]': tags.map(tag => tag.sys.id).join(','),
    locale: locale.value
  })
  mappedImages.value = mapImages(items)
} else if (images?.length) {
  mappedImages.value = mapImages(images)
}
</script>
