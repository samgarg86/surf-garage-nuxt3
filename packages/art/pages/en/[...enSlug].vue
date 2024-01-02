<template>
  Redirect to surfgarage.art english
  <pre>{{pageSlug}}</pre>
</template>
<script setup lang="ts">
const { params: { enSlug } } = useRoute()
const pageSlug = enSlug?.[0] ? enSlug.join('/') : ''
navigateTo(`https://surfgarage.art/${pageSlug}`, {
  external: true,
  redirectCode: 301
})
</script>
