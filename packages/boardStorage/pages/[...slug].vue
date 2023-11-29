<template>
  <div class="py-5 md:py-10 bg-grey-30 px-1 md:px-2 blog-banner"
       :class="{'text-white bg-image': !!image}"
       :style="{'--bg-img': `url(${image})`}">

    <div class="max-w-[70rem] mx-auto">
      <h1 class="text-4xl md:text-[6rem] text-center mx-auto leading-none">{{title}}</h1>
      <p v-if="description" class="font-avenir text-center text-base mt-2 leading-relaxed">{{description}}</p>
    </div>
  </div>
  <div class="max-w-[80rem] mx-auto mt-5 px-1 md:px-2">
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
const { title, description, text, bannerImage, keywords } = entries?.items?.[0]?.fields || {}
const image = computed(() => bannerImage?.fields.file.url ? `${bannerImage?.fields.file.url}?w=1000&fm=webp` : '')
useBlogSeo({ title, description, imageUrl: image.value, keywords })
</script>
<style lang="postcss">
.blog-banner.bg-image {
  background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
  ), var(--bg-img) no-repeat center center;
  background-size: cover;
}
</style>
