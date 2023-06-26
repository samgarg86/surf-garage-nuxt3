<template>
  <nav >
    <div>
      <NuxtLink
        :to="to"
        class="mr-1 mb-1.5 px-1 inline-block font-metalsmith lowercase text-black text-xl">
        {{ title }}
      </NuxtLink>
    </div>
    <div v-for="([key, value]) in Object.entries(nav )"
         :key="key">
      <NuxtLink
        :to="key"
        class="inline-block mb-1 px-1 text-black">
        {{ value }}
      </NuxtLink>
    </div>
  </nav>
</template>
<script setup>
defineProps({
  title: String,
  to: String,
  nav: Object
})
</script>
