<template>
  <nav >
    <div>
      <NuxtLink
        :to="localeRoute(to)"
        class="mr-1 mb-1.5 px-1 inline-block font-metalsmith lowercase text-black text-xl">
        {{ title }}
      </NuxtLink>
    </div>
    <div v-for="{slug, title} in nav"
         :key="slug">
      <NuxtLink
        :to="scroll? `${localeRoute('/').fullPath}${slug}` : localeRoute(slug)"
        class="inline-block mb-1 px-1 text-black">
        {{ title }}
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
</script>
