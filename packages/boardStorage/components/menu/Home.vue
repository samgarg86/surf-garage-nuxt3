<template>
  <nav class="navigation font-metalsmith w-full absolute left-1/2 top-5 md:top-0">
    <ul class="text-base justify-center items-center mx-auto md:grid md:grid-cols-5">
      <li class="p-1 hidden md:block text-center">
        <ScrollTo to="storage" class="text-white">{{ $t("nav.storage") }}</ScrollTo>
      </li>
      <li class="p-1 hidden md:block text-center">
        <ScrollTo to="pricing" class="text-white">{{ $t("nav.pricing") }}</ScrollTo>
      </li>
      <li class="site-logo m-1 w-25 mx-auto">
        <img src="/logo.png" alt="Surf Garage"/>
      </li>
      <li class="p-1 hidden md:block text-center">
        <a href="https://surfgarage.art" class="text-white" target="_blank">Surf Art</a>
      </li>
      <li class="p-1 hidden md:block text-center">
        <ScrollTo to="contact" class="text-white">{{ $t("nav.contact") }}</ScrollTo>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const localeRoute = useLocaleRoute()
</script>

<style lang="postcss">
.navigation {
  transform: translateX(-50%);
  z-index: 3;

  ul {
    max-width: 120rem;
  }
}
</style>
