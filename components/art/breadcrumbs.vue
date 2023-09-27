<template>
  <nav>
    <ol class="list-none flex font-avenir text-sm font-bold">
      <li><span v-if="!from">&lt;</span> <NuxtLink :to="localePath('/art')" class="pr-1 py-1.5 inline-block underline">Art</NuxtLink></li>
      <li v-if="from" class="py-1.5"> / </li>
      <li v-if="from" >
        <NuxtLink :to="localePath(from.slug)"
                  class="pl-1 pr-2 py-1.5 inline-block underline">
          {{ from[locale] }}
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
const { locale } = useI18n()

if (query.f) {
  const slugs = [
    ...siteNav.value?.surfArtLocations,
    ...siteNav.value?.surfArtCategories,
    ...siteNav.value?.surfArtArtists
  ]
  from.value = slugs.find(({ slug }) => slug === `/${decodeURIComponent(query.f)}`)
}
</script>
