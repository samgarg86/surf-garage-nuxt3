<template>
  <section id="about" class="section hero"
           :style="{ '--hero-bg': `url(${bgImage})` }">
    <MenuHome/>
    <ContactLinks class="hero__contact-links" :onlyIcons="true"/>
    <div class="hero__foreground">
      <h1 class="hero__title">{{ title }}</h1>
      <h2 class="hero__subtitle">{{ subtitle }}</h2>
      <ScrollTo class="button__join" linkType="button" to="contact">{{
          $t("hero.join-now")
        }}
      </ScrollTo>
    </div>

    <ScrollTo to="tiles" class="hero__arrow">
      <SvgoChevronDown class="text-white text-2xl"/>
    </ScrollTo>

    <VolumeIcon
      class="absolute bottom-1 right-1 z-10 hidden md:block"
      @click="isMute = !isMute" :animate="!isMute"/>

    <div class="hero__video-bg">
      <div class="hero__dark-bg"></div>
      <iframe
        :src="`https://www.youtube.com/embed/${bgVideo}?autoplay=1&loop=1&playlist=${bgVideo}&controls=0&enablejsapi=1&mute=1&playsinline=1`"
        title="Surf Garage Video PLayer"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        data-not-lazy
        ref="player"
      >
      </iframe>
    </div>
  </section>
</template>
<script setup>
defineProps({
  title: String,
  subtitle: String,
  bgVideo: String,
  bgImage: String
})
const player = ref(null)
const isMute = ref(true)

watch(isMute, (value) => {
  if (value) {
    youtubeCommand('mute')
  } else {
    youtubeCommand('unMute')
  }
})
const youtubeCommand = (func) => {
  const object = { event: 'command', func }
  console.log('youtubeCommand', object)
  player.value?.contentWindow.postMessage(JSON.stringify(object), '*')
}
</script>

<style lang="postcss">
.hero {
  width: calc(100vw - 2 * theme('spacing.1'));
  height: calc(100vh - 2 * theme('spacing.1'));
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4)
  ),
  var(--hero-bg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;

  @media screen(md) {
    height: calc(70vh - theme('spacing[2.5]'));
    width: calc(100vw - 2 * theme('spacing[2.5]'));
    position: relative;
  }

  &__dark-bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }

  &__video-bg {
    width: 100vw;
    height: 100vh;
    iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 100vh;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;

      @media (min-aspect-ratio: 16/9) {
        /* height = 100 * (9 / 16) = 56.25 */
        height: 56.25vw;
      }

      @media (max-aspect-ratio: 16/9) {
        /* width = 100 / (9 / 16) = 177.777777 */
        width: 177.78vh;
      }
    }

    @media (max-width: theme('screens.md')) {
      display: none;
    }
  }

  &__foreground {
    position: absolute;
    top: 400px;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -60%);
    text-align: center;
    width: 80%;
    z-index: 3;

    @media (max-width: theme('screens.md')) {
      top: 68%;
    }
  }

  &__title {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-family: theme('fontFamily.metalsmith');
    text-transform: lowercase;
  }

  &__subtitle {
    font-size: 2.28rem;
    margin-bottom: 1rem;
    font-family: theme('fontFamily.avenir');
    text-transform: uppercase;
  }

  &__contact-links {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 3;
  }

  &__arrow {
    width: 6rem;
    padding: 1rem;
    position: absolute;
    bottom: 5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;

    @media screen(md) {
      display: none;
    }
  }

  &__arrow-icon {
    width: 100%;
    fill: theme('colors.white');
  }
}

.button__join {
  margin: 2rem auto 0;
  display: block;
  min-width: 20rem;
  max-width: 25rem;
  padding: 12px 50px;
}
</style>
