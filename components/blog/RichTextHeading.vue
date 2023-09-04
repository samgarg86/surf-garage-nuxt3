<template>
  <p class="font-avenir font-bold" :class="fontClass">{{text}}</p>
</template>

<script setup>
const props = defineProps({
  format: String,
  text: String
})

const fontClass = computed(() => {
  switch (props.format) {
    case 'heading-1': return 'text-3xl'
    case 'heading-2' : return 'text-2xl'
    case 'heading-3' : return 'text-xl'
    case 'heading-4' : return 'text-base'
    case 'heading-5' : return 'text-2'
    case 'heading-6' : return 'text-1.8'
    default: ''
  }
})


</script>
