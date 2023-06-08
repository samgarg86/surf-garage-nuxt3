<script setup>
defineProps({
  onlyIcons: {
    type: Boolean,
    required: false,
  },
});
import whatsapp from "@/assets/icons/whatsapp.svg?component";
import insta from "@/assets/icons/insta.svg?component";
import maps from "@/assets/icons/map.svg?component";
import language from "@/assets/icons/language.svg?component";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
</script>

<template>
  <div :class="['contact-links', onlyIcons ? 'contact-links--only-icons' : '']">
    <a
      class="contact-links__link contact-links__link--maps"
      href="https://goo.gl/maps/8qRXWmk34xwfq5Hz7"
      target="_blank"
    >
      <maps class="contact-links__icon" />
      <span v-if="!onlyIcons">Calle Castillejos 54, LPA</span>
    </a>
    <a
      class="contact-links__link contact-links__link--whatsapp"
      href="https://wa.me/34600273559?text=Hello%2C%20I%27d%20like%20to%20store%20my%20board%20at%20Surf%20Garage"
      target="_blank"
    >
      <whatsapp class="contact-links__icon" />
      <span v-if="!onlyIcons">+34600273559</span>
    </a>
    <a
      class="contact-links__link contact-links__link--insta"
      href="https://www.instagram.com/surfgaragelpa/"
      target="_blank"
    >
      <insta class="contact-links__icon" />
      <span v-if="!onlyIcons">@surfgaragelpa</span>
    </a>

    <div
      v-if="!onlyIcons"
      class="contact-links__link contact-links__link--language"
    >
      <language class="contact-links__icon contact-links__icon--language" />
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
      fill: var(--c-amber-yellow);
    }
  }
}
</style>
