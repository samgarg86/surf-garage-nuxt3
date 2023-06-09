<template>
  <main id="page-wrap">
<!--    <pre>{{heroBgImage}}</pre>-->
    <SectionsHero v-bind="mappedHero"/>
    <SectionsTiles :tiles="mappedTiles"/>
    <SectionsBoardStorage v-bind="mappedBoardStorageSection"/>
    <SectionsBoardSecurity v-bind="mappedBoardSecuritySection"/>
    <SectionsPricing :plans="mappedMembershipPlans" />
    <SectionsContact />
  </main>
</template>

<script setup>
const contentful = useContentful()
const {locale} = useI18n()
const {items} = await contentful.getEntries({
  content_type: 'homepageSections',
  include: 10,
  locale: locale.value
})
const {
  tiles,
  heroTitle,
  heroSubtitle,
  heroBgImage,
  heroYoutubeVideo,
  iconSections,
  membershipPlans
} = items?.[0]?.fields || {}
const mappedHero = {
  title: heroTitle,
  subtitle: heroSubtitle,
  bgVideo: heroYoutubeVideo,
  bgImage: heroBgImage.fields.file.url
}
const mappedTiles = tiles.map(t => ({
  text: t.fields.text,
  bg: t.fields.backgroundImage.fields.file.url,
  type: t.fields.type,
  link: t.fields.link
}))
const boardStorageSection = iconSections?.find(section => section.sys.contentType.sys.id === 'boardStorageSection')
const mappedBoardStorageSection = {
  title: boardStorageSection?.fields.title,
  subtitle: boardStorageSection?.fields.subtitle,
  icons: boardStorageSection?.fields.icons.map(icon => ({title: icon.fields.title, url: icon.fields.file.url}))
}

const boardSecuritySection = iconSections?.find(section => section.sys.contentType.sys.id === 'boardSecuritySection')
const mappedBoardSecuritySection = {
  title: boardSecuritySection?.fields.title,
  subtitle: boardSecuritySection?.fields.subtitle,
  icons: boardSecuritySection?.fields.icons.map(icon => ({title: icon.fields.title, url: icon.fields.file.url})),
  bgImage: boardSecuritySection?.fields.backgroundImage.fields.file.url
}

const mappedMembershipPlans = membershipPlans.map(plan => ({
  title: plan.fields.title,
  monthlyPrice: plan.fields.monthlyPrice,
  priceDescription: plan.fields.priceDescription
}))
</script>

<style lang="postcss">
.section {
  margin: theme('spacing.1');
  position: relative;
  scroll-margin-top: theme('spacing[2.5]');

  @media screen(md) {
    margin: theme('spacing[2.5]');
  }

  /** Full width sections (with padding) **/

  &__content {
    margin: 0 auto;
    max-width: 1024px;
    padding: 2rem;

    &.full-width {
      max-width: none;
      @media screen(md) {
        padding: 5rem;
      }
    }

    @media screen(md) {
      padding: 5rem 0;
    }
  }

  &__title {
    font-size: 4rem;
    @apply font-metalsmith;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    z-index: -2;
  }

  &--bg {
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: -1;
    }
  }
}
</style>
