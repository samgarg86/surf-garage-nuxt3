<template>
  <div class="text-white font-avenir">
    <ul>
      <li class="pb-2">
        <Accordion>
          <AccordionItem
              v-if="siteNav?.surfArtCategories"
              :title="$t('nav.categories')"
              :is-open="true">
            <NuxtLink
                v-for="(cat, index) in siteNav?.surfArtCategories"
                :key="index"
                :to="localeRoute(cat.slug)"
                @click="$emit('hamburger:click')"
                class="block text-white text-1.8 leading-relaxed hover:underline">
              {{ cat[locale] }}
            </NuxtLink>
          </AccordionItem>
          <AccordionItem
              v-if="siteNav?.surfArtLocations"
              class="border-t"
              :title="$t('nav.locations')"
              :is-open="false">
            <NuxtLink
                v-for="(item, index) in siteNav?.surfArtLocations"
                :key="index"
                :to="localeRoute(item.slug)"
                @click="$emit('hamburger:click')"
                class="block text-white text-1.8 leading-relaxed hover:underline">
              {{ item[locale] }}
            </NuxtLink>
          </AccordionItem>
          <AccordionItem
              v-if="siteNav?.surfArtArtists"
              class="border-t"
              :title="$t('nav.artists')"
              :is-open="false">
            <NuxtLink
                v-for="({name, slug}, index) in siteNav?.surfArtArtists"
                :key="index"
                :to="localeRoute(slug)"
                @click="$emit('hamburger:click')"
                class="block text-white text-1.8 leading-relaxed hover:underline">
              {{ name }}
            </NuxtLink>
          </AccordionItem>
        </Accordion>
      </li>
      <li>
        <NuxtLink to="https://surfgarage.es" class="mr-1 text-1.8">{{ $t("nav.storage") }}</NuxtLink>
      </li>
<!--      <li>-->
<!--        <NuxtLink :to="localeRoute('/about')" class="mr-1" @click="$emit('hamburger:click')">-->
<!--          {{$t('nav.about')}}-->
<!--        </NuxtLink>-->
<!--      </li>-->
    </ul>
    <LazyLanguageSwitcher :showLanguageName="true" theme="dark" class="text-1.8"/>
  </div>
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
</style>
