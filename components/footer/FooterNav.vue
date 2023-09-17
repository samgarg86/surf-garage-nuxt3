<template>
  <nav >
    <div>
      <NuxtLink
        :to="localeRoute(to)"
        class="footer__l1">
        {{ title }}
      </NuxtLink>
    </div>
    <div v-for="item in nav"
         :key="item.slug">
      <NuxtLink
        :to="scroll? `${localeRoute('/').fullPath}${item.slug}` : localeRoute(item.slug)"
        class="inline-block text-black text-2 leading-loose">
        {{ item[locale] }}
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
const i18n = useI18n()
const locale = ref(i18n.locale)
watch(i18n.locale, (newLocale) => { locale.value = newLocale == 'en' ? 'en' : 'es' }, { deep: true, immediate: true })
</script>
