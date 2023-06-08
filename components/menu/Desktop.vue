<template>
  <nav class="navigation">
    <ul>
      <li>
        <ScrollTo to="storage">{{ $t("nav.storage") }}</ScrollTo>
      </li>
      <li>
        <ScrollTo to="security">{{ $t("nav.security") }}</ScrollTo>
      </li>
      <li class="site-logo">
        <Logo class="site-logo__svg" />
      </li>
      <li>
        <ScrollTo to="pricing">{{ $t("nav.pricing") }}</ScrollTo>
      </li>
      <li>
        <ScrollTo to="contact">{{ $t("nav.contact") }}</ScrollTo>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import Logo from "~/assets/images/logo.svg?component";
</script>

<style lang="postcss">
.navigation {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-family: theme('fontFamily.metalsmith');
  z-index: 3;

  @media screen(md) {
    top: 0;
  }

  ul {
    list-style: none;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    max-width: 120rem;
    margin: 0 auto;

    @media screen(md) {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }

    li {
      padding: 1rem;
      display: none;
      text-align: center;

      &.site-logo {
        display: block;
      }

      @media screen(md) {
        display: block;
      }
    }

    a {
      color: #fff;
    }
  }
}

.site-logo {
  padding: 0 30px;

  &__svg {
    width: 250px;
    /*height: 220px;*/
  }
}
</style>
