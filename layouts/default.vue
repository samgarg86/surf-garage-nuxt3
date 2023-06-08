<template>
  <div>
<!--    <MenuHamburgerMenu />-->
    <slot />
    <div hidden
         id="snipcart"
         :data-api-key="snipcartApiKey"
         data-config-modal-style="side"
    ></div>
  </div>
</template>

<script lang="ts" setup>
   const config = useRuntimeConfig()
   const {snipcartApiKey} = config.public
</script>

<style lang="postcss">
html.dark {
  color-scheme: light;
  background-color: #fff;
  color: theme('colors.black');
}
</style>
