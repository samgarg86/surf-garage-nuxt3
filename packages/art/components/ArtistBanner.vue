<template>
  <div class="mb-2">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 lg:py-2 max-w-screen-md mx-auto">
      <div>
        <h1 class="font-avenir text-3xl mb-2">{{name}}</h1>
        <p class="whitespace-pre-wrap text-2">{{description}}</p>
      </div>
      <img :src="imageUrl" :alt="`Artist: ${name}`" data-not-lazy>
    </div>
  </div>
  <p class="font-bold text-center font-avenir mt-3 mb-2 pb-1 border-b ">{{`${name}'s ${$t('art.artwork')}`}}</p>
</template>
<script setup>

const props = defineProps({
  name: String,
  description: String,
  image: Object
})

const { mapImage } = useImages()
const imageUrl = computed(() => mapImage(props.image)?.url)
useArtSeo({ title: props.name, description: props.description, imageUrl })
</script>
