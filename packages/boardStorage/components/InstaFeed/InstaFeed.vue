<template>
  <div class="text-center">
    <NuxtLink
      to="https://www.instagram.com/surfgaragelpa/"
      target="_blank"
      class="inline-flex justify-center items-center rounded-2xl mb-1 bg-white">
      <SvgoInsta filled class="text-2xl"/>
      <div class="text-center w-15 font-avenir uppercase text-sm">
        Follow us on
        <span class="font-bold text-base">Instagram</span>
      </div>
    </NuxtLink>
    <div class="columns-3 gap-1">
      <template v-for="post in data?.data.slice(0, 6)" :key="post.id">
        <NuxtLink :to="post.permalink" target="_blank">
          <InstaFeedVideoPlayer
            v-if="post.media_type === 'VIDEO'"
            :src="post.thumbnail_url"
            class="mb-1 w-15 h-15"/>
          <img
            v-else
            class="mb-1 w-15 h-15 object-cover"
            :src="post.media_url"
            />
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
<script setup>
const { public: { instaAccessToken } } = useRuntimeConfig()
const { data } = await useFetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url&access_token=${instaAccessToken}`)
</script>
