<template>
  <div class="text-center">
    <nuxt-link
      to="https://www.instagram.com/surfgaragelpa/"
      target="_blank"
      class="inline-flex justify-center items-center border-4 border-white rounded-2xl px-1 mb-1 bg-white">
      <div v-html="insta" class="w-6"/>
      <div class="text-center w-15 font-avenir uppercase text-sm">
        Follow us on
        <span class="font-bold text-base">Instagram</span>
      </div>
    </nuxt-link>
    <div class="columns-3 gap-1">
      <template v-for="post in data?.data.slice(0, 6)" :key="post.id">
        <nuxt-link :to="post.permalink" target="_blank">
          <InstaFeedVideoPlayer
            v-if="post.media_type === 'VIDEO'"
            :src="post.thumbnail_url"
            class="mb-1 w-15 h-15"/>
          <img
            v-else
            class="mb-1 w-15 h-15 object-cover"
            :src="post.media_url"
            data-not-lazy/>
        </nuxt-link>
      </template>
    </div>
  </div>
</template>
<script setup>
import insta from '~/assets/icons/insta2.svg?raw'
const accessToken = 'IGQVJWRS11TTFhVnk0cFc2UDhJSEhaM1NnQmJSRkhIUEhRbHFzSVlnN0lHUDNrRDB2ZAnpfamFReXZACSi0xUlZAFNG41OWdJUm1hU19ZAOUt4NWFCUGRZAdkd3X0hfanNlU245NEt5MHZAicnJ2ZAnV5S3hHVwZDZD'
const { data } = await useFetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}`)
</script>
