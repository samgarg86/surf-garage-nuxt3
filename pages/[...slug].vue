<template>
  <div class="max-w-[90rem] mx-auto">
  <h1 class="font-avenir text-3xl font-bold mb-2">{{title}}</h1>
  <BlogRichText v-bind="text" />
  </div>
<!--  <pre>{{entries.items[0]}}</pre>-->
</template>
<script setup>
definePageMeta({ layout: 'blog' })
const { params } = useRoute()
const { client } = useContentful()
const { locale } = useI18n()

const slug = params.slug[0]
const entries = await client.getEntries({
  content_type: 'contentPage',
  include: 10,
  locale: locale.value,
  'fields.slug[match]': slug
})
const { title, text } = entries?.items?.[0]?.fields || {}
</script>
