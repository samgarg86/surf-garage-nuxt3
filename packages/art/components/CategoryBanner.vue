<template>
  <div class="py-4 md:py-6 text-center max-w-screen-md mx-auto">
    <h1 class="text-[8rem] md:text-[10rem] font-avenir mb-2 leading-none overflow-hidden overflow-ellipsis">{{ title }}</h1>
    <h2 v-if="description" class="text-2">{{ description }}</h2>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  description: String
})
</script>
