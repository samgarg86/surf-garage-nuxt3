<template>
  <header class="fixed z-10 left-0 top-0 w-full py-[1rem]" :class="{ scrolled, 'is-opaque': !isHome }">
    <!-- mobile layout -->
    <div class="md:hidden relative text-center">
      <NuxtLink :to="localeRoute('/')" :class="[isHome ? 'text-black' : 'text-white', 'text-center']">
        <div class="font-primary font-extrabold text-xl tracking-[0.1rem] mx-auto">SALTY LENS</div>
      </NuxtLink>
      <div class="flex absolute right-1 top-0 items-center">
        <button class="snipcart-checkout flex items-center ml-1">
          <SvgoCart :class="['w-2 h-2', isHome ? 'text-black' : 'text-white']"/>
          <div :class="['snipcart-items-count text-xs -translate-y-1', isHome ? 'text-black' : 'text-white']"/>
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
const route = useRoute()
const langExpanded = ref(false)
const scrolled = ref(false)

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
  }
}

.logo {
  width: 17rem;
  transition: width 0.3s ease;
}
</style>
