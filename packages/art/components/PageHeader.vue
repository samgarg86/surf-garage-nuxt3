<template>
  <div class="py-4 md:py-6 text-center max-w-[70rem] mx-auto">
    <h1 class="text-[6rem] md:text-[10rem] font-avenir leading-none tracking-tight overflow-hidden overflow-ellipsis">{{ title }}</h1>
    <h2 v-if="description" class="text-sm md:text-2 mt-1 md:mt-2">{{ description }}</h2>
  </div>
</template>
<script setup lang="ts">
defineProps<{title: string, description?: string}>()
</script>
