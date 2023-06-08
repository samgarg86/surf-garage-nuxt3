<template>
  <div>
    <!--    <MenuHamburgerMenu />-->
    <ArtHeader/>
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

<style>
</style>
