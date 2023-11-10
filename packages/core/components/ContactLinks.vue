<template>
  <div :class="['contact-links z-1', onlyIcons ? 'flex m-1' : '']">
    <a
        class="flex items-center mb-1"
        :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
        :href="socialMedia.maps"
        target="_blank"
    >
        <SvgoMap filled class="text-2xl" :class="onlyIcons? 'mr-0.5': 'mr-1'"/>
      <span v-if="!onlyIcons">Calle Castillejos 54, LPA</span>
    </a>
    <a
        class="flex items-center mb-1"
        :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
        :href="socialMedia.whatsapp"
        target="_blank"
    >

      <SvgoWhatsapp filled class="text-2xl" :class="onlyIcons? 'mr-0.5': 'mr-1'"/>
      <span v-if="!onlyIcons">+34600273559</span>
    </a>
    <a
        class="flex items-center mb-1"
        :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
        :href="socialMedia.insta"
        target="_blank"
    >
      <SvgoInsta filled class="text-2xl" :class="{'mr-1': !onlyIcons}"/>
      <span v-if="!onlyIcons">@surfgaragelpa</span>
    </a>

    <div
        v-if="!onlyIcons"
        class="flex items-center"
    >
      <SvgoLanguage class="text-xl mr-1" :class="{
        'text-black': theme === 'light',
        'text-amberYellow': theme !== 'light'
      }"/>
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
