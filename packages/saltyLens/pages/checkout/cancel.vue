<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center px-2">
    <h1 class="font-primary text-4xl mb-2">{{ $t('art.cart.cancelTitle') }}</h1>
    <p class="text-base text-grey-100 mb-3">{{ $t('art.cart.cancelDesc') }}</p>
    <NuxtLink :to="localePath('/')" class="add-to-cart inline-block">
      {{ $t('art.cart.backToShop') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
