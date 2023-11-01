<template>
  <Hamburger
      :isOpen="isOpenHamburger"
      @hamburger:open="onOpenHamburger"
      @hamburger:close="onCloseHamburger">
    <ArtHamburger @hamburger:click="isOpenHamburger = false"/>
  </Hamburger>
  <main id="page-wrap" :class="{ 'slide': isOpenHamburger }">
    <Header/>
    <div class="mx-1 md:mx-2">
      <slot/>
    </div>
    <Footer/>
  </main>

  <div hidden
       id="snipcart"
       data-api-key="YWZhYTMyNDUtZWY4Ny00ZDg0LTk1ZjYtMzMzZDFjN2NjNzYxNjM4MjE1NzE4NjM4MjYyMjk0"
       data-config-modal-style="side">
  </div>
</template>

<script lang="ts" setup>

const i18nHead = useLocaleHead({
  addSeoAttributes: true
})
const isOpenHamburger = ref(false)
const onOpenHamburger = () => { isOpenHamburger.value = true }
const onCloseHamburger = () => { isOpenHamburger.value = false }

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
