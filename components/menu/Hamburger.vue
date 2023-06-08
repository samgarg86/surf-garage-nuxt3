<script setup>
// import { Push } from "vue3-burger-menu";
import ScrollTo from "@/components/ScrollTo.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import ContactLinks from "@/components/ContactLinks.vue";
</script>

<template>
  <div class="hamburger-menu">
    <div :closeOnNavigation="true" left>
      <ul>
        <li>
          <ScrollTo to="about">{{ $t("nav.about") }}</ScrollTo>
        </li>
        <li>
          <ScrollTo to="tiles">{{ $t("nav.services") }}</ScrollTo>
        </li>
        <li>
          <ScrollTo to="storage">{{ $t("nav.storage") }}</ScrollTo>
        </li>
        <li>
          <ScrollTo to="security">{{ $t("nav.security") }}</ScrollTo>
        </li>
        <li>
          <ScrollTo to="pricing">{{ $t("nav.pricing") }}</ScrollTo>
        </li>
        <li>
          <ScrollTo to="contact">{{ $t("nav.contact") }}</ScrollTo>
        </li>
      </ul>
      <ContactLinks class="hamburger-menu__links"/>
    </div>
  </div>
</template>

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
    background-color: var(--c-black);
    line-height: 2;
    padding-top: 1rem;

    ul {
      margin-left: 1rem;
      a {
        color: var(--c-white);

        &:hover {
          color: var(--c-amber-yellow);
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
    color: var(--c-white);
    &:hover {
      color: var(--c-amber-yellow);
    }
  }
}
</style>
