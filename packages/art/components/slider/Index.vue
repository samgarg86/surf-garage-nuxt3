<template>
  <Splide class="horizontal-slider" 
      :options="{...defaultOptions, ...options}" 
      :has-track="false" 
      @splide:mounted="updateProgress"
      @splide:move="updateProgress">
    <SplideTrack>
      <slot/>
    </SplideTrack>

    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev bg-grey-30 w-2.5 h-2.5 inline-grid place-content-center">
          <svgo-chevron-down class="inline-block text-xs"/>
      </button>
      <button class="splide__arrow splide__arrow--next bg-grey-30 w-2.5 h-2.5 inline-grid place-content-center">
        <svgo-chevron-down class="inline-block text-xs"/>
      </button>
    </div>

    <div class="horizontal-slider__progress">
      <div class="horizontal-slider__progress-bar" ref="progress"></div>
    </div>
  </Splide>

</template>

<script setup lang="ts">
import { Splide, SplideTrack } from '@splidejs/vue-splide'
const defaultOptions = {
  pagination: false,
  arrows: true,
  mediaQuery: 'min',
  drag: true,
  perPage: 1,
  perMove: 1,
  gap: '1rem'
}

defineProps({
  options: Object
})

const progress = ref(null)

const updateProgress = (splide) => {
  const end = splide.Components.Controller.getEnd() + 1
  const rate = Math.min((splide.index + 1) / end, 1)
  progress.value.style.width = end === 0 ? '10%' : String(100 * rate) + '%'
}

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

.horizontal-slider__progress {
  background: #ccc;
  margin-top: 4rem;
}

.horizontal-slider__progress-bar {
  background: #1a1a1a;
  height: 2px;
  transition: width 400ms ease;
  width: 0;
}
</style>
