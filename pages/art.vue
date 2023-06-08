<template>
<!--  <pre>-->
<!--    {{entries.items[0]}}-->
<!--  </pre>-->
  <div class="md:columns-2 lg:columns-4 gap-4">
    <NuxtLink
        v-for="({id, url, title}, index) in images"
        :key="index"
        :to="`/prints/${id}`">
      <img
          class="rounded-lg block mb-4 w-full"
          :alt="`Surf Garage - ${title}`"
          :src="url"/>
    </NuxtLink>
  </div>

</template>

<script setup>
import {useContentful} from '#imports';

const contentful = useContentful()
const entries = await contentful.getEntries({
  content_type: 'homepageGallery',
  include: 10
})
const images = entries?.items?.[0].fields.images.map(i => ({
  id: i.sys.id,
  url: i.fields.file.url,
  title: i.fields.title
}))
</script>

