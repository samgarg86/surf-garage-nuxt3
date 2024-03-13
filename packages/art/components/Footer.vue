<template>
  <section id="contact" class="footer mb-2">
    <div class="footer__content md:text-left px-2 py-5 lg:py-10 lg:px-6">
      <section :style="{gridArea: 'form'}">
        <p class="text-sm font-bold uppercase mb-2 font-primary">{{$t('nav.contact')}}</p>
        <LazyFooterContactForm class="text-sm"/>
      </section>

      <Accordion class="footer__accordion md:hidden">
        <LazyAccordionItem
          v-if="siteNav?.surfArtCategories"
          :title="$t('nav.categories')"
          :is-open="true">
          <LazyFooterNav
            class="text-sm"
            to="/" :nav="siteNav?.surfArtCategories || {}"/>
        </LazyAccordionItem>
        <LazyAccordionItem
          v-if="siteNav?.surfArtLocations"
          class="border-t"
          :title="$t('nav.locations')"
          :is-open="false">
          <LazyFooterNav
            class="text-sm"
            to="/" :nav="siteNav?.surfArtLocations || {}"/>
        </LazyAccordionItem>
        <LazyAccordionItem
          v-if="siteNav?.surfArtArtists"
          class="border-t"
          :title="$t('nav.artists')"
          :is-open="false">
          <LazyFooterNav
            class="text-sm"
            to="/" :nav="siteNav?.surfArtArtists || {}"/>
        </LazyAccordionItem>
      </Accordion>

      <LazyFooterNav
          :style="{gridArea: 'categories'}"
          class="text-sm mobile:hidden"
          :title="$t('nav.categories')" to="/" :nav="siteNav?.surfArtCategories || {}"/>
      <LazyFooterNav
          :style="{gridArea: 'locations'}"
          class="text-sm mobile:hidden mb-2"
          :title="$t('nav.locations')" to="/" :nav="siteNav?.surfArtLocations || {}"/>
      <LazyFooterNav
          :style="{gridArea: 'artists'}"
          class="text-sm mobile:hidden"
          :title="$t('nav.artists')" to="/" :nav="siteNav?.surfArtArtists || {}"/>
       <!-- <NuxtLink :to="localeRoute('/about')" class="uppercase text-sm font-bold">{{ $t('nav.about') }}</NuxtLink> -->
    </div>
    <section :style="{gridArea: 'copyright'}" class="text-center text-sm pb-1">Copyright © 2024 Surf Garage Art Co. All Rights Reserved.</section>
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
      "form";

   @media screen(md) {
      grid-gap: 3rem;
     grid-template-columns: 1fr 1.2fr 2fr;
      grid-template-areas:
          "categories locations form"
          "categories artists form";
    }

    @media screen(lg) {
      grid-gap: 3rem;
      grid-template-columns: 1fr 1fr 1fr 2fr;
      grid-template-areas: "categories locations artists form";
    }
  }
}
</style>
