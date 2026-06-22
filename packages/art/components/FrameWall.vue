<template>
  <!-- Mobile layout: 3 flex columns (3fr 4fr 3fr) -->
  <div class="md:hidden flex gap-0.5">
    <!-- Col 1 -->
    <div class="flex flex-col gap-0.5 justify-end w-[28%]" style="flex: 3">
      <div v-if="mob[1]" class="image-frame image-frame__frame-wall">
        <img :src="mob[1].src" :alt="mob[0].alt" loading="lazy" class="mx-auto border-[0.5rem] border-white w-full block" />
      </div>
      <div v-if="mob[0]" class="image-frame image-frame__frame-wall">
        <img :src="mob[0].src" :alt="mob[1].alt" loading="lazy" class="mx-auto border-[0.5rem] border-white w-full block" />
      </div>
    </div>
    <!-- Col 2 -->
    <div class="flex flex-col gap-0.5 w-[44%]" style="flex: 4">
      <div v-if="mob[2]" class="image-frame image-frame__frame-wall">
        <img :src="mob[2].src" :alt="mob[2].alt" loading="lazy" class="mx-auto border-[0.5rem] border-white w-full block" />
      </div>
      <div class="image-frame image-frame__frame-wall">
        <div class="image-frame__text aspect-[4.2/6]" v-html="title" />
      </div>
    </div>
    <!-- Col 3 -->
    <div class="flex flex-col gap-0.5 justify-end w-[28%]" style="flex: 3">
      <div v-if="mob[3]" class="image-frame image-frame__frame-wall">
        <img :src="mob[3].src" :alt="mob[3].alt" loading="lazy" class="mx-auto border-[0.5rem] border-white w-full block" />
      </div>
      <div v-if="mob[4]" class="image-frame image-frame__frame-wall">
        <img :src="mob[4].src" :alt="mob[4].alt" loading="lazy" class="mx-auto border-[0.5rem] border-white w-full block" />
      </div>
    </div>
  </div>

  <!-- Desktop layout -->
  <div class="hidden md:flex items-stretch justify-center py-9 gap-1.5">
    <div
        v-for="(col, ci) in desktopColumns"
        :key="ci"
        class="flex flex-col gap-1.5"
        :class="[justifyClass(col.align)]"
        :style="[
          { width: col.width },
          col.paddingBottom && { paddingBottom: col.paddingBottom }
        ]">
      <div
          v-for="(frame, fi) in col.frames"
          :key="fi"
          class="image-frame image-frame__frame-wall">
        <Image
            v-if="'src' in frame"
            :src="frame.src"
            :alt="frame.alt || ''"
            class="mx-auto border-[0.8rem] border-white w-full block"/>
        <div
            v-else
            class="image-frame__text"
            :class="frame.aspect || 'aspect-[5/6]'"
            v-html="frame.html"/>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  framesLeft: { type: Array, default: () => [] },
  framesRight: { type: Array, default: () => [] },
  framesMobile: { type: Array, default: () => [] }
})

const toFrame = (a) => ({ src: `${a.fields.file.url}?w=300&fm=webp`, alt: a.fields.title || '' })

const justifyClass = (align) => ({
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end'
}[align] || 'justify-end')

const mob = props.framesMobile.map(toFrame)

const desktopColumns = [
  { width: '10cqw', frames: props.framesLeft.slice(2, 4).map(toFrame), paddingBottom: '5cqh' },
  { width: '9cqw', frames: props.framesLeft.slice(0, 2).map(toFrame) },
  { width: '16cqw', frames: [{ html: props.title, aspect: 'aspect-[4.2/6]' }] },
  { width: '9cqw', frames: props.framesRight.slice(0, 2).map(toFrame) },
  { width: '10cqw', frames: props.framesRight.slice(2, 4).map(toFrame) }
].filter(c => c.frames.length)
</script>

<style lang="postcss">
.image-frame__frame-wall {
  @apply p-[0.4rem] bg-blackFrame;
  box-shadow: -4px 2px 6px rgba(0,0,0,.3);

  &::after {
    @apply m-[0.4rem];
    box-shadow: inset -2px 0 3px rgba(0,0,0,0.3);
  }
}

.image-frame__text {
  @apply w-full bg-black text-sand font-primary flex items-center justify-center text-center px-1 md:px-2 py-1 md:py-2;
  text-transform: uppercase;
  line-height: 1.15;
  font-size: clamp(2rem, 2.2vw, 3rem);
}
.image-frame__text :deep(*) {
  line-height: inherit;
}
</style>
