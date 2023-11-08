<template>
    <ul class="text-white">
      <li>
        <NuxtLink
          :to="`${localeRoute('/').fullPath}#storage`"
          @click="$emit('hamburger:click')"
          class="block leading-relaxed hover:underline">
          {{$t('nav.storage')}}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
            :to="`${localeRoute('/').fullPath}#pricing`"
            @click="$emit('hamburger:click')"
            class="block leading-relaxed hover:underline">
          {{$t('nav.pricing')}}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
            :to="`${localeRoute('/').fullPath}#security`"
            @click="$emit('hamburger:click')"
            class="block leading-relaxed hover:underline">
          {{$t('nav.security')}}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="localeRoute('/boards')"
          @click="$emit('hamburger:click')"
          class="mr-1 leading-relaxed hover:underline">
          {{$t('nav.boards')}}
        </NuxtLink>
      </li>
      <li><a href="https://surfgarage.art" class="leading-relaxed hover:underline" target="_blank">Surf Art</a></li>
      <li>
        <NuxtLink
          :to="localeRoute('/about')"
          @click="$emit('hamburger:click')"
          class="leading-relaxed hover:underline">{{$t('nav.about')}}
        </NuxtLink>
      </li>
      <li>
        <scroll-to to="contact" @click="$emit('hamburger:click')"
                   class="block leading-relaxed hover:underline">{{$t('nav.contact')}}</scroll-to></li>
    </ul>
    <ContactLinks/>
</template>

<script setup>
defineProps({
  black: Boolean
})

const localeRoute = useLocaleRoute()

</script>

<style lang="postcss">
.hamburger-menu {
  .contact-links__link {
    @apply text-white hover:text-amberYellow;
  }
}
</style>
