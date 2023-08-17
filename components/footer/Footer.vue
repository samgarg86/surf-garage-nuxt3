<template>
  <section id="contact" class="footer max-w-full mx-0">
<!--    <h2 class="section__title font-metalsmith py-5 text-center">-->
<!--      <span class="color-black px-1 py-0.5">{{ $t("contact.title") }}</span>-->
<!--    </h2>-->
<!--    <LazyInstaFeed/>-->
    <!--      <pre class="text-white">{{ siteNav?.boardStorageMenu }}</pre>-->
    <!--      <pre class="text-white">{{ siteNav?.surfArtMenu }}</pre>-->
    <div class="footer__content text-center md:text-left px-2 py-5 lg:py-10 lg:px-6">
      <LazyFooterNav
        class="footer__nav1"
        :title="$t('nav.storage')" to="/" :nav="siteNav?.boardStorageMenu || {}"/>
      <LazyFooterNav
        class="footer__nav2"
        title="Surf Art" to="/" :nav="siteNav?.surfArtMenu || {}"/>
      <LazyContactLinks class="footer__links font-metalsmith lowercase" theme="light"/>
      <div class="footer__form w-full font-metalsmith lowercase">
        <LazyFooterContactForm />
      </div>
    </div>
  </section>
</template>
<script setup>
const { siteNav, fetchSiteNav } = useSiteNav()
if (!siteNav.value) await fetchSiteNav()
</script>

<style lang="postcss">
.footer {
  background: url('@/assets/images/wave-bg.jpg') no-repeat center center;
  background-size: cover;

  &__nav1 {
    grid-area: nav1;
  }

  &__nav2 {
    grid-area: nav2;
  }

  &__links {
    grid-area: links;

    @media screen(md) {
      padding: 0;
    }
  }

  &__form {
    grid-area: form;
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
      "links links"
      "form form"
      "nav1 nav2";

    @media screen(md) {
      grid-gap: 3rem;
      grid-template-areas:
        "links links nav1 nav2"
        "form form form form";
    }

    @media screen(lg) {
      grid-gap: 5rem;
      grid-template-areas:
        "nav1 nav2 links form form"
    }
  }
}
</style>
