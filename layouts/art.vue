<template>
   <div class="absolute z-50 text-left">
      <button class="toggle" @click="drawerVisible = true">
        <!-- <img src="~/assets/icons/hamburger.svg" class="w-15 mx-auto" /> -->
        <div class="flex flex-col gap-1 mx-4">
          <span class="w-4.5 h-0.5 block bg-black"></span>
          <span class="w-4.5 h-0.5 block bg-black"></span>
          <span class="w-4.5 h-0.5 block bg-black"></span>
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
  <!-- <MenuHamburger black class="hamburger-menu-art"/> -->
  <main id="page-wrap" class="mx-1 md:mx-2 mb-1 md:mb-2">
    <ArtHeader/>
    <slot/>
    <Footer/>
  </main>

  <!-- Test Mode -->
<!--  <div hidden-->
<!--       id="snipcart"-->
<!--       data-api-key="MjMyM2Q4NjgtZWI4NS00MTFjLThlNTQtOTExNjkwMDE3ZjI2NjM4MjE1NzE4NjM4MjYyMjk0"-->
<!--       data-config-modal-style="side">-->
<!--  </div>-->
  <div hidden
       id="snipcart"
       data-api-key="YWZhYTMyNDUtZWY4Ny00ZDg0LTk1ZjYtMzMzZDFjN2NjNzYxNjM4MjE1NzE4NjM4MjYyMjk0"
       data-config-modal-style="side">
  </div>
</template>

<script lang="ts" setup>

const drawerVisible = ref(false);
const toggle = () => {
  drawerVisible.value = false;
};

const i18nHead = useLocaleHead({
  addSeoAttributes: true
})

useHead({
  link: [
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: 'https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css'
    },
    ...(i18nHead.value.link || [])
  ],
  meta: [...(i18nHead.value.meta || [])],
  script: [
    { src: 'https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js' }
  ]
})

useSeoMeta({
  title: 'Surf Garage Art Co',
  description: 'A virtual gallery where you can discover and purchase amazing artwork created by a group of photographers and illustrators based in the Canary Islands. Our collection showcases the vibrant surf cultures and the natural beauties of this world.',
  ogTitle: 'Surf Garage Art Co',
  ogDescription: 'A virtual gallery where you can discover and purchase amazing artwork created by a group of photographers and illustrators based in the Canary Islands. Our collection showcases the vibrant surf cultures and the natural beauties of this world',
  ogImage: 'https://surfgarage.es/logo.png',
  keywords: 'surf art, surf photography, surf illustrations, art, photography, illustrations, photo prints, surfing, art gallery'
})
</script>

<style lang="postcss">
.hamburger-menu-art {
  .bm-burger-button {
    @apply top-[1.4rem] left-[1.4rem] lg:top-[2.5rem] lg:left-[2.5rem];
  }
}

/* Snipcart theme overrides */

/* Tailwind css sets this to transparent so checkout button isn't visible */
.snipcart-button-primary {
  background-color: theme('colors.waveBlue');
}

/* hamburger menu is above the back button on mobile */
.snipcart-modal__container {
  z-index: 1000;
}

/* Images are too small */
/* Desktop */
.snipcart-item-line__media {
  width: 30rem;
}
/* Mobile */
.snipcart-item-line__media--small {
  width: 20rem;
  margin-right: 1rem;
  height: auto;
}

.snipcart-item-line__image {
  width: 100%;
}

.snipcart-item-line--cart-edit .snipcart-item-line__image {
  width: 100%;
}

.snipcart-item-line--cart-edit .snipcart-item-line__image {
  max-width: none;
}

.snipcart-item-line__container {
  padding: 2rem 1rem;
}

@media (min-width: 768px) {
  .snipcart-cart-summary--edit.snipcart-modal__container {
    max-width: 60rem;
    width: 50%;
  }
}

@media screen(lg) {
  .snipcart-cart-summary--edit.snipcart-modal__container {
    width: 35%;
  }
}

</style>
