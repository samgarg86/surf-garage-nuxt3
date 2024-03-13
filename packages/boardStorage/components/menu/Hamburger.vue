<template>
  <ul class="text-white text-2 mb-2">
    <li>
      <NuxtLink
        :to="`${localeRoute('/').fullPath}#storage`"
        @click="$emit('hamburger:click')"
        class="menu-link"
      >
        {{ $t('nav.storage') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :to="`${localeRoute('/').fullPath}#pricing`"
        @click="$emit('hamburger:click')"
        class="menu-link"
      >
        {{ $t('nav.pricing') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :to="`${localeRoute('/').fullPath}#security`"
        @click="$emit('hamburger:click')"
        class="menu-link"
      >
        {{ $t('nav.security') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :to="localeRoute('/boards')"
        @click="$emit('hamburger:click')"
        class="menu-link"
      >
        {{ $t('nav.boards') }}
      </NuxtLink>
    </li>
    <li>
      <a href="https://surfgarage.art" class="menu-link" target="_blank"
        >Surf Art</a
      >
    </li>
    <li>
      <NuxtLink
        :to="localeRoute('/about')"
        @click="$emit('hamburger:click')"
        class="menu-link"
      >
        {{ $t('nav.about') }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink
        :to="localeRoute('/surf-gran-canaria')"
        @click="$emit('hamburger:click')"
        class="menu-link"
      >
        Surf Gran Canaria
      </NuxtLink>
    </li>
    <li>
      <scroll-to
        to="contact"
        @click="$emit('hamburger:click')"
        class="menu-link"
      >
        {{ $t('nav.contact') }}
      </scroll-to>
    </li>
  </ul>
  <ContactLinks />
</template>

<script setup>
defineProps({
  black: Boolean
});

const localeRoute = useLocaleRoute();
</script>

<style lang="postcss">
.menu-link {
  @apply block hover:underline;
  line-height: 2.2;
}
</style>
