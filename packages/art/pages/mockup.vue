<template>
  <div class="min-h-screen bg-grey-30 p-8">
    <h1 class="font-primary text-2xl mb-6 text-center uppercase tracking-widest">Mockup Generator</h1>

    <div class="flex justify-center mb-10">
      <input
        type="file"
        accept="image/*"
        class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white cursor-pointer"
        @change="onFileSelected"
      />
    </div>

    <template v-if="imageUrl">
      <!-- Frame view -->
      <div class="bg-grey-30 p-4 max-w-[60rem] " ref="frameContainer" >
        <div class="mockup-frame p-[0.8rem] md:p-1 bg-blackFrame relative">
          <div class="bg-white p-[2rem]">
            <img
              :src="imageUrl"
              alt="Mockup frame view"
              class="w-full block"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 mb-10">
        <button
          type="button"
          class="px-2 py-1 bg-black text-white text-xs font-semibold uppercase tracking-widest disabled:opacity-50"
          :disabled="isDownloadingFrame"
          @click="downloadFrameView"
        >{{ isDownloadingFrame ? 'Rendering...' : 'Download' }}</button>
      </div>

      <!-- Living room view -->
      <div ref="livingRoomContainer" class="relative max-w-[50rem] aspect-[4/5] overflow-hidden">
        <img
          src="/Sofa-wall-surf-boards.jpg"
          alt="Living room"
          class="w-full object-cover"
        />
        <div class="absolute bottom-[50%] left-1/2 -translate-x-1/2">
          <div class="mockup-living-room p-[0.4rem] bg-blackFrame relative">
            <div class="bg-white p-[0.8rem] md:p-[1rem]">
              <img
                :src="imageUrl"
                alt="Mockup living room view"
                class="h-[40%] max-h-25 block"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-10">
        <button
          type="button"
          class="px-2 py-1 bg-black text-white text-xs font-semibold uppercase tracking-widest disabled:opacity-50"
          :disabled="isDownloadingLiving"
          @click="downloadLivingRoom"
        >{{ isDownloadingLiving ? 'Rendering...' : 'Download' }}</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { toBlob } from 'html-to-image'

const imageUrl = ref(null)
const isDownloadingFrame = ref(false)
const isDownloadingLiving = ref(false)
const frameContainer = ref(null)
const livingRoomContainer = ref(null)

function onFileSelected (event) {
  const file = event.target.files[0]
  if (!file) return
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
  imageUrl.value = URL.createObjectURL(file)
}

async function captureAndDownload (el, filename) {
  const blob = await toBlob(el, {
    pixelRatio: 2,
    type: 'image/jpeg',
    quality: 0.95,
    width: el.offsetWidth,
    height: el.offsetHeight
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function downloadFrameView () {
  isDownloadingFrame.value = true
  try { await captureAndDownload(frameContainer.value, 'mockup-frame.jpg') } finally { isDownloadingFrame.value = false }
}

async function downloadLivingRoom () {
  isDownloadingLiving.value = true
  try { await captureAndDownload(livingRoomContainer.value, 'mockup-living-room.jpg') } finally { isDownloadingLiving.value = false }
}

onUnmounted(() => {
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
})
</script>

<style lang="postcss">
.mockup-frame {
  box-shadow: -3px 3px 10px rgba(0,0,0,.3);

  &::after {
    content: '';
    @apply absolute inset-0 pointer-events-none;
    margin: 0.8rem;
    background-color: transparent;
    box-shadow: inset -5px 0px 13px rgba(0, 0, 0, 0.3);
  }
}

.mockup-living-room {
  box-shadow: 4px 2px 6px rgba(0,0,0,.3);

  &::after {
    content: '';
    @apply absolute inset-0 pointer-events-none;
    margin: 0.4rem;
    background-color: transparent;
    box-shadow: inset 2px 0 8px rgba(0,0,0,0.3);
  }
}
</style>
