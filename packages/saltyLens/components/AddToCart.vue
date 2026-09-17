<template>
  <button
    class="add-to-cart"
    :class="{ 'bg-grey': !enableCommerce }"
    :disabled="!enableCommerce || ecomDisabled"
    @click="handleAdd"
  >{{ $t('art.add-to-cart') }}</button>
</template>

<script setup>
const props = defineProps({
  id: String,
  price: Number,
  title: String,
  image: String,
  size: String,
  ecomDisabled: Boolean,
})
const { public: { enableCommerce } } = useRuntimeConfig()
const { addItem } = useCart()

const handleAdd = () => {
  addItem({ id: props.id, title: props.title, price: props.price, size: props.size, image: props.image })
}
</script>
