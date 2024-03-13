<template>
  <section id="pricing" class="section pricing">
    <h2 class="pricing__section-title section__title font-metalsmith">
      {{ $t('pricing.title') }}
    </h2>
    <ul class="section__content pricing__content">
      <li
        v-for="(
          { fields: { title, monthlyPrice, priceDescription } }, index
        ) in plans"
        :key="index"
        class="pricing__content-item"
      >
        <h3 class="pricing__title font-metalsmith lowercase">{{ title }}</h3>
        <h4 class="text-2">€{{ monthlyPrice }}/{{ $t('pricing.month') }}</h4>
        <div
          v-if="priceDescription"
          class="text-xs font-avenir font-medium mt-1"
        >
          {{ priceDescription }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  plans: Array
});
</script>

<style lang="postcss">
.pricing {
  background-color: theme('colors.waveBlue');
  text-align: center;

  &__section-title {
    padding-top: 5rem;
    color: #fff;
  }

  &__content.section__content {
    padding-top: 5rem;

    @media screen(md) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 4rem;
      padding-top: 10rem;
      padding-bottom: 10rem;
    }
  }

  &__content-item {
    padding: 2rem;
    text-align: center;
    background-color: #fff;
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    @media screen(md) {
      outline: 1px solid #fff;
      outline-offset: 1rem;
      margin-bottom: 0;
      padding: 5rem;
    }
  }

  &__title {
    margin-bottom: 1rem;
  }

  &__price {
    margin-top: 0.6rem;
    font-size: 1.8rem;
  }
}
</style>
