<template>
<!--  <pre>{{categories[0].fields}}</pre>-->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 py-1 md:py-4 max-w-screen-container mx-auto">
    <nuxt-link
        v-for="{id, title, description, link, image} in mappedCategories"
        :key="id"
        :to="link"
        class="art-category-grid-item aspect-square text-white relative"
        :style="{ '--cat-bg': `url(${image}?w=500&fm=webp)` }"
    >
      <div class="absolute w-full left-0 bottom-0 p-1 md:p-4">
        <p class="art-category-grid-item__title text-2 md:text-xl font-avenir font-extrabold md:mb-1">{{title}}</p>
        <p v-if="description" class="text-1.8 mobile:hidden leading-10 min-h-[7.5rem]">{{description}}</p>
      </div>
    </nuxt-link>
  </div>
</template>
<script setup>

const props = defineProps({
  categories: Array
})

const { mapCategory } = useCategory()

const mappedCategories = computed(() => props.categories.map(mapCategory))
</script>
<style lang="postcss">
.art-category-grid-item {
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.0),
      rgba(0, 0, 0, 0.0),
      rgba(0, 0, 0, 0.0),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
  ),
  var(--cat-bg);
  background-position: center;
  background-size: cover;

  &:hover {
    .art-category-grid-item__title {
      text-decoration: underline;
    }
  }
}
</style>
