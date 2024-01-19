<template>
  <header class="fixed z-10 left-0 top-0 w-full text-center py-1.5 bg-black">
    <NuxtLink :to="localeRoute('/')" class="font-avenir font-extrabold text-2 md:text-[2.3rem] text-white">surf garage art co.</NuxtLink>
    <div class="flex absolute right-1 top-2 md:top-1 md:right-2 md:items-start">
      <LazyLanguageSwitcher :showLanguageName="false" @click="toggleLangExpanded" theme="dark" :class="['header-lang', { 'isExpanded': langExpanded } ]"/>
      <button class="snipcart-checkout flex items-center ml-1 md:mt-1">
        <SvgoCart class="w-2 h-2 text-white"/>
        <div class="snipcart-items-count text-xs text-white -translate-y-1"/>
      </button>
    </div>
  </header>
</template>
<script setup>
const localeRoute = useLocaleRoute()
const langExpanded = ref(false)

const toggleLangExpanded = () => {
  langExpanded.value = !langExpanded.value
}
</script>
<style>
.header-lang {
  @apply relative overflow-hidden w-5 h-4.5 text-1.8 mobile:hidden;

  &.isExpanded {
    @apply h-9 rounded-lg;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);

    .language-switcher {
      @apply bg-white;

      a {
        @apply text-black;

        &:hover {
          @apply underline;
        }
      }
    }
  }

  .language-switcher {
    @apply absolute w-full flex-col-reverse gap-0.5;

    a {
      @apply px-1.5 py-1 leading-tight;
    }
  }

  .language-switcher__separator {
    @apply hidden;
  }

  .router-link-active {
    @apply order-1;
  }
}
</style>