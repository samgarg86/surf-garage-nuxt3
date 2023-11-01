<template>
  <ul>
    <li>
      <Accordion class="py-1">
          <AccordionItem v-if="siteNav?.surfArtCategories" :title="$t('nav.categories')" :is-open="true">
            <NuxtLink
                v-for="(cat, index) in siteNav?.surfArtCategories"
                :key="index"
                :to="localeRoute(cat.slug)"
                @click="$emit('hamburger:click')"
                class="block text-white font-avenir text-1.8 leading-relaxed hover:underline">
              {{ cat[locale] }}
            </NuxtLink>
          </AccordionItem>
          <AccordionItem v-if="siteNav?.surfArtLocations" :title="$t('nav.locations')" :is-open="false">
            <NuxtLink
                v-for="(item, index) in siteNav?.surfArtLocations"
                :key="index"
                :to="localeRoute(item.slug)"
                @click="$emit('hamburger:click')"
                class="block text-white font-avenir text-1.8 leading-relaxed hover:underline">
              {{ item[locale] }}
            </NuxtLink>
          </AccordionItem>
          <AccordionItem v-if="siteNav?.surfArtArtists" :title="$t('nav.artists')" :is-open="false">
            <NuxtLink
                v-for="({name, slug}, index) in siteNav?.surfArtArtists"
                :key="index"
                :to="localeRoute(slug)"
                @click="$emit('hamburger:click')"
                class="block text-white font-avenir text-1.8 leading-relaxed hover:underline">
              {{ name }}
            </NuxtLink>
          </AccordionItem>
        </Accordion>
    </li>
    <li>
      <NuxtLink to="https://surfgarage.es" class="mr-1">{{ $t("nav.storage") }}</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localeRoute('/about')" class="mr-1" @click="$emit('hamburger:click')">
        {{$t('nav.about')}}
      </NuxtLink>
    </li>
  </ul>
  <ContactLinks/>
</template>

<script setup>

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
