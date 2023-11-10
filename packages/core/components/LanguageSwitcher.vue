<template>
  <div>
    <div class="language-switcher flex gap-1">
      <NuxtLink
        :to="switchLocalePath('en')"
        :class="theme === 'light' ? 'text-black' : 'text-white hover:text-lightYellow'">
        {{showLanguageName ? 'English' : 'EN'}}
      </NuxtLink>
      <span v-if="!showLanguageName" :class="theme === 'light' ? 'text-black' : 'text-white'">|</span>
      <NuxtLink
        :class="theme === 'light' ? 'text-black' : 'text-white hover:text-lightYellow'"
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
  }
}
</style>
