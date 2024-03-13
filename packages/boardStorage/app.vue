<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const i18nHead = useLocaleHead({
  addSeoAttributes: true
});
useHead({
  bodyAttrs: {
    class: 'antialiased font-myriad text-base text-black m-0 w-full min-w-full'
  },
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { 'http-equiv': 'accept-ch', content: 'width' },
    {
      name: 'google-site-verification',
      content: 'zFkorbR5IM4CttFNPeqBdq-iNibbkw_c032veRnXwE4'
    },
    ...(i18nHead.value.meta || [])
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ...(i18nHead.value.link || [])
  ]
});
</script>
<style lang="scss">
#app {
  // Hack to show the margin below the last section
  overflow-y: scroll;
}
</style>
