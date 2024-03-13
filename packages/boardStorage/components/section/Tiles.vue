<template>
  <section
    id="tiles"
    class="section tiles"
    :class="Math.abs(tiles.length % 2) === 1 && 'tiles--odd'"
  >
    <div class="tiles__content">
      <template v-for="(tile, index) in tiles" :key="index">
        <ScrollTo
          v-if="tile.type === 'Scroll To'"
          class="tile"
          :to="tile.link"
          :style="{ '--bg': `url(${tile.bg})` }"
        >
          <h2 class="tile__title font-metalsmith">
            {{ tile.text }}
          </h2>
        </ScrollTo>
        <NuxtLink
          v-else
          class="tile font-metalsmith"
          :style="{ '--bg': `url(${tile.bg})` }"
          :to="tile.link.startsWith('/') ? localeRoute(tile.link) : tile.link"
          target="_blank"
        >
          <h2 class="tile__title">
            {{ tile.text }}
          </h2>
        </NuxtLink>
      </template>
    </div>
  </section>
</template>

<script setup>
defineProps({
  tiles: Array
});
const localeRoute = useLocaleRoute();
</script>

<style lang="postcss">
.tiles {
  @media screen(md) {
    height: calc(30vh - 2 * theme('spacing[2.5]'));
  }

  &__content {
    padding: 0;
    z-index: 1;
    height: 100%;
    display: grid;
    grid-column-gap: theme('spacing.1');
    grid-row-gap: theme('spacing.1');
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);

    @media screen(md) {
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: theme('spacing[2.5]');
      grid-row-gap: theme('spacing[2.5]');
    }
  }

  &--odd {
    @media (max-width: theme('screens.md')) {
      .tile:last-child {
        grid-column: 1/3;
      }
    }
  }
}

.tile {
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 5rem 1rem;
  line-height: 1.5;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    var(--bg);
  background-size: cover;

  &__title {
    color: #fff;
    text-align: center;
    z-index: 999;
    width: 100%;
    font-size: theme('fontSize.base');
  }

  &__desc {
    height: 85px;
    padding: 20px 30px;
    text-align: center;
    background-color: #fff;
    color: theme('colors.boardRed');
    display: flex;
    justify-content: center;
  }
}
</style>
