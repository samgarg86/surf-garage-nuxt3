<template>
  <Splide
    class="horizontal-slider"
    :options="{ ...defaultOptions, ...options }"
    :has-track="false"
  >
    <SplideTrack>
      <slot />
    </SplideTrack>

    <div class="splide__arrows">
      <button
        class="splide__arrow splide__arrow--prev bg-grey-30 w-2.5 h-2.5 inline-grid place-content-center"
      >
        <svgo-chevron-down class="inline-block text-xs" />
      </button>
      <button
        class="splide__arrow splide__arrow--next bg-grey-30 w-2.5 h-2.5 inline-grid place-content-center"
      >
        <svgo-chevron-down class="inline-block text-xs" />
      </button>
    </div>
  </Splide>
</template>

<script setup lang="ts">
import { Splide, SplideTrack } from '@splidejs/vue-splide';
const defaultOptions = {
  pagination: true,
  arrows: true,
  mediaQuery: 'min',
  drag: true,
  perPage: 1,
  gap: '1rem'
};

defineProps({
  options: Object
});
</script>
<style lang="postcss">
.horizontal-slider {
  .splide__slide > div {
    height: 100%;
  }

  .splide__pagination {
    position: relative;
    margin-top: 3rem;
  }

  .splide__arrow.splide__arrow--prev {
    left: 1rem;
    svg {
      @apply rotate-90;
    }
  }

  .splide__arrow.splide__arrow--next {
    right: 1rem;
    svg {
      @apply -rotate-90;
    }
  }
}
</style>
