<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { fullPath } = useRoute()
useHead({
  bodyAttrs: {
    class: 'antialiased font-myriad text-base text-black m-0 w-full min-w-full'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { 'http-equiv': 'accept-ch', content: 'width' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: 'https://surfgarage.es' + fullPath }
  ]
})
</script>
<style lang="scss">
#app {
  // Hack to show the margin below the last section
  overflow-y: scroll;
}
</style>
