<template>
  <div class="relative">
<!--    <video data-not-lazy loop playsinline-->
<!--           class="object-cover w-full h-full"-->
<!--           ref="videoPlayer">-->
<!--      <source :src="src" type="video/mp4">-->
<!--    </video>-->
    <img :src="src" class="object-cover w-full h-full" />
    <div class="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <svg
        class="w-4 h-4 fill-white"
        viewBox="0 0 58.752 58.752">
        <g>
          <path d="M52.524,23.925L12.507,0.824c-1.907-1.1-4.376-1.097-6.276,0C4.293,1.94,3.088,4.025,3.088,6.264v46.205
          c0,2.24,1.204,4.325,3.131,5.435c0.953,0.555,2.042,0.848,3.149,0.848c1.104,0,2.192-0.292,3.141-0.843l40.017-23.103
          c1.936-1.119,3.138-3.203,3.138-5.439C55.663,27.134,54.462,25.05,52.524,23.925z M49.524,29.612L9.504,52.716
          c-0.082,0.047-0.18,0.052-0.279-0.005c-0.084-0.049-0.137-0.142-0.137-0.242V6.263c0-0.1,0.052-0.192,0.14-0.243
          c0.042-0.025,0.09-0.038,0.139-0.038c0.051,0,0.099,0.013,0.142,0.038l40.01,23.098c0.089,0.052,0.145,0.147,0.145,0.249
          C49.663,29.47,49.611,29.561,49.524,29.612z"/>
        </g>
      </svg>
    </div>
  </div>
</template>
<script setup>
defineProps({
  src: String
})
// const playing = ref(false)
// const videoPlayer = ref(null)
// const play = () => {
//   videoPlayer.value?.play()
//   playing.value = true
// }
// const pause = () => {
//   videoPlayer.value?.pause()
//   playing.value = false
// }
//
// onUnmounted(pause)
</script>
