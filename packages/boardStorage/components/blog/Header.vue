<template>
  <header class="font-metalsmith text-xl md:text-2xl text-center py-1 mb-2">
<!--    <NuxtLink :to="localeRoute('/')">surf garage</NuxtLink>-->
      <NuxtLink
          class="block text-center"
          :to="localeRoute('/')">
        <img src="/logo.png" class="w-15 mx-auto" alt="Surf Garage - Second Hand Boards" data-not-lazy/>
      </NuxtLink>
  </header>
</template>
<script setup>
const localeRoute = useLocaleRoute()
</script>
