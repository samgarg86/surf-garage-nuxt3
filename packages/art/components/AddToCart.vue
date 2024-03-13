<template>
  <button
    class="snipcart-add-item add-to-cart"
    :class="{
      'bg-grey': !enableCommerce
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
    :disabled="!enableCommerce || ecomDisabled"
    data-item-quantity="1"
  >
    {{ $t('art.add-to-cart') }}
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
  selectedSize: String,
  ecomDisabled: Boolean
});
const {
  public: { enableCommerce }
} = useRuntimeConfig();
</script>
