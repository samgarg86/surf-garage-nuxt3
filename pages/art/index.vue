<template>
  <div class="sm:columns-2 md:columns-4 gap-2">
    <NuxtLink
      v-for="({id, url, title}, index) in images"
      :key="index"
      :to="`/art/prints/${id}`">
      <img
        class="rounded-lg block mb-2 w-full"
        :alt="`Surf Garage - ${title}`"
        :src="url"/>
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({layout: "art"});

const {$contentful} = useNuxtApp()
const images = ref([])
$contentful().getEntries({
  content_type: 'homepageGallery',
  include: 10
}).then(({entries}) => {
  images.value = entries.items[0].fields.images.map(i => ({
    id: i.sys.id,
    url: i.fields.file.url,
    title: i.fields.title
  }))
}).catch(e => console.error('Something went wrong while fetching the images from Contentful', e.message))

</script>

