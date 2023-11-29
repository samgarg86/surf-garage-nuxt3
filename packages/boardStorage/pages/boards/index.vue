<template>
  <div class="md:grid grid-cols-2 lg:grid-cols-4 gap-2 mt-1 mb-2">
    <BoardsTile v-for="tile in boards" :key="tile.id" v-bind="tile"/>
  </div>
</template>
<script setup>
const { client } = useContentful()
const { locale } = useI18n()
const { gtag } = useGtag()
const entries = await client.getEntries({
  content_type: 'surfBoard',
  include: 10,
  locale: locale.value
})
const boards = entries?.items.map(({ sys: { id }, fields }) => ({
  id,
  slug: fields.slug,
  title: fields.title,
  price: fields.price,
  image: fields.images[0].fields.file.url
}))
definePageMeta({ layout: 'surf-boards' })

gtag('event', 'page_view', {
  app_name: 'Surfgarage',
  screen_name: 'Secondhand Boards Homepage'
})
</script>
