<template>
  <header class="font-metalsmith text-center py-1.5 border-b mb-3">
    <NuxtLink :to="localeRoute('/art')">surf garage art co.</NuxtLink>
  </header>
  <button class="snipcart-checkout absolute right-1 md:right-2 top-1.5 flex items-center">
    <div v-html="cart" class="w-[2.5rem] h-[2.5rem]"/>
    <div class="snipcart-items-count font-myriad text-base text-black"/>
  </button>
</template>
<script setup>
import cart from '@core/assets/icons/cart.svg?raw'

const localeRoute = useLocaleRoute()
</script>
<style>
.snipcart-checkout svg {
  width: 100%;
  height: 100%;
}
</style>
