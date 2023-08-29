<template>
  <div>
    <NuxtLink :to="localePath(`/${slug}`)" class="text-2 mb-1 block">
      <img :src="image" class="mb-1" data-not-lazy/>
      <p class="font-avenir font-bold">{{title}}</p>
      <p class="font-avenir">€{{price}}</p>
    </NuxtLink>
  </div>
</template>
<script setup>
defineProps({
  slug: String,
  title: String,
  price: Number,
  image: String
})
const localePath = useLocalePath()
</script>
