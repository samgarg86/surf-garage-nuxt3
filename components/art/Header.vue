<template>
  <header class="font-metalsmith text-center py-1.5 md:py-2 text-xl border-b-2 mb-3">
    <NuxtLink :to="localeRoute('/art')">surf garage art co.</NuxtLink>
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
