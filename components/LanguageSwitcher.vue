<template>
  <div>
    <div class="language-switcher py-1">
      <NuxtLink
        :to="switchLocalePath('en')"
        class="mr-1"
        :class="theme === 'light' ? 'text-black' : 'text-white hover:text-amberYellow'">
        {{showLanguageName ? 'English' : 'EN'}}
      </NuxtLink>
      <NuxtLink
        :class="theme === 'light' ? 'text-black' : 'text-white hover:text-amberYellow'"
        :to="switchLocalePath('es')">
        {{showLanguageName ? 'Español' : 'ES'}}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showLanguageName: Boolean,
  theme: String
})
const switchLocalePath = useSwitchLocalePath()
</script>

<style lang="postcss">
.language-switcher {
  a.router-link-active {
    text-decoration: underline;
    //color: theme('colors.black');
  }
}
</style>
