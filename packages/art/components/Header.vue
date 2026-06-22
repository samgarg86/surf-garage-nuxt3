<template>
  <header class="fixed z-10 left-0 top-0 w-full py-[0.5rem] md:py-1" :class="{ scrolled, 'is-opaque': !isHome }">
    <!-- mobile layout -->
    <div class="md:hidden grid grid-cols-3 items-center px-1">
      <HamburgerIcon inline invert class="justify-self-start" @click="onHamburgerOpen"/>
      <NuxtLink :to="localeRoute('/')" class="justify-self-center">
        <img src="/logo.svg" alt="Salty Lens" class="logo-mobile h-auto mx-auto"/>
      </NuxtLink>
      <button class="snipcart-checkout justify-self-end mobile-icon flex items-center">
        <SvgoCart class="w-2 h-2"/>
        <div class="snipcart-items-count text-xs -translate-y-1"/>
      </button>
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
const route = useRoute()
const scrolled = ref(false)

const { onHamburgerOpen } = useHamburgerMenu()

const homePath = computed(() => {
  const r = localeRoute('/')
  const p = typeof r === 'string' ? r : r?.path
  return p || '/'
})
const isHome = computed(() => route.path === homePath.value)

const onScroll = () => { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
<style scoped lang="postcss">
header {
  transition: background-color 0.3s ease, padding 0.3s ease;

  &.scrolled {
    background-color: rgba(9, 9, 14, 0.8);
    backdrop-filter: blur(8px);
  }
  &.is-opaque {
    background-color: theme('colors.black');
  }

  &.scrolled,&.is-opaque {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    .logo {
      width: 8rem;
    }
    .logo-mobile {
      width: 5rem;
    }
  }
}

.logo {
  width: 17rem;
  transition: width 0.3s ease;
}

.logo-mobile {
  width: 9rem;
  transition: width 0.3s ease;
}

:deep(.hamburger-icon .menu-bar) {
  background-color: #e5d6bf;
}

.mobile-icon {
  color: #e5d6bf;
}
</style>
