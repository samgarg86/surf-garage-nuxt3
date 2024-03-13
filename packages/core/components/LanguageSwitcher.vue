<template>
  <div>
    <div class="language-switcher flex gap-1">
      <NuxtLink
        :to="switchLocalePath('en')"
        :class="
          theme === 'light' ? 'text-black' : 'text-white hover:text-lightYellow'
        "
      >
        {{ showLanguageName ? 'English' : 'EN' }}
      </NuxtLink>
      <svgo-chevron-down
        v-if="mode === 'dropdown'"
        class="language-switcher__chevron absolute top-1.5 right-0.5 text-[1rem] text-white cursor-pointer"
      />
      <span
        v-if="!showLanguageName && mode === 'links'"
        class="language-switcher__separator"
        :class="theme === 'light' ? 'text-black' : 'text-white'"
        >|</span
      >
      <NuxtLink
        :class="
          theme === 'light' ? 'text-black' : 'text-white hover:text-lightYellow'
        "
        :to="switchLocalePath('es')"
      >
        {{ showLanguageName ? 'Español' : 'ES' }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showLanguageName: Boolean;
  theme: String;
  mode: 'links' | 'dropdown';
}>();
const switchLocalePath = useSwitchLocalePath();
</script>

<style lang="postcss">
.language-switcher {
  .router-link-active {
    text-decoration: underline;
  }
}
</style>
