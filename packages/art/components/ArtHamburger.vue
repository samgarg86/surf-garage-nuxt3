<template>
  <div class="text-white font-avenir">
    <ul>
      <li class="pb-2">
        <Accordion>
          <LazyAccordionItem
              v-if="siteNav?.surfArtCategories"
              title-class="text-lightYellow font-avenir"
              :title="$t('nav.categories')"
              :is-open="true">
            <NuxtLink
                v-for="(cat, index) in siteNav?.surfArtCategories"
                :key="index"
                :to="localeRoute(cat.slug)"
                @click="$emit('hamburger:click')"
                class="art-menu-link">
              {{ cat[locale] }}
            </NuxtLink>
          </LazyAccordionItem>
          <LazyAccordionItem
              v-if="siteNav?.surfArtPosters"
              class="border-t"
              title-class="text-lightYellow font-avenir"
              :title="$t('nav.posters')"
              :is-open="true">
            <NuxtLink
                v-for="(item, index) in siteNav?.surfArtPosters"
                :key="index"
                :to="localeRoute(item.slug)"
                @click="$emit('hamburger:click')"
                class="art-menu-link">
              {{ item[locale] }}
            </NuxtLink>
          </LazyAccordionItem>
          <LazyAccordionItem
              v-if="siteNav?.surfArtLocations"
              class="border-t"
              title-class="text-lightYellow font-avenir"
              :title="$t('nav.locations')"
              :is-open="false">
            <NuxtLink
                v-for="(item, index) in siteNav?.surfArtLocations"
                :key="index"
                :to="localeRoute(item.slug)"
                @click="$emit('hamburger:click')"
                class="art-menu-link">
              {{ item[locale] }}
            </NuxtLink>
          </LazyAccordionItem>
          <LazyAccordionItem
              v-if="siteNav?.surfArtArtists"
              class="border-t"
              title-class="text-lightYellow font-avenir"
              :title="$t('nav.artists')"
              :is-open="false">
            <NuxtLink
                v-for="({name, slug}, index) in siteNav?.surfArtArtists"
                :key="index"
                :to="localeRoute(slug)"
                @click="$emit('hamburger:click')"
                class="art-menu-link">
              {{ name }}
            </NuxtLink>
          </LazyAccordionItem>
        </Accordion>
      </li>
      <li>
        <a href="https://surfgarage.es" target="_blank" class="art-menu-link">{{ $t("nav.storage") }}</a>
      </li>
<!--      <li>-->
<!--        <NuxtLink :to="localeRoute('/about')" class="mr-1" @click="$emit('hamburger:click')">-->
<!--          {{$t('nav.about')}}-->
<!--        </NuxtLink>-->
<!--      </li>-->
    </ul>

  </div>
</template>

<script setup>

const { siteNav } = useSiteNav()
const localeRoute = useLocaleRoute()
const { locale } = useI18n()

</script>

<style lang="postcss">
.art-menu-link {
  @apply block text-1.8 hover:underline;
  line-height: 1.9;
}
</style>
