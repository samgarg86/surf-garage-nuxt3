<template>
  <div>
    <div class="language-switcher py-1">
      <nuxt-link
        :to="switchLocalePath('en')"
        class="mr-1" :class="theme === 'light' ? 'text-black' : 'text-white'"
      >
        {{showLanguageName ? 'English' : 'EN'}}
      </nuxt-link>
      <nuxt-link :class="theme === 'light' ? 'text-black' : 'text-white'"
                 :to="switchLocalePath('es')">{{showLanguageName ? 'Español' : 'ES'}}</nuxt-link>
    </div>
  </div>

</template>

<script setup>
defineProps({
  showLanguageName: Boolean,
  theme: String
})
</script>

<style lang="postcss">
.language-switcher {
  a.router-link-active {
    text-decoration: underline;
    //color: theme('colors.black');
  }
}
</style>
