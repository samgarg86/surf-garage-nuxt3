<template>
  <section
    id="security"
    class="section about-security section--bg"
    :style="{ '--bg': `url(${bgImage})` }"
  >
    <div class="section__content">
      <div class="about-security__info about-info">
        <h2 class="about-info__title">{{ title }}</h2>
        <div class="about-info__subtitle">{{ subtitle }}</div>
      </div>
      <div class="about-security__tiles about-tiles">
        <article
          v-for="(icon, index) in icons"
          :key="index"
          class="about-tile"
        >
          <div :class="['about-tile__icon']">
            <img :src="icon.url"/>
          </div>
          <h3 class="about-tile__title">{{ icon.title }}</h3>
        </article>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  icons: [],
  bgImage: String
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
  color: var(--c-white);

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
