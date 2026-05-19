<template>
  <div class="min-h-screen bg-grey-30 p-2 md:p-4">
    <h1 class="font-primary text-2xl mb-3 text-center uppercase tracking-widest">Instagram Photo Tool</h1>

    <div class="flex justify-center mb-3">
      <label class="inline-block">
        <span class="inline-block py-1 px-2 bg-black text-white text-xs font-semibold uppercase tracking-widest cursor-pointer">
          Browse images
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          class="hidden"
          @change="onFilesSelected"
        />
      </label>
    </div>

    <div v-if="images.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
      <div v-for="(img, index) in images" :key="img.id" class="p-2">
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs truncate max-w-[70%]" :title="img.file.name">{{ img.file.name }}</span>
          <button
            type="button"
            class="text-xs text-grey-100 hover:text-black"
            @click="removeImage(index)"
          >
            Remove
          </button>
        </div>

        <div class="flex justify-center bg-grey-10">
          <div
            class="crop-preview relative overflow-hidden select-none touch-none"
            :style="cropPreviewStyle(img)"
            :class="canDrag(img) ? 'cursor-move' : 'cursor-default'"
            @mousedown="onDragStart($event, index)"
            @touchstart.prevent="onDragStart($event, index)"
          >
            <div :style="cropImageStyle(img)" />
          </div>
        </div>

        <div class="mt-1 flex justify-center gap-0.5">
          <button
            v-for="ratio in aspectRatios"
            :key="ratio.id"
            type="button"
            class="px-1.5 py-0.5 text-xs uppercase tracking-widest border"
            :class="img.aspectRatioId === ratio.id ? 'bg-black text-white border-black' : 'bg-white text-black border-grey-100'"
            @click="setAspectRatio(index, ratio.id)"
          >
            {{ ratio.label }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="images.length" class="flex justify-center">
      <button
        type="button"
        class="px-2 py-1 bg-black text-white text-xs font-semibold uppercase tracking-widest disabled:opacity-50"
        :disabled="isProcessing"
        @click="downloadZip"
      >
        {{ isProcessing ? 'Cropping and adding borders...' : (images.length === 1 ? 'Download' : 'Download zip') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import JSZip from 'jszip'

const aspectRatios = [
  { id: '1:1', label: '1:1', value: 1 },
  { id: '4:5', label: '4:5', value: 4 / 5 },
  { id: '3:2', label: '3:2', value: 3 / 2 }
]

const DEFAULT_RATIO = '4:5'
const BORDER_RATIO = 0.02
// Instagram displays at 1080px wide, but accepts up to ~1440px and downscales
// itself — outputting a bit larger preserves quality better than client-side
// downscaling.
const TARGET_OUTPUT_WIDTH = 1440

const images = ref([])
const isProcessing = ref(false)

let nextId = 0
let dragState = null

function getAspectValue(id) {
  return aspectRatios.find(r => r.id === id).value
}

function onFilesSelected(event) {
  const files = Array.from(event.target.files || [])
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    const url = URL.createObjectURL(file)
    const imgEl = new Image()
    imgEl.onload = () => {
      images.value.push({
        id: ++nextId,
        file,
        url,
        naturalWidth: imgEl.naturalWidth,
        naturalHeight: imgEl.naturalHeight,
        aspectRatioId: DEFAULT_RATIO,
        offsetX: 0.5,
        offsetY: 0.5
      })
    }
    imgEl.src = url
  }
  event.target.value = ''
}

function removeImage(index) {
  const [removed] = images.value.splice(index, 1)
  if (removed) URL.revokeObjectURL(removed.url)
}

function previewDimensions(img) {
  const aspect = getAspectValue(img.aspectRatioId)
  const maxHeight = 480
  let width = 420
  let height = width / aspect
  if (height > maxHeight) {
    height = maxHeight
    width = height * aspect
  }
  return { width, height }
}

function cropPreviewStyle(img) {
  const { width, height } = previewDimensions(img)
  return {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: '#ffffff'
  }
}

function cropImageStyle(img) {
  const { width } = previewDimensions(img)
  const borderPx = Math.round(width * BORDER_RATIO)
  return {
    position: 'absolute',
    top: `${borderPx}px`,
    left: `${borderPx}px`,
    right: `${borderPx}px`,
    bottom: `${borderPx}px`,
    backgroundImage: `url(${img.url})`,
    backgroundSize: 'cover',
    backgroundPosition: `${img.offsetX * 100}% ${img.offsetY * 100}%`,
    backgroundRepeat: 'no-repeat'
  }
}

function canDrag(img) {
  const aspect = getAspectValue(img.aspectRatioId)
  const naturalAspect = img.naturalWidth / img.naturalHeight
  return Math.abs(naturalAspect - aspect) > 0.001
}

function setAspectRatio(index, id) {
  const img = images.value[index]
  img.aspectRatioId = id
  img.offsetX = 0.5
  img.offsetY = 0.5
}

function onDragStart(event, index) {
  const img = images.value[index]
  if (!canDrag(img)) return
  const point = event.touches ? event.touches[0] : event
  const rect = event.currentTarget.getBoundingClientRect()
  const borderPx = Math.round(rect.width * BORDER_RATIO)
  dragState = {
    index,
    startX: point.clientX,
    startY: point.clientY,
    startOffsetX: img.offsetX,
    startOffsetY: img.offsetY,
    containerWidth: rect.width - 2 * borderPx,
    containerHeight: rect.height - 2 * borderPx
  }
  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchmove', onDragMove, { passive: false })
  window.addEventListener('touchend', onDragEnd)
}

function onDragMove(event) {
  if (!dragState) return
  if (event.cancelable) event.preventDefault()
  const point = event.touches ? event.touches[0] : event
  const img = images.value[dragState.index]
  const aspect = getAspectValue(img.aspectRatioId)
  const naturalAspect = img.naturalWidth / img.naturalHeight

  let displayedWidth, displayedHeight
  if (naturalAspect > aspect) {
    displayedHeight = dragState.containerHeight
    displayedWidth = displayedHeight * naturalAspect
  } else {
    displayedWidth = dragState.containerWidth
    displayedHeight = displayedWidth / naturalAspect
  }

  const overflowX = displayedWidth - dragState.containerWidth
  const overflowY = displayedHeight - dragState.containerHeight

  const dx = point.clientX - dragState.startX
  const dy = point.clientY - dragState.startY

  if (overflowX > 0.5) {
    img.offsetX = clamp(dragState.startOffsetX - dx / overflowX, 0, 1)
  }
  if (overflowY > 0.5) {
    img.offsetY = clamp(dragState.startOffsetY - dy / overflowY, 0, 1)
  }
}

function onDragEnd() {
  dragState = null
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchmove', onDragMove)
  window.removeEventListener('touchend', onDragEnd)
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const el = new Image()
    el.onload = () => resolve(el)
    el.onerror = reject
    el.src = src
  })
}

async function renderImage(img) {
  const source = await loadImage(img.url)

  // Bake EXIF orientation into a canvas. drawImage() always applies the EXIF
  // rotation tag, but createImageBitmap() on an img element does not in all
  // browsers — working from a canvas eliminates the mismatch.
  const normalized = document.createElement('canvas')
  normalized.width = source.naturalWidth
  normalized.height = source.naturalHeight
  normalized.getContext('2d').drawImage(source, 0, 0)

  const aspect = getAspectValue(img.aspectRatioId)
  const naturalAspect = source.naturalWidth / source.naturalHeight

  let srcCropW, srcCropH
  if (naturalAspect > aspect) {
    srcCropH = source.naturalHeight
    srcCropW = srcCropH * aspect
  } else {
    srcCropW = source.naturalWidth
    srcCropH = srcCropW / aspect
  }

  // Round to integer source pixel rect — createImageBitmap requires ints.
  const srcCropX = Math.round((source.naturalWidth - srcCropW) * img.offsetX)
  const srcCropY = Math.round((source.naturalHeight - srcCropH) * img.offsetY)
  const srcW = Math.round(srcCropW)
  const srcH = Math.round(srcCropH)

  // Scale to Instagram's 1080px-wide display target. Don't upscale.
  const maxCropW = Math.floor(TARGET_OUTPUT_WIDTH / (1 + 2 * BORDER_RATIO))
  const outCropW = Math.min(srcW, maxCropW)
  const outCropH = Math.round(outCropW / aspect)
  const border = Math.round(outCropW * BORDER_RATIO)
  const finalW = outCropW + border * 2
  const finalH = outCropH + border * 2

  // Use createImageBitmap with high-quality resize — much sharper than a
  // single-pass ctx.drawImage downscale from a large source.
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
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, finalW, finalH)
  ctx.drawImage(bitmap, border, border)
  bitmap.close?.()

  return new Promise((resolve) => {
    canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.95)
  })
}

function sanitizeName(name) {
  return name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]/g, '_')
}

async function saveFile(blob, suggestedName) {
  if (window.showSaveFilePicker) {
    const ext = suggestedName.split('.').pop().toLowerCase()
    const typeMap = {
      jpg: { description: 'JPEG image', accept: { 'image/jpeg': ['.jpg', '.jpeg'] } },
      zip: { description: 'Zip archive', accept: { 'application/zip': ['.zip'] } }
    }
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: typeMap[ext] ? [typeMap[ext]] : []
      })
      const writable = await handle.createWritable()
      await writable.write(blob)
      await writable.close()
      return
    } catch (err) {
      if (err.name === 'AbortError') return
      // Other errors (e.g. permissions): fall through to standard download.
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = suggestedName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function fileNameFor(img, suffixIndex = 0) {
  const base = sanitizeName(img.file.name)
  const suffix = img.aspectRatioId.replace(':', 'x')
  return suffixIndex === 0
    ? `${base}-${suffix}.jpg`
    : `${base}-${suffix}-${suffixIndex}.jpg`
}

async function downloadZip() {
  isProcessing.value = true
  await nextTick()
  try {
    if (images.value.length === 1) {
      const img = images.value[0]
      const blob = await renderImage(img)
      await saveFile(blob, fileNameFor(img))
      return
    }
    const zip = new JSZip()
    const used = new Map()
    for (const img of images.value) {
      const blob = await renderImage(img)
      const baseName = fileNameFor(img)
      const count = used.get(baseName) || 0
      used.set(baseName, count + 1)
      zip.file(fileNameFor(img, count), blob)
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    await saveFile(zipBlob, `instagram-photos-${Date.now()}.zip`)
  } finally {
    isProcessing.value = false
  }
}

onUnmounted(() => {
  for (const img of images.value) {
    URL.revokeObjectURL(img.url)
  }
})
</script>
