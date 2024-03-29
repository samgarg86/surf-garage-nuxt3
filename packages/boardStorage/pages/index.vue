<template>
<!--  <pre>{{components.map(c => c.fields)}}</pre>-->
  <SectionHero v-bind="mappedHero"/>
  <SectionTiles :tiles="mappedTiles"/>

  <template v-for="cmp in components" :key="cmp.sys.id">
    <component
        v-if="cmp.metadata.tags"
        :is="homepageComponents[cmp.sys.contentType.sys.id]"
        v-bind="{...cmp.fields}"
        class="mb-4"/>
  </template>
</template>

<script setup>
const { getFirstEntryOfType } = useContentful()
const { gtag } = useGtag()
const homepage = await getFirstEntryOfType('homepageSections')

const {
  tiles,
  heroTitle,
  heroSubtitle,
  heroBgImage,
  heroYoutubeVideo,
  components
} = homepage.fields || {}

const homepageComponents = {
  boardStorageSection: resolveComponent('LazySectionBoardStorage'),
  boardSecuritySection: resolveComponent('LazySectionBoardSecurity'),
  boardStorageMembershipSection: resolveComponent('LazySectionPricing'),
  storageArtSection: resolveComponent('LazySectionSurfArt')
}

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
})) || []

gtag('event', 'page_view', {
  app_name: 'Surfgarage',
  screen_name: 'Homepage'
})
</script>

<style lang="postcss">
.section {
  margin-bottom: theme('spacing.1');
  position: relative;
  scroll-margin-top: theme('spacing.2');

  @media screen(md) {
    margin-bottom: theme('spacing.2');
  }

  /** Full width sections (with padding) **/
  &__content {
    margin: 0 auto;
    max-width: 1024px;
    padding: 2rem;

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
