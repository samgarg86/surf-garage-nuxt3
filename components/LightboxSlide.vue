<template>
  <img :src="image" />
  <button>Add to Cart</button>
</template>

<script setup>
defineProps({
  image: String
})
</script>
