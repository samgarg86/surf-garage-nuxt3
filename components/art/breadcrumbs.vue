<template>
  <nav>
    <ol class="list-none flex font-avenir text-1.8 font-bold">
      <li><span v-if="!from">&lt;</span> <NuxtLink :to="localePath('/art')" class="pr-1 py-1.5 inline-block underline">Art</NuxtLink></li>
      <li v-if="from" class="py-1.5"> / </li>
      <li v-if="from" >
        <NuxtLink :to="localePath(from.slug)"
                  class="pl-1 pr-2 py-1.5 inline-block underline">
          {{ from.title }}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const { siteNav } = useSiteNav()
const { query } = useRoute()
const from = ref()
const localePath = useLocalePath()

if (query.f && siteNav.value?.surfArtMenu) {
  from.value = siteNav.value?.surfArtMenu?.find(({ slug }) => slug === `/${decodeURIComponent(query.f)}`)
}
</script>
