<template>
  <nav class="font-metalsmith w-full py-2">
    <ul
      class="text-base items-center justify-center mx-auto md:grid md:grid-cols-5 max-w-screen-md"
    >
      <li class="p-1 hidden md:block text-center">
        <NuxtLink :to="localeRoute('/')" class="">{{
          $t('nav.storage')
        }}</NuxtLink>
      </li>
      <li class="p-1 hidden md:block text-center">
        <NuxtLink :to="`${localeRoute('/').fullPath}#pricing`" class="">{{
          $t('nav.pricing')
        }}</NuxtLink>
      </li>
      <li class="site-logo justify-self-center">
        <NuxtLink :to="localeRoute('/')" class="block w-10 md:w-16 mx-auto">
          <img src="/logo.png" alt="Surf Garage" />
        </NuxtLink>
      </li>
      <li class="p-1 hidden md:block text-center">
        <a href="https://surfgarage.art" target="_blank">Surf Art</a>
      </li>
      <li class="p-1 hidden md:block text-center">
        <ScrollTo to="contact" class="">{{ $t('nav.contact') }}</ScrollTo>
      </li>
    </ul>
  </nav>
</template>
<script setup>
const localeRoute = useLocaleRoute();
</script>
