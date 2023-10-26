<template>
  <div
    class="right-drawer bg-black"
    :style="{
      width: props.drawerVisible ? '100%' : '0',
      maxWidth: '350px',
      height: '100%',
      paddingLeft: props.drawerVisible ? '10px' : '0',
    }"
  >
    <ul class="mt-2">
      <li class="text-white my-1">
        <div class="flex items-start justify-between pr-2">
          <div>
            <NuxtLink :to="localeRoute('/')" class="mr-1">{{
              $t("nav.storage")
            }}</NuxtLink>
            <div v-show="showBoardStorage" v-if="siteNav?.boardStorageMenu">
              <NuxtLink
                v-for="(item, index) in siteNav?.boardStorageMenu"
                :key="index"
                :to="`${localeRoute('/').fullPath}${item.slug}`"
                class="block"
              >
                - {{ item[locale] }}
              </NuxtLink>
            </div>
          </div>
          <button @click="close">X</button>
        </div>
      </li>
      <li class="text-white my-1">
        <NuxtLink :to="localeRoute('/art')" class="mr-1">Surf Art</NuxtLink>
        <div v-show="showSurfArt" class="py-1">
          <UiAccordion>
            <UiAccordionItem
              v-if="siteNav?.surfArtCategories"
              class="pl-1"
              :title="$t('nav.categories')"
              :is-open="true"
            >
              <NuxtLink
                v-for="(cat, index) in siteNav?.surfArtCategories"
                :key="index"
                :to="localeRoute(cat.slug)"
                class="block"
              >
                - {{ cat[locale] }}
              </NuxtLink>
            </UiAccordionItem>
            <UiAccordionItem
              v-if="siteNav?.surfArtLocations"
              class="pl-1"
              :title="$t('nav.locations')"
              :is-open="true"
            >
              <NuxtLink
                v-for="(item, index) in siteNav?.surfArtLocations"
                :key="index"
                :to="localeRoute(item.slug)"
                class="block"
              >
                - {{ item[locale] }}
              </NuxtLink>
            </UiAccordionItem>
            <UiAccordionItem
              v-if="siteNav?.surfArtArtists"
              class="pl-1"
              :title="$t('nav.artists')"
              :is-open="true"
            >
              <NuxtLink
                v-for="({ name, slug }, index) in siteNav?.surfArtArtists"
                :key="index"
                :to="localeRoute(slug)"
                class="block"
              >
                - {{ name }}
              </NuxtLink>
            </UiAccordionItem>
          </UiAccordion>
        </div>
      </li>
      <li class="text-white my-1">
        <NuxtLink :to="localeRoute('/boards')" class="mr-1">{{
          $t("nav.boards")
        }}</NuxtLink>
      </li>
      <li class="text-white my-1">
        <NuxtLink :to="localeRoute('/about')" class="mr-1">{{
          $t("nav.about")
        }}</NuxtLink>
      </li>
    </ul>
    <ContactLinks />
  </div>
</template>

<script setup>
const props = defineProps({
  drawerVisible: Boolean,
  close: Function,
});

const showSurfArt = ref(true);
const showBoardStorage = ref(true);
const route = useRoute();
const { siteNav } = useSiteNav();
const localeRoute = useLocaleRoute();
const { locale } = useI18n();

watch(
  route,
  (newRoute) => {
    if (newRoute.path.includes("/art")) {
      showSurfArt.value = true;
      showBoardStorage.value = false;
    } else {
      showSurfArt.value = false;
      showBoardStorage.value = true;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="postcss">
.right-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 0; /* initially */
  overflow: hidden;
  height: 100vh;
  padding-left: 0; /* initially */
  border-left: 1px solid whitesmoke;
  background: #000;
  z-index: 200;
  transition: all 0.2s; /* for the animation */
}
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
.accordion button {
  background: #000;
}
.accordion {
  margin-right: 10px;
}
</style>
