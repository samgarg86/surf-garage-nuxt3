<template>
  <header class="fixed z-10 left-0 top-0 w-full py-[1.6rem]" :class="{ scrolled }">
    <!-- mobile layout -->
    <div class="md:hidden relative text-center">
      <NuxtLink :to="localeRoute('/')" class="text-black text-center">
        <div class="font-primary font-extrabold text-xl tracking-[0.1rem] mx-auto">SALTY LENS</div>
      </NuxtLink>
      <div class="flex absolute right-1 top-0 items-center">
        <button class="snipcart-checkout flex items-center ml-1">
          <SvgoCart class="w-2 h-2 text-black"/>
          <div class="snipcart-items-count text-xs text-black -translate-y-1"/>
        </button>
      </div>
    </div>

    <!-- desktop layout -->
    <div class="hidden md:grid grid-cols-[1fr_1fr_1fr] items-center px-2 relative">
      <ArtDesktopNav side="left" class="justify-self-end"/>
      <NuxtLink :to="localeRoute('/')" class="justify-self-center">
        <img src="/logo.svg" alt="Salty Lens" class="logo h-auto"/>
      </NuxtLink>
      <ArtDesktopNav side="right" class="justify-self-start"/>
      <div class="absolute right-1 top-2 md:top-1 md:right-2 md:items-start">
        <button class="snipcart-checkout flex items-center">
          <SvgoCart class="w-2 h-2 text-white"/>
          <div class="snipcart-items-count text-xs text-white -translate-y-1"/>
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
const localeRoute = useLocaleRoute()
const langExpanded = ref(false)
const scrolled = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const toggleLangExpanded = () => {
  langExpanded.value = !langExpanded.value
}
</script>
<style scoped>
header {
  transition: background-color 0.3s ease, padding 0.3s ease;
}

header.scrolled {
  background-color: rgba(9, 9, 14, 0.8);
  backdrop-filter: blur(8px);
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}

.logo {
  width: 17rem;
  transition: width 0.3s ease;
}

header.scrolled .logo {
  width: 6rem;
}

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
