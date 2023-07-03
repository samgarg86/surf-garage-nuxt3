<template>
  <button
    class="snipcart-add-item border-2 border-solid px-5 py-1.5 w-full md:w-auto bg-black text-white"
    :class="{
    'bg-grey': !enableCommerce,
    }"
    :data-item-id="id"
    :data-item-price="price"
    :data-item-description="description"
    :data-item-name="title"
    :data-item-image="image"
    data-item-custom1-name="Sizes"
    :data-item-custom1-options="sizes"
    :data-item-custom1-value="selectedSize"
    :data-item-url="url"
    :disabled="!enableCommerce"
    data-item-quantity="1"
  >Add to basket
  </button>
</template>
<script setup>
defineProps({
  id: String,
  price: Number,
  description: String,
  title: String,
  image: String,
  url: String,
  sizes: String,
  selectedSize: String
})
const { public: { enableCommerce } } = useRuntimeConfig()
</script>
