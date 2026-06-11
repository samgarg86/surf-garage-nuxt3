<template>
  <nav class="art-desktop-nav flex gap-6 items-center">
    <template v-if="side === 'left'">
      <ArtNavDropdown :label="$t('nav.categories')" panel-class="art-nav-panel--wide">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <div class="art-nav-col-title">{{ $t('nav.collections-section') }}</div>
            <NuxtLink
                v-for="(cat, index) in siteNav?.surfArtCategories"
                :key="`cat-${index}`"
                :to="localeRoute(cat.slug)"
                class="art-nav-link">
              {{ cat[locale] }}
            </NuxtLink>
          </div>
          <div>
            <div class="art-nav-col-title">{{ $t('nav.artists') }}</div>
            <NuxtLink
                v-for="({ name, slug }, index) in siteNav?.surfArtArtists"
                :key="`artist-${index}`"
                :to="localeRoute(slug)"
                class="art-nav-link">
              {{ name }}
            </NuxtLink>
          </div>
        </div>
      </ArtNavDropdown>

      <ArtNavDropdown :label="$t('nav.locations')">
        <NuxtLink
            v-for="(item, index) in siteNav?.surfArtLocations"
            :key="`loc-${index}`"
            :to="localeRoute(item.slug)"
            class="art-nav-link">
          {{ item[locale] }}
        </NuxtLink>
      </ArtNavDropdown>
    </template>

    <template v-if="side === 'right'">
      <ArtNavDropdown :label="$t('nav.posters')">
        <NuxtLink
            v-for="(item, index) in siteNav?.surfArtPosters"
            :key="`poster-${index}`"
            :to="localeRoute(item.slug)"
            class="art-nav-link">
          {{ item[locale] }}
        </NuxtLink>
      </ArtNavDropdown>

      <ArtNavDropdown :label="$t('nav.about')" panel-align="right">
        <a
            v-for="(item, index) in siteNav?.otherLinks"
            :key="`about-${index}`"
            :href="item.slug"
            :target="item.slug.startsWith('http') ? '_blank' : '_self'"
            class="art-nav-link">
          {{ item[locale] }}
        </a>
      </ArtNavDropdown>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  side: { type: String, required: true, validator: (v) => ['left', 'right'].includes(v) }
})

const { siteNav } = useSiteNav()
const localeRoute = useLocaleRoute()
const { locale } = useI18n()
</script>

<style lang="postcss">
.art-desktop-nav {
  @apply font-primary uppercase text-sm;
}

.art-nav-panel--wide {
  @apply min-w-[44rem];
}

.art-nav-col-title {
  @apply text-lightYellow font-primary text-xxs uppercase pb-0.5 mb-0.5 border-b;
  border-color: rgba(255, 255, 255, 0.1);
  letter-spacing: 0.18em;
}

.art-nav-link {
  @apply block py-[0.4rem] text-sm hover:text-lightYellow normal-case font-secondary;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0;
  transition: color 0.15s ease, transform 0.15s ease;
}
.art-nav-link:hover {
  transform: translateX(2px);
}
</style>
