<template>
  <header class="font-metalsmith text-center py-2 text-xl">
    <NuxtLink to="/art">surf garage art co.</NuxtLink>
  </header>
  <nav class="justify-center items-center mx-auto hidden grid grid-cols-6 font-avenir text-black">
    <NuxtLink to="/art/prints" class="mr-10 ">PRINTS</NuxtLink>
    <NuxtLink to="/art/paintings" class="">PAINTINGS</NuxtLink>
    <NuxtLink to="/art" class="w-25 mx-auto md:mx-5 block">
      <div v-html="logo" class="max-w-full"/>
    </NuxtLink>
    <NuxtLink to="/art/illustrations" class="mr-10 ">ILLUSTRATIONS</NuxtLink>
    <ScrollTo to="contact" class="">CONTACT</ScrollTo>
  </nav>
  <button class="snipcart-checkout absolute right-2 top-2 flex items-center">
    <div v-html="cart" class="w-2.5 h-2.5 mr-0.5"/>
    <div class="snipcart-items-count font-myriad font-bold text-base text-black"/>
  </button>
</template>
<script setup>
import logo from '~/assets/icons/logo.svg?raw'
import cart from '~/assets/icons/cart.svg?raw'
</script>
<style>
.snipcart-checkout svg {
  width: 100%;
  height: 100%;
}
</style>
