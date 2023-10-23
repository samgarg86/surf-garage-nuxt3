<template>
  <div :class="['contact-links z-1', onlyIcons ? 'flex m-1' : '']">
    <a
        class="flex items-center mb-0.5"
        :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
        :href="socialMedia.maps"
        target="_blank"
    >
      <div class="w-4" :class="onlyIcons? 'mr-0.5': 'mr-1'" v-html="map"/>
      <span v-if="!onlyIcons">Calle Castillejos 54, LPA</span>
    </a>
    <a
        class="flex items-center mb-0.5"
        :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
        :href="socialMedia.whatsapp"
        target="_blank"
    >
      <div class="w-4" :class="onlyIcons? 'mr-0.5': 'mr-1'" v-html="whatsapp"/>
      <span v-if="!onlyIcons">+34600273559</span>
    </a>
    <a
        class="flex items-center mb-0.5"
        :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
        :href="socialMedia.insta"
        target="_blank"
    >
      <div class="w-4" :class="onlyIcons? '': 'mr-1'" v-html="insta"/>
      <span v-if="!onlyIcons">@surfgaragelpa</span>
    </a>

    <div
        v-if="!onlyIcons"
        class="flex items-center mb-0.5"
    >
      <div class="w-4 mr-1" :class="theme === 'light' ? 'fill-black' : 'fill-amberYellow'" v-html="language"/>
      <LazyLanguageSwitcher :showLanguageName="true" :theme="theme"/>
    </div>
  </div>
</template>

<script setup>
import whatsapp from '@core/assets/icons/whatsapp.svg?raw'
import insta from '@core/assets/icons/insta.svg?raw'
import map from '@core/assets/icons/map.svg?raw'
import language from '@core/assets/icons/language.svg?raw'
defineProps({
  onlyIcons: Boolean,
  theme: String
})
const { public: { socialMedia } } = useRuntimeConfig()
</script>
