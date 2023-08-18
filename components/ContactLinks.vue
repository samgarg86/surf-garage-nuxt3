<template>
  <div :class="['contact-links z-1', onlyIcons ? 'flex m-1' : '']">
    <a
      class="flex items-center mb-0.5"
      :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
      href="https://goo.gl/maps/8qRXWmk34xwfq5Hz7"
      target="_blank"
    >
      <div class="w-4" :class="onlyIcons? 'mr-0.5': 'mr-1'" v-html="map"/>
      <span v-if="!onlyIcons">Calle Castillejos 54, LPA</span>
    </a>
    <a
      class="flex items-center mb-0.5"
      :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
      href="https://wa.me/34600273559?text=Hello%2C%20I%27d%20like%20to%20store%20my%20board%20at%20Surf%20Garage"
      target="_blank"
    >
      <div class="w-4 mr-1" :class="onlyIcons? 'mr-0.5': 'mr-1'" v-html="whatsapp"/>
      <span v-if="!onlyIcons">+34600273559</span>
    </a>
    <a
      class="flex items-center mb-0.5"
      :class="theme !== 'light' ? 'text-white hover:text-amberYellow' : ''"
      href="https://www.instagram.com/surfgaragelpa/"
      target="_blank"
    >
      <div class="w-4 mr-1" :class="onlyIcons? 'mr-0.5': 'mr-1'" v-html="insta"/>
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
import whatsapp from '~/assets/icons/whatsapp.svg?raw'
import insta from '~/assets/icons/insta.svg?raw'
import map from '~/assets/icons/map.svg?raw'
import language from '~/assets/icons/language.svg?raw'
defineProps({
  onlyIcons: Boolean,
  theme: String
})
</script>
