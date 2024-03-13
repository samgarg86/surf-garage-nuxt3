<template>
  <section
    id="surf-art"
    class="section surf-art"
    :style="{ '--surf-art-bg': `url(${backgroundImage.fields.file.url})` }"
  >
    <div class="text-white p-2 pt-20 md:pt-30 pb-5 md:pl-5 max-w-[80rem]">
      <h2 class="font-metalsmith md:text-4xl mb-2">{{ title }}</h2>
      <div class="mb-2 text-1.8 md:text-2">{{ description }}</div>
      <a
        class="button inline-block text-center md:text-left px-2.5 w-full md:w-auto"
        href="https://surfgarage.art"
        target="_blank"
        >{{ ctaText }}
      </a>
    </div>
  </section>
</template>
<script lang="ts" setup>
defineProps({
  title: String,
  description: String,
  backgroundImage: Object,
  ctaText: String
});
</script>
<style lang="postcss">
.surf-art {
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),
    var(--surf-art-bg);
  background-size: contain;
  background-position: top;
}
</style>
