<template>
  <div class="mb-2">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 lg:py-2 max-w-screen-md mx-auto">
      <div class="text-center md:text-left">
        <h1 class="font-primary text-[6rem] mb-2 leading-[8rem] overflow-hidden overflow-ellipsis">{{name}}</h1>
        <p class="whitespace-pre-wrap text-2">{{description}}</p>
      </div>
      <Image
        :src="`${image}?w=800&fm=webp`"
        :alt="`Artist | ${name}`"
        class="aspect-square object-cover object-top mx-auto"
        fetch-priority="high"
      />
    </div>
  </div>
  <p class="text-center font-primary font-medium mt-3 mb-2 pb-1 border-b text-1.8">{{`${name}'s ${$t('art.artwork')}`}}</p>
</template>
<script setup>

defineProps({
  name: String,
  description: String,
  image: String
})
</script>
