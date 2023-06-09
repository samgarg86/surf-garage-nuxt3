<template>
  <nav class="flex justify-center items-center font-avenir">
    <NuxtLink to="/art/prints" class="mr-10 text-black">PRINTS</NuxtLink>
    <NuxtLink to="/art/paintings" class="text-black">PAINTINGS</NuxtLink>
    <NuxtLink to="/art" class="w-[20rem] mx-5">
      <div v-html="logo"/>
    </NuxtLink>
    <NuxtLink to="/art/illustrations" class="mr-10 text-black">ILLUSTRATIONS</NuxtLink>
    <ScrollTo to="contact" class="text-black">CONTACT</ScrollTo>
    <button class="snipcart-checkout">
      <span class="pr-2 ml-3 snipcart-total-price"/>
    </button>
  </nav>
</template>
<script setup>
import logo from '~/assets/icons/logo.svg?raw'
</script>
