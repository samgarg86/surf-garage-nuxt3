<template>
  <div class="pt-4 pb-1 md:flex justify-between items-center">
    <h3 class="font-extrabold text-xl font-primary">{{  title }}</h3>
    <NuxtLink :to="localeRoute(link)">
        <span class="mr-0.5 leading-none text-xs md:text-sm font-medium md:font-bold font-primary">{{ $t('art.viewAll') }}</span>
        <span class="bg-grey-30 rounded-[50%] w-2.5 h-2.5 inline-grid place-content-center">
          <svgo-chevron-down class="-rotate-90 inline-block text-[0.9rem]"/>
        </span>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
defineProps({
  link: String,
  title: String
})
const localeRoute = useLocaleRoute()
</script>
