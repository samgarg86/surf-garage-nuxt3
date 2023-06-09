<script setup>
defineProps({
  onlyIcons: {
    type: Boolean,
    required: false,
  },
});
import whatsapp from "~/assets/icons/whatsapp.svg?raw";
import insta from "~/assets/icons/insta.svg?raw";
import map from "~/assets/icons/map.svg?raw";
import language from "~/assets/icons/language.svg?raw";
</script>

<template>
  <div :class="['contact-links', onlyIcons ? 'contact-links--only-icons' : '']">
    <a
      class="contact-links__link contact-links__link--maps"
      href="https://goo.gl/maps/8qRXWmk34xwfq5Hz7"
      target="_blank"
    >
      <div class="contact-links__icon" v-html="map"/>
      <span v-if="!onlyIcons">Calle Castillejos 54, LPA</span>
    </a>
    <a
      class="contact-links__link contact-links__link--whatsapp"
      href="https://wa.me/34600273559?text=Hello%2C%20I%27d%20like%20to%20store%20my%20board%20at%20Surf%20Garage"
      target="_blank"
    >
      <div class="contact-links__icon" v-html="whatsapp"/>
      <span v-if="!onlyIcons">+34600273559</span>
    </a>
    <a
      class="contact-links__link contact-links__link--insta"
      href="https://www.instagram.com/surfgaragelpa/"
      target="_blank"
    >
      <div class="contact-links__icon" v-html="insta"/>
      <span v-if="!onlyIcons">@surfgaragelpa</span>
    </a>

    <div
      v-if="!onlyIcons"
      class="contact-links__link contact-links__link--language"
    >
      <div class="contact-links__icon contact-links__icon--language" v-html="language"/>
      <LanguageSwitcher
        class="contact-links__language-switcher"
        :showLanguageName="true"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.contact-links {
  z-index: 1;
  &__link {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  &--only-icons {
    display: flex;
    margin: 1rem;

    .contact-links__link {
      display: block;
    }
  }

  &__language-switcher {
    margin-left: 1rem;
  }

  &__icon {
    width: 40px;
    height: 40px;
    &--language {
      fill: theme('colors.amberYellow');
    }
  }
}
</style>
