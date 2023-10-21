<template>
  <section id="storage" class="section about-storage">
    <div class="section__content">
      <div class="about-storage__info about-info">
        <h2 class="about-info__title font-metalsmith">{{ title }}</h2>
        <div class="about-info__subtitle">{{ subtitle }}</div>
      </div>
      <div class="about-storage__tiles about-tiles">
        <article
          v-for="(icon, index) in icons"
          :key="index"
          class="text-center w-16"
        >
          <div class="h-16 bg-white" :style="{
           'mask': `url('${icon.url}') no-repeat center / contain`,
            '-webkit-mask': `url('${icon.url}') no-repeat center / contain`
          }"/>
          <h3 class="about-tile__title font-metalsmith">{{ icon.title }}</h3>
        </article>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  icons: Array
})
</script>
<style lang="postcss">
.about-info {
  grid-column-gap: 2rem;
  margin-bottom: 3rem;
  margin-top: 3rem;

  @media screen(md) {
    display: grid;
    margin-top: 0;
  }

  &__title {
    font-size: 4rem;
    font-weight: normal;
    line-height: 1.5;
    text-align: center;
    margin-bottom: 2rem;

    @media screen(md) {
      font-size: 5rem;
      text-align: left;
    }
  }

  &__subtitle {
    font-size: 2rem;
    line-height: 1.4;
    padding-top: 1rem;
    text-align: justify;
  }
}

.about-tiles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
  justify-items: center;
  justify-content: center;
  align-items: start;

  @media screen(md) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-column-gap: 2rem;
  }
}

.about-tile {
  width: 16rem;

  &__title {
    text-transform: lowercase;
    text-align: center;
  }

  &__icon {
    text-align: center;

    @media screen(md) {
      margin-bottom: 1rem;
    }

    svg {
      width: 12rem;
      height: 12rem;
      color: theme('colors.white');
      fill: theme('colors.white');
      margin: 0 auto;
    }

    &--surfer {
      width: 9rem;
      height: 9rem;
      padding: 1.5rem;
      border: 3.5px solid theme('colors.white');
      border-radius: 50%;
      margin: 1.2rem auto 3rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.about-storage {
  background: url("assets/images/surf-pattern.svg") repeat,
  theme('colors.amberYellow');
  background-size: 200px;
  background-attachment: fixed;
  color: theme('colors.white');

  &__info {
    grid-template-columns: 1fr 3fr;
  }
}
</style>
