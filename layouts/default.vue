<template>
  <div>
    <div class="absolute z-50 text-left">
      <button class="toggle" @click="drawerVisible = true">
        <!-- <img src="~/assets/icons/hamburger.svg" class="w-15 mx-auto" /> -->
        <div class="flex flex-col gap-1 mx-4">
          <span class="w-4.5 h-0.5 block bg-white"></span>
          <span class="w-4.5 h-0.5 block bg-white"></span>
          <span class="w-4.5 h-0.5 block bg-white"></span>
        </div>
      </button>
      <MenuHamburger2 :close="toggle" :drawerVisible="drawerVisible" />
      <div
        @click="toggle"
        class="drawer-mask"
        :style="{
          width: drawerVisible ? '100vw' : '0',
          opacity: drawerVisible ? '0.6' : '0',
        }"
      ></div>
      <!-- <div :class="drawerVisible?'absolute top-0 right-0 w-full text-right':''" style="text-align: right; margin: 5px">
        <button class="close relative z-[300]">
          <i class="las la-times" style="font-size: 24px"></i> Closse
        </button>
      </div> -->
    </div>
    <main id="page-wrap" class="m-1 md:m-2 mb-1 md:mb-2">
      <slot />
      <Footer />
    </main>
  </div>
</template>
<script setup>
const drawerVisible = ref(false);
const toggle = () => {
  drawerVisible.value = false;
};
useSeoMeta({
  title: "Surf Garage Guardatablas LPA",
  description:
    "Surf Garage - Un Club Premio Para Surfistas. Board Storage, GuardaTablas, Second Hand Boards, Surf Art, Surf Board Repairs",
  ogTitle: "Surf Garage Guardatablas LPA",
  ogDescription: "Surf Garage - A Premium Club for Surfers",
  ogImage: "https://surfgarage.es/logo.png",
  keywords:
    "guardatablas, tablas de surf, tablas segunda mano, board storage, surfboard storage, second hand surfboards, surfboards, surfboard repairs, surf art",
});
</script>
<style>
.drawer-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 0; /* initially */
  height: 100vh;
  background: #000;
  opacity: 0.3;
  z-index: 199;
}
</style>
