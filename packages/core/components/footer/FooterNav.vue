<template>
  <nav >
    <div class="font-bold mb-1 font-primary">{{ title }}</div>
    <div v-for="item in nav" :key="item.slug">
      <NuxtLink
        :to="scroll? `${localeRoute('/').fullPath}${item.slug}` : localeRoute(item.slug)"
        class="inline-block text-black leading-loose">
        {{ item[locale] || item.name }}
      </NuxtLink>
    </div>
  </nav>
</template>
<script setup>
defineProps({
  title: String,
  to: String,
  scroll: Boolean,
  nav: Object
})

const localeRoute = useLocaleRoute()
const { locale } = useI18n()
</script>
