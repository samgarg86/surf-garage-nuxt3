<template>
  <div
    class="art-hero-banner -mx-1 md:-mx-2 px-2 py-6 md:py-9 text-center text-white"
    :style="{
      '--art-hero-bg': `url(${backgroundImage.fields.file.url}?w=1200&fm=webp)`
    }"
  >
    <div class="max-w-[70rem] mx-auto">
      <h1
        class="text-[4rem] md:text-[7rem] font-avenir font-medium leading-tight tracking-tight"
      >
        {{ title }}
      </h1>
      <h2
        v-if="description"
        class="mt-2 leading-relaxed mb-4 text-1.8 md:text-2"
      >
        {{ description }}
      </h2>
      <nuxt-link
        :to="localeRoute('/all')"
        class="font-avenir text-sm uppercase border-2 px-4 md:px-8 py-1.5 inline-block"
      >
        {{ ctaText }}
      </nuxt-link>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  description: String,
  ctaText: String,
  backgroundImage: Object
});

const localeRoute = useLocaleRoute();
</script>
<style lang="postcss">
.art-hero-banner {
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.1)
    ),
    var(--art-hero-bg);
  background-position: center;
  background-size: cover;
}
</style>
