<template>
  <Teleport to="body">
    <Transition name="cart">
      <div v-if="isOpen" class="fixed inset-0 z-[200] flex justify-end" style="background-color: rgba(0,0,0,0.5)" @click.self="isOpen = false">
        <div class="flex flex-col w-full max-w-[42rem] h-full overflow-hidden bg-black text-white">

          <div class="flex justify-between items-center p-2 border-b border-white/10">
            <span class="font-primary text-2xl">{{ $t('art.cart.title') }}</span>
            <button class="bg-transparent border-none text-white text-[1.8rem] cursor-pointer px-0.5 leading-none" @click="isOpen = false">✕</button>
          </div>

          <div v-if="cart.length === 0" class="flex-1 flex items-center justify-center text-grey-100 text-sm">
            {{ $t('art.cart.empty') }}
          </div>

          <ul v-else class="flex-1 overflow-y-auto px-2">
            <li v-for="item in cart" :key="`${item.id}-${item.size}`" class="flex gap-1.5 py-2 border-b border-white/[0.08]">
              <img :src="item.image" :alt="item.title" class="w-[8rem] h-[8rem] object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="font-primary text-base leading-tight mb-0.5">{{ item.title }}</p>
                <p class="text-sm text-grey-20 mb-0.5">{{ item.size }} cm</p>
                <p class="text-sm mb-1">€{{ (item.price * item.quantity).toFixed(0) }}</p>
                <div class="flex items-center gap-0.5">
                  <button class="qty-btn" @click="updateQty(item.id, item.size, item.quantity - 1)">−</button>
                  <span class="text-sm px-1">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="updateQty(item.id, item.size, item.quantity + 1)">+</button>
                  <button class="ml-auto bg-transparent border-none text-grey-100 text-xs cursor-pointer underline hover:text-white" @click="removeItem(item.id, item.size)">
                    {{ $t('art.cart.remove') }}
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <div v-if="cart.length > 0" class="p-2 border-t border-white/10">
            <div class="flex justify-between mb-0.5">
              <span class="font-primary text-2xl">{{ $t('art.cart.total') }}</span>
              <span class="font-primary text-2xl">€{{ total.toFixed(0) }}</span>
            </div>
            <p v-if="total < freeShippingThreshold" class="text-xs text-grey-100 mb-3">
              {{ $t('art.cart.freeShippingHint', { amount: (freeShippingThreshold - total).toFixed(0) }) }}
            </p>
            <p v-else class="text-xs text-grey-100 mb-3">{{ $t('art.cart.freeShippingApplied') }}</p>
            <button class="border border-white font-primary px-5 py-1 mx-auto block w-full" :disabled="loading" @click="checkout">
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
const { public: { freeShippingThreshold } } = useRuntimeConfig() as any
const loading = ref(false)

onMounted(hydrate)

const checkout = async () => {
  loading.value = true
  try {
    const { url } = await $fetch('/api/checkout', {
      method: 'POST',
      body: { items: cart.value }
    })
    if (url) window.location.href = url
  } catch {
    loading.value = false
  }
}
</script>

<style scoped lang="postcss">
.qty-btn {
  @apply bg-transparent text-white text-[1.6rem] cursor-pointer flex items-center justify-center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 2.8rem;
  height: 2.8rem;
  line-height: 1;

  &:hover {
    border-color: theme('colors.white');
  }
}

.cart-enter-active,
.cart-leave-active {
  transition: opacity 0.3s ease;
  & > div { transition: transform 0.3s ease; }
}
.cart-enter-from,
.cart-leave-to {
  opacity: 0;
  & > div { transform: translateX(100%); }
}
</style>
