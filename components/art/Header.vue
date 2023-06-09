<template>
  <nav class="flex justify-center items-center font-avenir">
    <NuxtLink to="/art/prints" class="mr-10 text-black">PRINTS</NuxtLink>
    <NuxtLink to="/art/paintings" class="text-black">PAINTINGS</NuxtLink>
    <NuxtLink to="/art"><img src="/logo.svg" class="w-[25rem]"/></NuxtLink>
    <NuxtLink to="/art/illustrations" class="mr-10 text-black">ILLUSTRATIONS</NuxtLink>
    <ScrollTo to="contact" class="text-black">CONTACT</ScrollTo>
    <button class="snipcart-checkout">
      <span class="pr-2 ml-3 snipcart-total-price"/>
    </button>
  </nav>
</template>
