<template>
  <header class="fixed z-10 left-0 top-0 w-full text-center py-[1.6rem] bg-black">
    <NuxtLink :to="localeRoute('/')" class="text-white text-center">
      <svgo-art-logo :fontControlled="false" class="mx-auto w-15 md:w-20"/>
    </NuxtLink>
    <div class="flex absolute right-1 top-2 md:top-1 md:right-2 md:items-start">
      <button class="snipcart-checkout flex items-center ml-1 md:mt-1">
        <SvgoCart class="w-2 h-2 text-white"/>
        <div class="snipcart-items-count text-xs text-white -translate-y-1"/>
      </button>
    </div>
  </header>
</template>
<script setup>
const localeRoute = useLocaleRoute()
</script>
<style>
.header-lang {
  a.router-link-active {
    @apply order-1 no-underline;
  }
}
</style>
