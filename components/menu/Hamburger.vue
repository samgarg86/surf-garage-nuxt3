<template>
  <div :class="{
      'hamburger-menu': true,
      'black-bars': black
    }">
<!--      <pre>{{siteNav}}</pre>-->
    <client-only>
      <Push left noOverlay :closeOnNavigation="true">
        <ul>
          <li>
            <NuxtLink :to="localeRoute('/')" class="mr-1">{{ $t("nav.storage") }}</NuxtLink>
            <div
              v-show="showBoardStorage"
              v-if="siteNav?.boardStorageMenu">
              <NuxtLink
                v-for="({slug, title}, index) in siteNav?.boardStorageMenu"
                :key="index"
                :to="`${localeRoute('/').fullPath}${slug}`"
                class="block">
                - {{ title }}
              </NuxtLink>
            </div>
          </li>
          <li>
            <NuxtLink :to="localeRoute('/art')" class="mr-1">Surf Art</NuxtLink>
            <div v-show="showSurfArt" class="py-1">
              <UiAccordion>
                <UiAccordionItem v-if="siteNav?.surfArtCategories" class="pl-1" :title="$t('nav.categories')" :is-open="true">
                  <NuxtLink
                      v-for="({slug, title}, index) in siteNav?.surfArtCategories"
                      :key="index"
                      :to="localeRoute(slug)"
                      class="block">
                    - {{ title }}
                  </NuxtLink>
                </UiAccordionItem>
                <UiAccordionItem v-if="siteNav?.surfArtLocations" class="pl-1" :title="$t('nav.locations')" :is-open="true">
                  <NuxtLink
                      v-for="({slug, title}, index) in siteNav?.surfArtLocations"
                      :key="index"
                      :to="localeRoute(slug)"
                      class="block">
                    - {{ title }}
                  </NuxtLink>
                </UiAccordionItem>
              </UiAccordion>
            </div>
          </li>
          <li><NuxtLink :to="localeRoute('/boards')" class="mr-1">{{$t('nav.boards')}}</NuxtLink></li>
          <li><NuxtLink :to="localeRoute('/about')" class="mr-1">{{$t('nav.about')}}</NuxtLink></li>
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

const showSurfArt = ref(true)
const showBoardStorage = ref(true)
const route = useRoute()
const { siteNav, forceFetch } = useSiteNav()
// No need to call fetchSiteNav because Footer does it already
const localeRoute = useLocaleRoute()
const i18n = useI18n()

watch(route, newRoute => {
  if (newRoute.path.includes('/art')) {
    showSurfArt.value = true
    showBoardStorage.value = false
  } else {
    showSurfArt.value = false
    showBoardStorage.value = true
  }
}, { deep: true, immediate: true })

watch(i18n.locale, (newLocale) => forceFetch(newLocale), { deep: true })

</script>

<style lang="postcss">
.hamburger-menu {
  .bm-burger-button {
    z-index: 999;
    position: fixed;
    background: url("@/assets/icons/hamburger.svg") no-repeat;
    outline: 2px solid white;
    outline-offset: 6px;
    border-radius: 2px;

    @apply w-[3.2rem] h-[3.2rem] left-[2.2rem] top-[2.2rem];

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
    background: url("@/assets/icons/hamburger-black.svg") no-repeat;
    outline-color: black;
  }
}
</style>
