<template>
  <a :class="linkType" :href="`#${to}`" @click="scrollIntoView">
    <slot></slot>
  </a>
</template>
<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  linkType: {
    type: String,
    required: false
  }
})

const scrollIntoView = (e) => {
  window?.document.getElementById(props.to).scrollIntoView({ behavior: 'smooth' })
  e.preventDefault()
}
</script>
