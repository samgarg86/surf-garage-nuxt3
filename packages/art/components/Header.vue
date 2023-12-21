<template>
  <header class="fixed z-10 left-0 top-0 w-full text-center py-1.5 bg-black">
    <NuxtLink :to="localeRoute('/')" class="font-avenir font-extrabold md:text-[2.3rem] text-white">surf garage art co.</NuxtLink>
    <button class="snipcart-checkout absolute right-1 md:right-2 top-1.5 flex items-center">
      <SvgoCart class="w-2 h-2 text-white"/>
      <div class="snipcart-items-count text-1.8 text-black"/>
    </button>
  </header>
</template>
<script setup>
const localeRoute = useLocaleRoute()
</script>
