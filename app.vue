<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
useHead({
  bodyAttrs: {
    class: 'antialiased font-myriad text-base text-black m-0 w-full min-w-full'
  },
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {'http-equiv': 'accept-ch', 'content': 'width'}
  ],
  link: [
    {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
  ]
})

useSeoMeta({
  title: 'Surf Garage Guardatablas LPA',
  description: 'Surf Garage - Un Club Premio Para Surfistas. Board Storage, GuardaTablas, Second Hand Boards, Surf Art, Surf Board Repairs',
  ogTitle: 'Surf Garage Guardatablas LPA',
  ogDescription: 'Surf Garage - A Premium Club for Surfers',
  ogImage: 'https://surfgarage.es/logo.png',
  keywords: 'guardatablas, tablas de surf, tablas segunda mano, board storage, surfboard storage, second hand surfboards, surfboards, surfboard repairs, surf art'
})
</script>
<style lang="scss">
#app {
  // Hack to show the margin below the last section
  overflow-y: scroll;
}
</style>
