<template>
  <div class="min-h-screen bg-grey-30 p-2 md:p-4">
    <h1 class="font-primary text-2xl mb-3 text-center uppercase tracking-widest">Print Mockup Tool</h1>

    <!-- Phase 1: Crop -->
    <template v-if="!croppedBlobUrl">
      <div class="flex justify-center mb-3">
        <label class="inline-block">
          <span class="inline-block py-1 px-2 bg-black text-white text-xs font-semibold uppercase tracking-widest cursor-pointer">
            Browse image
          </span>
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileSelected"
          />
        </label>
      </div>

      <template v-if="imageUrl">
        <div class="flex justify-center bg-grey-10 mb-1">
          <div
            class="crop-preview relative overflow-hidden select-none touch-none"
            :style="cropPreviewStyle"
            :class="canDrag ? 'cursor-move' : 'cursor-default'"
            @mousedown="onDragStart"
            @touchstart.prevent="onDragStart"
            @wheel.prevent="onWheel"
          >
            <div :style="cropImageStyle" />
          </div>
        </div>

        <div class="mt-1 flex justify-center gap-0.5 mb-3">
          <button
            v-for="ratio in aspectRatios"
            :key="ratio.id"
            type="button"
            class="px-1.5 py-0.5 text-xs uppercase tracking-widest border"
            :class="aspectRatioId === ratio.id ? 'bg-black text-white border-black' : 'bg-white text-black border-grey-100'"
            @click="setAspectRatio(ratio.id)"
          >
            {{ ratio.label }}
          </button>
        </div>

        <div class="flex justify-center">
          <button
            type="button"
            class="px-2 py-1 bg-black text-white text-xs font-semibold uppercase tracking-widest disabled:opacity-50"
            :disabled="isApplying"
            @click="applyCrop"
          >
            {{ isApplying ? 'Applying...' : 'Apply' }}
          </button>
        </div>
      </template>
    </template>

    <!-- Phase 2: Mockup views -->
    <template v-else>
      <div class="flex justify-center mb-6">
        <button
          type="button"
          class="text-xs uppercase tracking-widest underline"
          @click="resetCrop"
        >
          ← Re-crop
        </button>
      </div>

      <div class="mb-6 max-w-[1080px]">
        <div class="grid grid-cols-2">
          <!-- Border view -->
          <div>
            <p class="text-xs uppercase tracking-widest text-center mb-2">Border</p>
            <div class="bg-grey-30 p-4">
              <div style="padding: 2%; background: white;">
                <img :src="croppedBlobUrl" class="w-full block" alt="Border view" />
              </div>
            </div>
          </div>

          <!-- Frame view -->
          <div>
            <p class="text-xs uppercase tracking-widest text-center mb-2">Frame</p>
            <div ref="frameContainer" class="bg-grey-30 p-4">
              <div class="mockup-frame p-[0.8rem] md:p-1 bg-blackFrame relative">
                <div class="bg-white p-[2rem]">
                  <img :src="croppedBlobUrl" alt="Frame view" class="w-full block" />
                </div>
              </div>
            </div>
          </div>

          <!-- Living room view -->
          <div>
            <p class="text-xs uppercase tracking-widest text-center mb-2">Living Room</p>
            <div ref="livingRoomContainer" class="relative aspect-[4/5] overflow-hidden">
              <img
                src="/Sofa-wall-surf-boards.jpg"
                alt="Living room"
                class="w-full object-cover"
              />
              <div
                class="absolute left-1/2 -translate-x-1/2"
                :class="{
                'h-[40%] bottom-[50%]': aspectRatioId === '4:5',
                'h-[30%] bottom-[50%]': aspectRatioId === '1:1',
                'h-[25%] bottom-[55%]': aspectRatioId === '3:2'
              }"
              >
                <div class="mockup-living-room p-[0.4rem] bg-blackFrame relative h-full">
                  <div class="bg-white p-[0.8rem] md:p-1 h-full">
                    <img :src="croppedBlobUrl" alt="Living room view" class="h-full block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="flex justify-center">
        <button
          type="button"
          class="px-2 py-1 bg-black text-white text-xs font-semibold uppercase tracking-widest disabled:opacity-50"
          :disabled="isDownloading"
          @click="downloadAll"
        >
          {{ isDownloading ? 'Downloading...' : 'Download all' }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { toBlob } from 'html-to-image'

const aspectRatios = [
  { id: '1:1', label: '1:1', value: 1 },
  { id: '4:5', label: '4:5', value: 4 / 5 },
  { id: '3:2', label: '3:2', value: 3 / 2 }
]

const DEFAULT_RATIO = '4:5'
const BORDER_RATIO = 0.02
const TARGET_OUTPUT_WIDTH = 1440

const file = ref(null)
const imageUrl = ref(null)
const naturalWidth = ref(0)
const naturalHeight = ref(0)

const aspectRatioId = ref(DEFAULT_RATIO)
const zoom = ref(1)
const offsetX = ref(0.5)
const offsetY = ref(0.5)

const croppedBlobUrl = ref(null)
const isApplying = ref(false)
const isDownloading = ref(false)

const frameContainer = ref(null)
const livingRoomContainer = ref(null)

let dragState = null
let pinchState = null

function getAspectValue (id) {
  return aspectRatios.find(r => r.id === id).value
}

function onFileSelected (event) {
  const f = event.target.files[0]
  if (!f || !f.type.startsWith('image/')) return
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
  if (croppedBlobUrl.value) URL.revokeObjectURL(croppedBlobUrl.value)
  croppedBlobUrl.value = null

  const url = URL.createObjectURL(f)
  const imgEl = new Image()
  imgEl.onload = () => {
    file.value = f
    imageUrl.value = url
    naturalWidth.value = imgEl.naturalWidth
    naturalHeight.value = imgEl.naturalHeight
    aspectRatioId.value = DEFAULT_RATIO
    zoom.value = 1
    offsetX.value = 0.5
    offsetY.value = 0.5
  }
  imgEl.src = url
  event.target.value = ''
}

function previewDimensions () {
  const aspect = getAspectValue(aspectRatioId.value)
  const maxHeight = 480
  let width = 420
  let height = width / aspect
  if (height > maxHeight) {
    height = maxHeight
    width = height * aspect
  }
  return { width, height }
}

const cropPreviewStyle = computed(() => {
  const { width, height } = previewDimensions()
  return { width: `${width}px`, height: `${height}px`, backgroundColor: '#ffffff' }
})

const cropImageStyle = computed(() => {
  const { width, height } = previewDimensions()
  const borderPx = Math.round(width * BORDER_RATIO)
  const innerW = width - 2 * borderPx
  const innerH = height - 2 * borderPx
  const natAspect = naturalWidth.value / naturalHeight.value
  const aspect = getAspectValue(aspectRatioId.value)
  let coverW, coverH
  if (natAspect > aspect) { coverH = innerH; coverW = coverH * natAspect } else { coverW = innerW; coverH = coverW / natAspect }
  return {
    position: 'absolute',
    top: `${borderPx}px`,
    left: `${borderPx}px`,
    right: `${borderPx}px`,
    bottom: `${borderPx}px`,
    backgroundImage: `url(${imageUrl.value})`,
    backgroundSize: `${coverW * zoom.value}px ${coverH * zoom.value}px`,
    backgroundPosition: `${offsetX.value * 100}% ${offsetY.value * 100}%`,
    backgroundRepeat: 'no-repeat'
  }
})

const canDrag = computed(() => {
  if (zoom.value > 1.001) return true
  const aspect = getAspectValue(aspectRatioId.value)
  return Math.abs(naturalWidth.value / naturalHeight.value - aspect) > 0.001
})

function setAspectRatio (id) {
  aspectRatioId.value = id
  zoom.value = 1
  offsetX.value = 0.5
  offsetY.value = 0.5
}

function onDragStart (event) {
  if (event.touches?.length === 2) {
    const [t0, t1] = event.touches
    pinchState = {
      startDist: Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY),
      startZoom: zoom.value
    }
    return
  }
  if (!canDrag.value) return
  const point = event.touches ? event.touches[0] : event
  const rect = event.currentTarget.getBoundingClientRect()
  const borderPx = Math.round(rect.width * BORDER_RATIO)
  dragState = {
    startX: point.clientX,
    startY: point.clientY,
    startOffsetX: offsetX.value,
    startOffsetY: offsetY.value,
    containerWidth: rect.width - 2 * borderPx,
    containerHeight: rect.height - 2 * borderPx
  }
  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchmove', onDragMove, { passive: false })
  window.addEventListener('touchend', onDragEnd)
}

function onDragMove (event) {
  if (event.touches?.length === 2 && pinchState) {
    if (event.cancelable) event.preventDefault()
    const [t0, t1] = event.touches
    const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY)
    zoom.value = clamp(pinchState.startZoom * dist / pinchState.startDist, 1, 4)
    return
  }
  if (!dragState) return
  if (event.cancelable) event.preventDefault()
  const point = event.touches ? event.touches[0] : event
  const aspect = getAspectValue(aspectRatioId.value)
  const natAspect = naturalWidth.value / naturalHeight.value

  let coverW, coverH
  if (natAspect > aspect) { coverH = dragState.containerHeight; coverW = coverH * natAspect } else { coverW = dragState.containerWidth; coverH = coverW / natAspect }
  const displayedW = coverW * zoom.value
  const displayedH = coverH * zoom.value

  const overflowX = displayedW - dragState.containerWidth
  const overflowY = displayedH - dragState.containerHeight
  const dx = point.clientX - dragState.startX
  const dy = point.clientY - dragState.startY

  if (overflowX > 0.5) offsetX.value = clamp(dragState.startOffsetX - dx / overflowX, 0, 1)
  if (overflowY > 0.5) offsetY.value = clamp(dragState.startOffsetY - dy / overflowY, 0, 1)
}

function onDragEnd () {
  dragState = null
  pinchState = null
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchmove', onDragMove)
  window.removeEventListener('touchend', onDragEnd)
}

function onWheel (event) {
  zoom.value = clamp(zoom.value - event.deltaY * 0.001, 1, 4)
}

function clamp (value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function loadImage (src) {
  return new Promise((resolve, reject) => {
    const el = new Image()
    el.onload = () => resolve(el)
    el.onerror = reject
    el.src = src
  })
}

async function renderImage (withBorder = true) {
  const source = await loadImage(imageUrl.value)

  // Bake EXIF orientation into canvas so createImageBitmap() sees correct pixels
  const normalized = document.createElement('canvas')
  normalized.width = source.naturalWidth
  normalized.height = source.naturalHeight
  normalized.getContext('2d').drawImage(source, 0, 0)

  const aspect = getAspectValue(aspectRatioId.value)
  const natAspect = source.naturalWidth / source.naturalHeight

  let srcCropW, srcCropH
  if (natAspect > aspect) {
    srcCropH = source.naturalHeight / zoom.value
    srcCropW = srcCropH * aspect
  } else {
    srcCropW = source.naturalWidth / zoom.value
    srcCropH = srcCropW / aspect
  }

  const srcCropX = Math.round((source.naturalWidth - srcCropW) * offsetX.value)
  const srcCropY = Math.round((source.naturalHeight - srcCropH) * offsetY.value)
  const srcW = Math.round(srcCropW)
  const srcH = Math.round(srcCropH)

  const maxCropW = Math.floor(TARGET_OUTPUT_WIDTH / (1 + 2 * BORDER_RATIO))
  const outCropW = Math.min(srcW, maxCropW)
  const outCropH = Math.round(outCropW / aspect)
  const border = withBorder ? Math.round(outCropW * BORDER_RATIO) : 0
  const finalW = outCropW + border * 2
  const finalH = outCropH + border * 2

  const bitmap = await createImageBitmap(normalized, srcCropX, srcCropY, srcW, srcH, {
    resizeWidth: outCropW,
    resizeHeight: outCropH,
    resizeQuality: 'high'
  })

  const canvas = document.createElement('canvas')
  canvas.width = finalW
  canvas.height = finalH
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  if (withBorder) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, finalW, finalH)
  }
  ctx.drawImage(bitmap, border, border)
  bitmap.close?.()

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.95)
  })
}

async function applyCrop () {
  isApplying.value = true
  await nextTick()
  try {
    const blob = await renderImage(false)
    if (croppedBlobUrl.value) URL.revokeObjectURL(croppedBlobUrl.value)
    croppedBlobUrl.value = URL.createObjectURL(blob)
  } finally {
    isApplying.value = false
  }
}

function resetCrop () {
  if (croppedBlobUrl.value) URL.revokeObjectURL(croppedBlobUrl.value)
  croppedBlobUrl.value = null
}

function sanitizeName (name) {
  return name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]/g, '_')
}

function downloadBlob (blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function downloadAll () {
  isDownloading.value = true
  await nextTick()
  try {
    const baseName = file.value ? sanitizeName(file.value.name) : 'image'
    const suffix = aspectRatioId.value.replace(':', 'x')

    const borderBlob = await renderImage(true)
    downloadBlob(borderBlob, `${baseName}-${suffix}-border.jpg`)

    const frameBlob = await toBlob(frameContainer.value, {
      pixelRatio: 2,
      type: 'image/jpeg',
      quality: 0.95,
      width: frameContainer.value.offsetWidth,
      height: frameContainer.value.offsetHeight
    })
    downloadBlob(frameBlob, `${baseName}-frame.jpg`)

    const livingBlob = await toBlob(livingRoomContainer.value, {
      pixelRatio: 2,
      type: 'image/jpeg',
      quality: 0.95,
      width: livingRoomContainer.value.offsetWidth,
      height: livingRoomContainer.value.offsetHeight
    })
    downloadBlob(livingBlob, `${baseName}-living-room.jpg`)
  } finally {
    isDownloading.value = false
  }
}

onUnmounted(() => {
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
  if (croppedBlobUrl.value) URL.revokeObjectURL(croppedBlobUrl.value)
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
