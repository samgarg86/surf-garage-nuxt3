<template>
  <MenuHamburger black class="hamburger-menu-art"/>
  <main id="page-wrap" class="mx-1 md:mx-2">
    <ArtHeader/>
    <slot/>
    <Footer/>
  </main>

  <div hidden
       id="snipcart"
       data-api-key="MjMyM2Q4NjgtZWI4NS00MTFjLThlNTQtOTExNjkwMDE3ZjI2NjM4MjE1NzE4NjM4MjYyMjk0"
       data-config-modal-style="side">
  </div>
</template>

<script lang="ts" setup>
// const config = useRuntimeConfig()
// const { snipcartApiKey } = config.public

useHead({
  link: [
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: 'https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css'
    }
  ],
  script: [
    { src: 'https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js' }
  ]
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
@import "~/assets/css/snipcart.css";

</style>
