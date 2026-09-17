<template>
  <Teleport to="body">
    <Transition name="cart">
      <div v-if="isOpen" class="cart-overlay" @click.self="isOpen = false">
        <div class="cart-drawer">
          <div class="cart-header">
            <span class="font-primary text-2xl">{{ $t('art.cart.title') }}</span>
            <button class="close-btn" @click="isOpen = false">✕</button>
          </div>

          <div v-if="cart.length === 0" class="cart-empty">
            {{ $t('art.cart.empty') }}
          </div>

          <ul v-else class="cart-items">
            <li v-for="item in cart" :key="`${item.id}-${item.size}`" class="cart-item">
              <img :src="item.image" :alt="item.title" class="cart-item-img" />
              <div class="cart-item-info">
                <p class="font-primary text-base leading-tight mb-0.5">{{ item.title }}</p>
                <p class="text-sm text-grey-20 mb-0.5">{{ item.size }} cm</p>
                <p class="text-sm mb-1">€{{ (item.price * item.quantity).toFixed(0) }}</p>
                <div class="qty-row">
                  <button class="qty-btn" @click="updateQty(item.id, item.size, item.quantity - 1)">−</button>
                  <span class="text-sm px-1">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="updateQty(item.id, item.size, item.quantity + 1)">+</button>
                  <button class="remove-btn" @click="removeItem(item.id, item.size)">{{ $t('art.cart.remove') }}</button>
                </div>
              </div>
            </li>
          </ul>

          <div v-if="cart.length > 0" class="cart-footer">
            <div class="total-row">
              <span class="font-primary text-2xl">{{ $t('art.cart.total') }}</span>
              <span class="font-primary text-2xl">€{{ total.toFixed(0) }}</span>
            </div>
            <p v-if="total < freeShippingThreshold" class="text-xs text-grey-100 mb-1">
              {{ $t('art.cart.freeShippingHint', { amount: (freeShippingThreshold - total).toFixed(0) }) }}
            </p>
            <p v-else class="text-xs text-grey-100 mb-1">{{ $t('art.cart.freeShippingApplied') }}</p>
            <button class="add-to-cart" :disabled="loading" @click="checkout">
              {{ loading ? $t('art.cart.processing') : $t('art.cart.checkout') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { cart, isOpen, total, removeItem, updateQty, hydrate } = useCart()
const { public: { freeShippingThreshold } } = useRuntimeConfig()
const loading = ref(false)

onMounted(hydrate)

const checkout = async () => {
  loading.value = true
  try {
    const { url } = await $fetch('/api/checkout', {
      method: 'POST',
      body: { items: cart.value },
    })
    if (url) window.location.href = url
  } catch {
    loading.value = false
  }
}
</script>

<style scoped lang="postcss">
.cart-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.cart-drawer {
  background-color: theme('colors.black');
  color: theme('colors.white');
  width: 100%;
  max-width: 42rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: none;
  border: none;
  color: theme('colors.white');
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
}

.cart-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: theme('colors.grey.100');
  font-size: 1.6rem;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 0 2rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.cart-item-img {
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  flex-shrink: 0;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.qty-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: theme('colors.white');
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
  font-size: 1.6rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: theme('colors.white');
  }
}

.remove-btn {
  background: none;
  border: none;
  color: theme('colors.grey.100');
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.5rem;
  text-decoration: underline;
  margin-left: auto;

  &:hover {
    color: theme('colors.white');
  }
}

.cart-footer {
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.cart-enter-active,
.cart-leave-active {
  transition: opacity 0.3s ease;

  & .cart-drawer {
    transition: transform 0.3s ease;
  }
}

.cart-enter-from,
.cart-leave-to {
  opacity: 0;

  & .cart-drawer {
    transform: translateX(100%);
  }
}
</style>
