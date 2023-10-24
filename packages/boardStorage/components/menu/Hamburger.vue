<template>
  <div :class="{
      'hamburger-menu': true,
      'black-bars': black
    }">
    <client-only>
      <Push left noOverlay :closeOnNavigation="true">
        <ul>
          <li><NuxtLink :to="`${localeRoute('/').fullPath}#storage`" class="block">{{$t('nav.storage')}}</NuxtLink></li>
          <li><NuxtLink :to="`${localeRoute('/').fullPath}#pricing`" class="block">{{$t('nav.pricing')}}</NuxtLink></li>
          <li><NuxtLink :to="`${localeRoute('/').fullPath}#security`" class="block">{{$t('nav.security')}}</NuxtLink></li>
          <li><NuxtLink to="https://surfgarage.art" class="mr-1">Surf Art</NuxtLink></li>
          <li><NuxtLink :to="localeRoute('/boards')" class="mr-1">{{$t('nav.boards')}}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute('/about')" class="mr-1">{{$t('nav.about')}}</NuxtLink></li>
          <li><scroll-to to="contact" class="block">{{$t('nav.contact')}}</scroll-to></li>
        </ul>
        <ContactLinks/>
      </Push>
    </client-only>
  </div>
</template>

<script setup>
import { Push } from 'vue3-burger-menu'

defineProps({
  black: Boolean
})

const route = useRoute()
const { siteNav } = useSiteNav()
const localeRoute = useLocaleRoute()
const { locale } = useI18n()

</script>

<style lang="postcss">
.hamburger-menu {
  .bm-burger-button {
    z-index: 999;
    position: fixed;
    background: url("@core/assets/icons/hamburger.svg") no-repeat;
    outline: 2px solid white;
    outline-offset: 6px;
    border-radius: 2px;

    @apply w-[2.6rem] h-[2.6rem] left-[2.2rem] top-[2.2rem];

    @media screen(lg) {
      @apply left-4 top-4;
    }
  }

  .bm-burger-bars {
    display: none;
  }

  .bm-menu {
    @apply bg-black pt-1;
    line-height: 2;

    ul {
      @apply ml-1;

      a {
        @apply text-white hover:text-amberYellow;
      }
    }

    .bm-item-list {
      margin-left: 0;
      > * {
        display: block;
      }
    }

    .site-logo {
      display: none;
    }
  }

  .contact-links__link {
    @apply text-white hover:text-amberYellow;
  }

  &.black-bars .bm-burger-button {
    background: url("@core/assets/icons/hamburger-black.svg") no-repeat;
    outline-color: black;
  }
}
</style>
