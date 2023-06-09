<template>
  <div :class="{
      'hamburger-menu': true,
      'black-bars': black
    }">
    <client-only>
      <Push :closeOnNavigation="true" left>
        <ul>
          <li>
            <NuxtLink to="/#storage">{{ $t("nav.storage") }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/art">Surf Art</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#pricing">{{ $t("nav.pricing") }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/#contact">{{ $t("nav.contact") }}</NuxtLink>
          </li>
        </ul>
        <ContactLinks class="hamburger-menu__links"/>
      </Push>
    </client-only>
  </div>
</template>

<script setup>
import {Push} from "vue3-burger-menu";

defineProps({
  black: Boolean
})
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
