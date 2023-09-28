<template>
  <section id="contact" class="footer mb-2">
<!--    <LazyInstaFeed/>-->
    <!--      <pre class="text-white">{{ siteNav?.boardStorageMenu }}</pre>-->
    <!--      <pre class="text-white">{{ siteNav?.surfArtMenu }}</pre>-->
    <div class="footer__content text-center md:text-left px-2 py-5 lg:py-10 lg:px-6">
      <section style="{gridArea: 'nav1'}">
        <NuxtLink :to="localeRoute('/about')" class="footer__l1">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localeRoute('/')" class="footer__l1">{{ $t('nav.storage') }}</NuxtLink>
        <NuxtLink :to="localeRoute('/boards')" class="footer__l1">{{ $t('nav.boards') }}</NuxtLink>
      </section>
      <LazyContactLinks
          class="font-metalsmith lowercase md:p-0"
          :style="{gridArea: 'links'}"
          theme="light"/>
      <section
          class="footer__form w-full font-metalsmith lowercase"
          :style="{gridArea: 'form'}">
        <LazyFooterContactForm />
      </section>
      <section :style="{gridArea: 'art'}" class="grid grid-cols-1 md:grid-cols-3 w-full gap-2">
        <NuxtLink :to="localeRoute('/art')" class="footer__l1 leading-none">Surf Art</NuxtLink>
        <LazyFooterNav
            class="footer__nav2"
            :title="$t('nav.categories')" to="/" :nav="siteNav?.surfArtCategories || {}"/>
        <div>
          <LazyFooterNav
              class="footer__nav2 mb-2"
              :title="$t('nav.locations')" to="/" :nav="siteNav?.surfArtLocations || {}"/>
          <LazyFooterNav
              class="footer__nav2"
              :title="$t('nav.artists')" to="/" :nav="siteNav?.surfArtArtists || {}"/>
        </div>
      </section>
    </div>
  </section>
</template>
<script setup>
const { siteNav } = useSiteNav()
</script>

<style lang="postcss">
.footer {
  background: url('@/assets/images/wave-bg.jpg') no-repeat center center;
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
      "nav1"
      "art";

    @media screen(md) {
      grid-gap: 3rem;
      grid-template-areas:
        "links links nav1"
        "form form form"
      "art art art"
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
