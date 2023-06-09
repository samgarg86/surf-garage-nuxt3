<template>
  <div class="mx-2">
    <MenuHamburger black/>
    <main id="page-wrap">
      <ArtHeader/>
      <slot/>
    </main>
    <div hidden
         id="snipcart"
         data-api-key="MjMyM2Q4NjgtZWI4NS00MTFjLThlNTQtOTExNjkwMDE3ZjI2NjM4MjE1NzE4NjM4MjYyMjk0"
         data-config-modal-style="side">
    </div>
  </div>
  <SectionsContact/>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const {snipcartApiKey} = config.public
</script>

<style>
</style>
