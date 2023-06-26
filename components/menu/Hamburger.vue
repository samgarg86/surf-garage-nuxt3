<template>
  <!--  <pre>{{boardStorageMenu}}</pre>-->
  <!--  <pre>{{surfArtMenu}}</pre>-->
  <div :class="{
      'hamburger-menu': true,
      'black-bars': showSurfArt
    }">
    <client-only>
      <Push :closeOnNavigation="true" left>
        <ul>
          <li>
            <NuxtLink to="/" class="mr-1">{{ $t("nav.storage") }}</NuxtLink>
            <div
              v-show="showBoardStorage"
              v-if="boardStorageMenu">
              <NuxtLink
                v-for="([key, value]) in Object.entries(boardStorageMenu)"
                :key="key"
                :to="key"
                class="block">
                - {{ value }}
              </NuxtLink>
            </div>
          </li>
          <li>
            <NuxtLink to="/art" class="mr-1">Surf Art</NuxtLink>
            <div
              v-show="showSurfArt"
              v-if="surfArtMenu"
            >
              <NuxtLink
                v-for="([key, value]) in Object.entries(surfArtMenu)"
                :key="key"
                :to="key"
                class="block">
                - {{ value }}
              </NuxtLink>
            </div>
          </li>
        </ul>
        <ContactLinks class="hamburger-menu__links"/>
      </Push>
    </client-only>
  </div>
</template>

<script setup>
import { Push } from 'vue3-burger-menu'

const showSurfArt = ref(true)
const showBoardStorage = ref(true)
const route = useRoute()

watch(route, newRoute => {
  if (newRoute.path.includes('art')) {
    showSurfArt.value = true
    showBoardStorage.value = false
  } else {
    showSurfArt.value = false
    showBoardStorage.value = true
  }
}, { deep: true, immediate: true })

const { getFirstEntryOfType } = useContentful()

const { fields: { boardStorageMenu, surfArtMenu } } = await getFirstEntryOfType('hamburgerMenu')

</script>

<style lang="postcss">
.hamburger-menu {
  .bm-burger-button {
    z-index: 999;
    position: fixed;
    background: url("@/assets/icons/hamburger.svg") no-repeat;

    @media (max-width: theme('screens.md')) {
      width: 40px;
      height: 40px;
      left: 20px;
      top: 20px;
    }
  }

  .bm-burger-bars {
    display: none;
    background-color: white;
  }

  .bm-menu {
    background-color: theme('colors.black');
    line-height: 2;
    padding-top: 1rem;

    ul {
      margin-left: 1rem;

      a {
        color: theme('colors.white');

        &:hover {
          color: theme('colors.amberYellow');
        }
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
    color: theme('colors.white');

    &:hover {
      color: theme('colors.amberYellow');
    }
  }

  &.black-bars {
    .bm-burger-bars {
      display: block;
      background-color: theme('colors.black');
    }
  }
}
</style>
