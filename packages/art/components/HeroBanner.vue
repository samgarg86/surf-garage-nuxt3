<template>
  <div class="art-hero-banner relative -mt-6 md:-mt-[19rem] -mx-1 md:-mx-2 px-2 py-6 md:py-9 text-center text-white min-h-[80rem] md:min-h-0 md:aspect-[16/9] flex flex-col justify-center"
       :style="{
         '--art-hero-bg': `url(${backgroundImage.fields.file.url}?w=2000&fm=webp)`,
         '--art-hero-bg-mobile': bgImageMobile ? `url(${bgImageMobile.fields.file.url}?w=1200&fm=webp)` : `url(${backgroundImage.fields.file.url}?fm=webp)`
       }"
  >
    <div class="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-[27%] lg:bottom-[30%] w-[55%]">
      <FrameWall :columns="columns" gap="1.2cqw"/>
    </div>
    <div class="max-w-[70rem] mx-auto mt-auto">
<!--      <h1 class="text-[4rem] md:text-[7rem] font-primary font-medium leading-tight tracking-tight">{{ title }}</h1>-->
      <h2 v-if="description" class="mt-2 leading-relaxed mb-4 text-1.8 md:text-2">{{ description }}</h2>
      <nuxt-link
          :to="localeRoute('/all')"
          class="font-primary text-sm uppercase border-2 border-sand text-sand md:px-8 py-1.5 inline-block">
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
  framesRight: { type: Array, default: () => [] }
})

const localeRoute = useLocaleRoute()

const toFrame = (a) => ({ src: `${a.fields.file.url}?w=800&fm=webp`, alt: a.fields.title || '' })

const columns = [
  { width: '10cqw', frames: props.framesLeft.slice(2, 4).map(toFrame), paddingBottom: '5cqh' },
  { width: '10cqw', frames: props.framesLeft.slice(0, 2).map(toFrame) },
  { width: '20cqw', frames: [{ html: props.title, aspect: 'aspect-[5/6]' }] },
  { width: '10cqw', frames: props.framesRight.slice(0, 2).map(toFrame) },
  { width: '10cqw', frames: props.framesRight.slice(2, 4).map(toFrame) }
].filter(c => c.frames.length)
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
