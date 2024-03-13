<template>
  <header class="font-metalsmith text-center py-0.5 md:py-1 mb-2 border-b-2">
    <NuxtLink :to="localeRoute('/boards')">
      <p class="text-xl md:text-2xl">surf garage</p>
      <p class="text-sm md:text-1.8 font-myriad uppercase">
        Second Hand Surfboards
      </p>
    </NuxtLink>
  </header>
</template>
<script setup>
const localeRoute = useLocaleRoute();
</script>
<style>
.snipcart-checkout svg {
  width: 100%;
  height: 100%;
}
</style>
