<template>
  <nav>
    <ol class="list-none flex text-sm">
      <li><span v-if="!from">&lt;</span> <NuxtLink :to="localePath('/')" class="pr-1 py-1.5 inline-block underline text-sm">Home</NuxtLink></li>
      <li v-if="from" class="py-1.5"> / </li>
      <li v-if="from" >
        <NuxtLink :to="localePath(from.slug)"
                  class="pl-1 pr-2 py-1.5 inline-block underline text-sm">
          {{ from[locale] || from.name }}
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
const slugs = [
  ...siteNav.value?.surfArtLocations,
  ...siteNav.value?.surfArtCategories,
  ...siteNav.value?.surfArtArtists
]

if (query.f) {
  from.value = slugs.find(({ slug }) => slug === `/${query.f}`)
}
</script>
