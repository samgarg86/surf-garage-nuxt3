<template>
  Redirect to saltylens.art english
  <pre>{{pageSlug}}</pre>
</template>
<script setup lang="ts">
const { params: { enSlug } } = useRoute()
const pageSlug = enSlug?.[0] ? enSlug.join('/') : ''
navigateTo(`https://saltylens.art/${pageSlug}`, {
  external: true,
  redirectCode: 301
})
</script>
