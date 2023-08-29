<template>
<!--  <NuxtLink-->
<!--      class="block text-center m-2"-->
<!--      :to="localeRoute('/boards')">-->
<!--    <img src="/logo.png" class="w-15 mx-auto" alt="Surf Garage - Second Hand Boards" data-not-lazy/>-->
<!--  </NuxtLink>-->

  <header class="font-metalsmith text-center pt-[1.6rem] pb-3 text-xl">
    <NuxtLink :to="localeRoute('/art')">surf garage surfboards co.</NuxtLink>
  </header>
  <button class="snipcart-checkout absolute right-2 top-2 flex items-center">
    <div v-html="cart" class="w-2.5 h-2.5 mr-0.5"/>
    <div class="snipcart-items-count font-myriad font-bold text-base text-black"/>
  </button>
</template>
<script setup>
import cart from '~/assets/icons/cart.svg?raw'
import Header from '~/components/art/Header.vue'

const localeRoute = useLocaleRoute()
</script>
<style>
.snipcart-checkout svg {
  width: 100%;
  height: 100%;
}
</style>
