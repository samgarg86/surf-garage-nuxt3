<template>
  <header class="font-metalsmith fixed left-0 top-0 w-full text-center py-1.5 border-b border-grey-20 bg-white">
    <NuxtLink :to="localeRoute('/')">surf garage art co.</NuxtLink>
    <button class="snipcart-checkout absolute right-1 md:right-2 top-1.5 flex items-center">
      <div v-html="cart" class="w-2 h-2"/>
      <div class="snipcart-items-count font-myriad text-1.8 text-black"/>
    </button>
  </header>

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
