<template>
  <nav class="navigation">
    <ul class="text-base justify-center items-center mx-auto md:grid md:grid-cols-5">
      <li class="p-1 hidden md:block text-center">
        <ScrollTo to="storage" class="text-white">{{ $t("nav.storage") }}</ScrollTo>
      </li>
      <li class="p-1 hidden md:block text-center">
        <ScrollTo to="pricing" class="text-white">{{ $t("nav.pricing") }}</ScrollTo>
      </li>
      <li class="site-logo m-1 w-25 mx-auto" v-html="logo">
      </li>
      <li class="p-1 hidden md:block text-center">
        <NuxtLink :to="localeRoute('/art')" class="text-white">Surf Art</NuxtLink>
      </li>
      <li class="p-1 hidden md:block text-center">
        <ScrollTo to="contact" class="text-white">{{ $t("nav.contact") }}</ScrollTo>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import logo from '~/assets/images/logo.svg?raw'
const localeRoute = useLocaleRoute()
</script>

<style lang="postcss">
.navigation {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-family: theme('fontFamily.metalsmith');
  z-index: 3;

  @media screen(md) {
    top: 0;
  }

  ul {
    max-width: 120rem;
  }
}
</style>
