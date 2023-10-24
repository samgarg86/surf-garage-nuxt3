<template>
  <section id="contact" class="footer mb-2">
<!--    <LazyInstaFeed/>-->
    <div class="footer__content text-center md:text-left px-2 py-5 lg:py-10 lg:px-6">
      <section style="{gridArea: 'nav1'}">
        <NuxtLink :to="localeRoute('/about')" class="footer__l1">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localeRoute('/')" class="footer__l1">{{ $t('nav.storage') }}</NuxtLink>
        <NuxtLink :to="localeRoute('/boards')" class="footer__l1">{{ $t('nav.boards') }}</NuxtLink>
        <NuxtLink :to="localeRoute('/art')" class="footer__l1">Surf Art</NuxtLink>
      </section>
      <LazyContactLinks
          class="font-metalsmith lowercase md:p-0"
          :style="{gridArea: 'links'}"
          theme="light"/>
      <section
          class="footer__form w-full font-metalsmith lowercase"
          :style="{gridArea: 'form'}">
        <LazyFooterContactForm class="lowercase"/>
      </section>
    </div>
  </section>
</template>

<style lang="postcss">
.footer {
  background: url('@core/assets/images/wave-bg.jpg') no-repeat center center;
  background-size: cover;

  @media(hover: hover) {
    a:hover {
      text-decoration: underline;
    }
  }

  &__l1 {
    @apply md:mr-1 mb-1 md:mb-1.5 block font-metalsmith lowercase text-black;
  }

  &__form {
    margin: 0 auto;

    @media screen(md) {
      max-width: 80rem;
      margin: 0;
    }

    @media screen(lg) {
      max-width: 60rem;
      justify-self: end;
    }
  }

  &__content {
    display: grid;
    grid-gap: 2rem;

    grid-template-areas:
      "links"
      "form"
      "nav1";

    @media screen(md) {
      grid-gap: 3rem;
      grid-template-areas:
        "links links nav1"
        "form form form";
    }

    @media screen(lg) {
      grid-gap: 5rem;
      grid-template-areas:
        "nav1 links form form"
        "art art form form"
    }
  }
}
</style>
