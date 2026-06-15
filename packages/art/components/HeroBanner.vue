<template>
  <div class="art-hero-banner -mt-6 md:-mt-[19rem] -mx-1 md:-mx-2 px-2 py-6 md:py-9 text-center text-white min-h-[60rem] flex flex-col justify-center"
       :style="{
         '--art-hero-bg': `url(${backgroundImage.fields.file.url}?w=2000&fm=webp)`,
         '--art-hero-bg-mobile': bgImageMobile ? `url(${bgImageMobile.fields.file.url}?w=1200&fm=webp)` : `url(${backgroundImage.fields.file.url}?fm=webp)`
       }"
  >
    <div class="max-w-[70rem] mx-auto mt-auto">
      <h1 class="text-[4rem] md:text-[7rem] font-primary font-medium leading-tight tracking-tight">{{ title }}</h1>
      <h2 v-if="description" class="mt-2 leading-relaxed mb-4 text-1.8 md:text-2">{{ description }}</h2>
      <nuxt-link
          :to="localeRoute('/all')"
          class="font-primary text-sm uppercase border-2 px-4 md:px-8 py-1.5 inline-block">
        {{ctaText}}
      </nuxt-link>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  description: String,
  ctaText: String,
  backgroundImage: Object,
  bgImageMobile: Object
})

const localeRoute = useLocaleRoute()
</script>
<style lang="postcss">
.art-hero-banner {
  background-image: var(--art-hero-bg-mobile);
  background-position: center;
  background-size: cover;

  @media (min-width: 768px) {
    background-image: var(--art-hero-bg);
  }
}
</style>
