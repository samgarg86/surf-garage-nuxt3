<template>
  <div class="art-hero-banner relative -mt-6 md:-mt-[19rem] -mx-1 md:-mx-2 px-2 py-6 md:py-9 text-center text-white aspect-[9/16] md:min-h-0 md:aspect-[16/9] flex flex-col justify-center"
       :style="{
         '--art-hero-bg': `url(${backgroundImage.fields.file.url}?w=2000&fm=webp)`,
         '--art-hero-bg-mobile': bgImageMobile ? `url(${bgImageMobile.fields.file.url}?w=800&fm=webp)` : `url(${backgroundImage.fields.file.url}?fm=webp)`
       }"
  >
    <div class="absolute left-1/2 -translate-x-1/2 top-auto w-[92%] bottom-[35%] md:bottom-[27%] lg:bottom-[29%] md:w-[55%]">
      <FrameWall :framesLeft="framesLeft" :framesRight="framesRight" :framesMobile="framesMobile" :title="title" />
    </div>
    <div class="max-w-[70rem] mx-auto mt-auto mb-9 md:mb-0">
      <h2 v-if="description" class="mt-2 leading-relaxed mb-4 text-1.8 md:text-2">{{ description }}</h2>
      <nuxt-link
          :to="localeRoute('/all')"
          class="font-primary text-sm uppercase border-2 border-sand text-sand px-4 md:px-8 py-1.5 inline-block">
        {{ctaText}}
      </nuxt-link>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  description: String,
  ctaText: String,
  backgroundImage: Object,
  bgImageMobile: Object,
  framesLeft: { type: Array, default: () => [] },
  framesRight: { type: Array, default: () => [] },
  framesMobile: { type: Array, default: () => [] }
})

const localeRoute = useLocaleRoute()
</script>
<style lang="postcss">
.art-hero-banner {
  background-image: var(--art-hero-bg-mobile);
  background-position: bottom center;
  background-size: cover;
  container-type: inline-size;
  container-name: hero;

  @media (min-width: 768px) {
    background-image: var(--art-hero-bg);
  }
}
</style>
