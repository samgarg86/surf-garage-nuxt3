<template>
  <div :class="{
      'hamburger-menu': true,
      'black-bars': black
    }">
    <client-only>
      <Push left noOverlay :closeOnNavigation="true">
        <ul>
          <li>
            <div class="py-1">
              <Accordion>
                <AccordionItem v-if="siteNav?.surfArtCategories" class="pl-1" :title="$t('nav.categories')" :is-open="true">
                  <NuxtLink
                      v-for="(cat, index) in siteNav?.surfArtCategories"
                      :key="index"
                      :to="localeRoute(cat.slug)"
                      class="block">
                    - {{ cat[locale] }}
                  </NuxtLink>
                </AccordionItem>
                <AccordionItem v-if="siteNav?.surfArtLocations" class="pl-1" :title="$t('nav.locations')" :is-open="true">
                  <NuxtLink
                      v-for="(item, index) in siteNav?.surfArtLocations"
                      :key="index"
                      :to="localeRoute(item.slug)"
                      class="block">
                    - {{ item[locale] }}
                  </NuxtLink>
                </AccordionItem>
                <AccordionItem v-if="siteNav?.surfArtArtists" class="pl-1" :title="$t('nav.artists')" :is-open="true">
                  <NuxtLink
                      v-for="({name, slug}, index) in siteNav?.surfArtArtists"
                      :key="index"
                      :to="localeRoute(slug)"
                      class="block">
                    - {{ name }}
                  </NuxtLink>
                </AccordionItem>
              </Accordion>
            </div>
          </li>
          <li>
            <NuxtLink to="https://surfgarage.es" class="mr-1">{{ $t("nav.storage") }}</NuxtLink>
          </li>
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
    outline: 1px solid;
    outline-offset: 6px;
    border-radius: 2px;

    @apply w-[2.6rem] h-[2.6rem] top-[1.8rem] left-[1.6rem] md:left-[2.2rem];
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
