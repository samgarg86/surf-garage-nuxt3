<template>
  <main id="page-wrap">
<!--    <pre>{{membershipPlans}}</pre>-->
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
const { items } = await contentful.getEntries({
  content_type: 'homepageSections',
  include: 10,
locale: locale.value
})
const { tiles, heroTitle, heroSubtitle, heroYoutubeVideo, iconSections, membershipPlans } = items?.[0]?.fields || {}
const mappedHero = {title: heroTitle, subtitle: heroSubtitle, bgVideo: heroYoutubeVideo}
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
