<template>
  <div class="sm:columns-2 md:columns-3 mb-2">
    <div class="mb-2">
      <h1 class="font-bold text-2xl lowercase font-metalsmith mb-1">{{ title }}</h1>
      <h2 class="font-bold text-xl">{{ description }}</h2>
    </div>
    <ArtMasonryImage
      v-for="{id, title, url} in images"
      :key="id"
      v-bind="{id, title, url}"
    />
  </div>
</template>
<script setup>
definePageMeta({layout: 'art'})
const {params} = useRoute()
const {client} = useContentful()
const title = ref('')
const description = ref('')
const images = ref([])
const fetchPage = async () => {
  const entries = await client.getEntries({
    content_type: 'artGalleryPage',
    include: 10,
    'fields.slug[match]': params.slug[0]
  })
  return entries?.items?.[0].fields || undefined
}

fetchPage().then((fields) => {
  title.value = fields.title
  description.value = fields.description
  images.value = fields.images.map(i => ({
    id: i.sys.id,
    url: i.fields.file.url,
    title: i.fields.title
  }))
})
</script>
