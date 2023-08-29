<template>
  <div class="lg:grid grid-cols-4 gap-2">
    <BoardsTile v-for="tile in boards" :key="tile.id" v-bind="tile"/>
  </div>
</template>
<script setup>
const { client } = useContentful()
const { locale } = useI18n()
const tiles = await client.getEntries({
  content_type: 'surfBoard',
  include: 10,
  locale: locale.value
})
const boards = tiles?.items.map(({ sys: { id }, fields }) => ({
  id,
  slug: fields.slug,
  title: fields.title,
  price: fields.price,
  image: fields.images[0].fields.file.url
}))
definePageMeta({ layout: 'surf-boards' })
</script>
