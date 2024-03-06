<template>
  <PageHeader :title="title" />
  <div class="max-w-[80rem] mx-auto mt-5 px-1 md:px-2">
    <RichText v-bind="text" />
  </div>
</template>
<script setup lang="ts">
const { params: { contentSlug } } = useRoute()
const { client } = useContentful()
const { locale } = useI18n()
const { gtag } = useGtag()

const slug = contentSlug.join('/')
const entries = await client.getEntries({
  content_type: 'artContentPage',
  include: 10,
  locale: locale.value,
  'fields.slug': slug
})
const { title, description, text, keywords } = entries?.items?.[0]?.fields || {}

useArtSeo({title, description, keywords})
gtag('event', 'page_view', {
  app_name: 'Surfgarage Art',
  screen_name: `Content Page - ${slug}`
})
</script>
