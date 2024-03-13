<template>
  <div>
    <NuxtLink :to="localePath(`/${slug}`)" class="text-2 mb-2 block">
      <img :src="`${image}?w=600&fm=webp`" class="mb-1" />
      <p class="font-avenir font-bold">{{ title }}</p>
      <p class="font-avenir">€{{ price }}</p>
    </NuxtLink>
  </div>
</template>
<script setup>
defineProps({
  slug: String,
  title: String,
  price: Number,
  image: String
});
const localePath = useLocalePath();
</script>
