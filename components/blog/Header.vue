<template>
  <header class="font-metalsmith text-xl md:text-2xl text-center py-1 mb-2">
<!--    <NuxtLink :to="localeRoute('/')">surf garage</NuxtLink>-->
      <NuxtLink
          class="block text-center"
          :to="localeRoute('/')">
        <img src="/logo.png" class="w-15 mx-auto" alt="Surf Garage - Second Hand Boards" data-not-lazy/>
      </NuxtLink>
  </header>
  <button class="snipcart-checkout absolute right-1 md:right-2 top-2 md:top-2.5 flex items-center">
    <div v-html="cart" class="w-[2.8rem] h-[2.8rem]"/>
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
