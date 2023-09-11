<template>
  <header class="font-metalsmith text-center py-0.5 md:py-1 mb-2 border-b-2">
    <NuxtLink :to="localeRoute('/boards')">
      <p class="text-xl md:text-2xl">surf garage</p>
      <p class="text-sm md:text-1.8 font-myriad uppercase">Second Hand Surfboards</p>
    </NuxtLink>
  </header>
  <button class="snipcart-checkout absolute right-1 md:right-2 top-2 md:top-2.5 flex items-center">
    <div v-html="cart" class="w-[2.8rem] h-[2.8rem]"/>
    <div class="snipcart-items-count font-myriad font-bold text-base text-black"/>
  </button>
</template>
<script setup>
import cart from '~/assets/icons/cart.svg?raw'

const localeRoute = useLocaleRoute()
</script>
<style>
.snipcart-checkout svg {
  width: 100%;
  height: 100%;
}
</style>
