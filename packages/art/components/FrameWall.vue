<template>
  <div
      class="flex items-stretch justify-center py-6 md:py-9 gap-1.5">
    <div
        v-for="(col, ci) in columns"
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
defineProps({
  title: { type: String, default: '' },
  columns: { type: Array, required: true },
  gap: { type: String, default: '' }
})

const justifyClass = (align) => ({
  top: 'justify-start',
  center: 'justify-center',
  bottom: 'justify-end'
}[align] || 'justify-end')
</script>

<style lang="postcss">
.image-frame__frame-wall {
  @apply p-[0.4rem] bg-black;
  box-shadow: -4px 2px 6px rgba(0,0,0,.3);

  &::after {
    @apply m-[0.4rem];
    box-shadow: inset -2px 0 3px rgba(0,0,0,0.3);
  }
}

.image-frame__text {
  @apply w-full bg-blackFrame text-white font-primary flex items-center justify-center text-center px-2 py-2;
  text-transform: uppercase;
  line-height: 1.15;
  font-size: clamp(1.6rem, 2.2vw, 3rem);
}
.image-frame__text :deep(*) {
  line-height: inherit;
}
</style>
