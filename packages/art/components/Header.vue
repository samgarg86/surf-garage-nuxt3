<template>
  <header class="fixed z-10 left-0 top-0 w-full text-center py-[1.6rem] bg-black">
    <NuxtLink :to="localeRoute('/')" class="text-white text-center">
<svgo-art-logo :fontControlled="false" class="mx-auto w-15 md:w-20"/>
<!--      <div class="font-primary font-extrabold text-xl tracking-[0.1rem]">Surf Garage</div>-->
<!--      <div class="text-sm font-secondary font-medium uppercase tracking-[0.55rem]">Art Collective</div>-->
    </NuxtLink>
    <div class="flex absolute right-1 top-2 md:top-1 md:right-2 md:items-start">
      <LazyLanguageSwitcher
          :showLanguageName="false"
          @click="toggleLangExpanded"
          theme="dark"
          mode="dropdown"
          class="header-lang relative overflow-hidden w-6 h-4.5 text-1.8 mobile:hidden"
          :class="{ 'isExpanded': langExpanded }"/>
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

    .language-switcher__chevron {
      @apply text-black -rotate-180;
    }
  }

  .language-switcher {
    @apply absolute w-full flex-col-reverse gap-0.5;

    a {
      @apply px-1.5 py-1 leading-tight;
    }
  }

  .language-switcher__chevron {
    @apply transition-all;
  }

  a.router-link-active {
    @apply order-1 no-underline;
  }
}
</style>
