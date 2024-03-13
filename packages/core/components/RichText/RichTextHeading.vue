<template>
  <component :is="component.tag" class="font-bold" :class="component.class">{{
    text
  }}</component>
</template>

<script setup>
const props = defineProps({
  format: String,
  text: String
});

const component = computed(() => {
  switch (props.format) {
    case 'heading-1':
      return { tag: 'h1', class: 'text-xl md:text-2xl' };
    case 'heading-2':
      return { tag: 'h2', class: 'md:text-xl' };
    case 'heading-3':
      return { tag: 'h3', class: 'text-base' };
    case 'heading-4':
      return { tag: 'h4', class: 'text-2' };
    case 'heading-5':
      return { tag: 'h5', class: 'text-1.8' };
    case 'heading-6':
      return { tag: 'h6', class: 'text-sm' };
    default:
      return { tag: 'p', class: 'text-2' };
  }
});
</script>
