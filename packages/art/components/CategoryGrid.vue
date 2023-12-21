<template>
<!--  <pre>{{categories[0].fields}}</pre>-->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 py-1 md:py-4 max-w-screen-lg mx-auto">
    <nuxt-link
        v-for="{id, title, description, link, image} in mappedCategories"
        :key="id"
        :to="link"
        class="art-category-grid-item aspect-square px-2 md:px-8 text-center text-white grid content-center md:grid-rows-2"
        :style="{ '--cat-bg': `url(${image}?w=600&fm=webp)` }"
    >
      <p class="md:text-2xl font-avenir font-bold mb-1 self-end">{{title}}</p>
      <p v-if="description" class="text-1.8 mobile:hidden">{{description}}</p>
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
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.2)
  ),
  var(--cat-bg);
  background-position: center;
  background-size: cover;
}
</style>
