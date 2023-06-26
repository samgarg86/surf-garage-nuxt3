<template>
  <section id="contact" class="section contact max-w-full">
    <h2 class="section__title font-metalsmith py-5 text-center">
      <span class="color-black px-1 py-0.5">{{ $t("contact.title") }}</span>
    </h2>
<!--    <LazyInstaFeed/>-->
    <!--      <pre class="text-white">{{ siteNav?.boardStorageMenu }}</pre>-->
    <!--      <pre class="text-white">{{ siteNav?.surfArtMenu }}</pre>-->
    <div class="px-3 pb-2 text-center md:text-left md:p-5 md:grid grid-cols-footer gap-5 ">
      <LazyFooterNav :title="$t('nav.storage')" to="/" :nav="siteNav?.boardStorageMenu || {}"/>
      <LazyFooterNav title="Surf Art" to="/" :nav="siteNav?.surfArtMenu || {}"/>
      <LazyContactLinks class="contact__links font-metalsmith lowercase mr-5" theme="light"/>
      <div class="contact__form w-full font-metalsmith lowercase">
        <LazyFooterContactForm />
      </div>
    </div>
  </section>
</template>
<script setup>
const { siteNav } = useSiteNav()
</script>

<style lang="postcss">
.contact {
  background: url('@/assets/images/wave-bg.jpg') no-repeat center center;
  background-size: cover;
}
</style>
