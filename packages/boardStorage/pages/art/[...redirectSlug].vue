<template>Redirect to surfgarage.art</template>
<script setup lang="ts">
const {
  params: { redirectSlug }
} = useRoute();
const pageSlug = redirectSlug?.[0] ? redirectSlug.join('/') : '';
const { locale } = useI18n();
await navigateTo(
  `https://surfgarage.art/${locale.value && locale.value !== 'es' ? locale.value + '/' : ''}${pageSlug}`,
  {
    external: true,
    redirectCode: 301
  }
);
</script>
