<template>
  <button
    class="snipcart-add-item border-2 border-solid px-5 py-1.5 w-full md:w-auto bg-black text-white"
    :data-item-id="id"
    :data-item-price="price"
    :data-item-description="description"
    :data-item-name="title"
    :data-item-image="image"
    data-item-quantity="1"
  >Add to basket</button>
</template>
<script setup>
defineProps({
  id: String,
  price: Number,
  description: String,
  title: String,
  image: String
})
</script>
