<template>
  <component :is="component.component" class="font-bold" :class="component.class">{{text}}</component>
</template>

<script setup>
const props = defineProps({
  format: String,
  text: String
})

const component = computed(() => {
  switch (props.format) {
    case 'heading-1' : return { component: 'h1', class: 'text-xl md:text-2xl' }
    case 'heading-2' : return { component: 'h2', class: 'md:text-xl' }
    case 'heading-3' : return { component: 'h3', class: 'text-2 md:text-base' }
    case 'heading-4' : return { component: 'h4', class: 'text-1.8 md:text-2' }
    case 'heading-5' : return { component: 'h5', class: 'text-sm md:text-1.8' }
    case 'heading-6' : return { component: 'h6', class: 'text-sm' }
    default: return { component: 'p', class: 'text-2' }
  }
})

</script>
