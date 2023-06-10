<template>
  <MenuHamburger black class="hamburger-menu-art"/>
  <main id="page-wrap" class="mx-2">
    <ArtHeader/>
    <slot/>
  </main>
  <div hidden
       id="snipcart"
       data-api-key="MjMyM2Q4NjgtZWI4NS00MTFjLThlNTQtOTExNjkwMDE3ZjI2NjM4MjE1NzE4NjM4MjYyMjk0"
       data-config-modal-style="side">
  </div>
  <SectionsContact/>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const {snipcartApiKey} = config.public

useHead({
  link: [
    {rel: "preconnect", href: "https://app.snipcart.com"},
    {rel: "preconnect", href: "https://cdn.snipcart.com"},
    {
      rel: "stylesheet",
      href: "https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css",
    },
  ],
  script: [
    {src: "https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"},
  ],
})
</script>

<style lang="postcss">
.hamburger-menu-art {
  .bm-burger-button {
    top: theme('spacing.2');
    left: theme('spacing.2');
  }
}

/* Snipcart theme overrides */
#snipcart {
  /* Tailwind css sets this to transparent so checkout button isn't visible */

  .snipcart-button-primary {
    background-color: theme('colors.waveBlue');
  }

  /* hamburger menu is above the back button on mobile */

  .snipcart-modal__container {
    z-index: 1000;
  }

  /* Images are too small */

  .snipcart-item-line__media--small {
    height: 10rem;
  }

  .snipcart-item-line--cart-edit .snipcart-item-line__image {
    max-width: none;
  }

  .snipcart-cart-summary--edit.snipcart-modal__container {
    @media (min-width: 768px) {
      max-width: 60rem;
      width: 50%;
    }

    @media screen(lg) {
      width: 35%;
    }
  }
}
</style>
