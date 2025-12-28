<template>
  <section
    id="security"
    class="section about-security section--bg"
    :style="{ '--bg': `url(${backgroundImage?.fields.file.url})` }"
  >
    <div class="section__content">
      <div class="about-security__info about-info">
        <h2 class="about-info__title font-metalsmith">{{ title }}</h2>
        <div class="about-info__subtitle">{{ subtitle }}</div>
      </div>
      <div class="about-security__tiles about-tiles">
        <article
            v-for="({fields: {file, title}}, index) in icons"
          :key="index"
          class="text-center w-16"
        >
          <div class="h-15 bg-white" :style="{
           'mask': `url('${file.url}') no-repeat center / contain`,
            '-webkit-mask': `url('${file.url}') no-repeat center / contain`
          }"/>
          <h3 class="about-tile__title font-metalsmith">{{ title }}</h3>
        </article>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  icons: Array,
  backgroundImage: Object
})
</script>
<style lang="postcss">
.about-security {
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4)
  ), var(--bg);
  background-attachment: fixed;
  background-size: cover;

  position: relative;
  color: theme('colors.white');

  &__info {
    grid-template-columns: 4fr 1fr;
  }

  @media screen(md) {
    .about-info__title {
      order: 2;
      text-align: right;
    }
    .about-info__subtitle {
      order: 1;
    }
  }
}
</style>
