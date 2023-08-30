<template>
  <nav >
    <div>
      <NuxtLink
        :to="localeRoute(to)"
        class="footer__l1">
        {{ title }}
      </NuxtLink>
    </div>
    <div v-for="{slug, title} in nav"
         :key="slug">
      <NuxtLink
        :to="scroll? `${localeRoute('/').fullPath}${slug}` : localeRoute(slug)"
        class="inline-block text-black text-2 leading-loose">
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
