<template>
  <section id="contact" class="footer mb-2">
    <div class="footer__content text-center md:text-left px-2 py-5 lg:py-10 lg:px-6">
      <section :style="{gridArea: 'contact'}">
        <p class="text-sm font-bold uppercase mb-1">{{$t('nav.contact')}}</p>
        <LazyContactLinks
            class="md:p-0 text-sm"
            theme="light"/>
      </section>
      <section :style="{gridArea: 'form'}">
        <LazyFooterContactForm class="text-sm font-avenir"/>
      </section>
      <LazyFooterNav
          :style="{gridArea: 'categories'}"
          class="footer__nav2 text-sm"
          :title="$t('nav.categories')" to="/" :nav="siteNav?.surfArtCategories || {}"/>
      <LazyFooterNav
          :style="{gridArea: 'locations'}"
          class="footer__nav2 mb-2 text-sm"
          :title="$t('nav.locations')" to="/" :nav="siteNav?.surfArtLocations || {}"/>
      <LazyFooterNav
          :style="{gridArea: 'artists'}"
          class="footer__nav2 text-sm"
          :title="$t('nav.artists')" to="/" :nav="siteNav?.surfArtArtists || {}"/>
<!--        <NuxtLink :to="localeRoute('/about')" class="uppercase text-sm font-bold">{{ $t('nav.about') }}</NuxtLink>-->
    </div>
    <section :style="{gridArea: 'copyright'}" class="text-center text-sm">Copyright © 2023 Surf Garage Art Co. All Rights Reserved.</section>
  </section>
</template>
<script setup>
const { siteNav } = useSiteNav()
</script>

<style lang="postcss">
.footer {
  background: url('@core/assets/images/wave-bg.jpg') no-repeat center center;
  background-size: cover;

  @media(hover: hover) {
    a:hover {
      text-decoration: underline;
    }
  }

  &__content {
    display: grid;
    grid-gap: 2rem;

    grid-template-areas:
      "categories"
      "locations"
      "artists"
      "form"
      "contact";

   @media screen(md) {
      grid-gap: 3rem;
     grid-template-columns: 1fr 1.2fr 1fr 2fr;
      grid-template-areas:
          "categories locations contact form"
          "categories artists contact form";
    }

    @media screen(lg) {
      grid-gap: 3rem;
      grid-template-columns: 1fr 1fr 1fr 1.5fr 3fr;
      grid-template-areas: "categories locations artists contact form";
    }
  }
}
</style>
