<template>
  <div>
    <p class="text-sm mb-0.5">{{ $t('art.select-size') }}</p>

    <!-- Flex grid with bottom alignment -->
    <div class="flex flex-wrap items-end gap-1 md:gap-2">
      <div
        v-for="size in sizesWithDimensions"
        :key="size.id"
        class="flex-shrink-0"
        :style="size.style"
      >
        <!-- Hidden radio input -->
        <input
          type="radio"
          :id="size.id"
          :value="size.id"
          class="hidden"
          @change="$emit('update:modelValue', size.id)"
          :checked="modelValue === size.id"
        />

        <!-- Label with frame and text -->
        <label
          :for="size.id"
          class="flex flex-col items-center gap-0.5 cursor-pointer min-w-[44px] min-h-[44px]"
        >
          <!-- Frame visual (styled via custom class for dynamic sizing) -->
          <span
            class="frame-visual border-2 bg-white p-1 relative group"
            :class="modelValue === size.id ? 'border-black border-[3px]' : 'border-grey-20 hover:border-[#444]'"
            aria-hidden="true"
          >
            <!-- Inner rectangle for matting effect -->
            <span class="absolute inset-0.5 md:inset-[5px] border"
                  :class="modelValue === size.id ? 'border-black' : 'border-grey-20 group-hover:border-[#444]'"
            ></span>
          </span>

          <!-- Text below frame -->
          <span
            class="flex flex-col items-center text-center text-xs leading-tight max-w-[100px]"
            :class="modelValue === size.id ? 'text-black' : 'text-[#444]'"
          >
            <span class="font-secondary font-bold">{{ size.label }}</span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

// Size configuration with dimensions and scaling
const SIZES = [
  { id: '15x20', label: '15x20', aspectRatio: 0.75, mobileHeight: 50, desktopHeight: 60 },
  { id: '21x30', label: '21x30', aspectRatio: 0.7, mobileHeight: 60, desktopHeight: 72 },
  { id: '30x40', label: '30x40', aspectRatio: 0.75, mobileHeight: 70, desktopHeight: 84 },
  // { id: 'A2', label: 'A2', dimensions: '40x50 cm', aspectRatio: 0.8, mobileHeight: 78, desktopHeight: 94 },
  { id: '50x70', label: '50x70', aspectRatio: 0.714, mobileHeight: 88, desktopHeight: 106 },
  { id: '60x80', label: '60x80', aspectRatio: 0.75, mobileHeight: 96, desktopHeight: 115 }
]

// Compute dimensions with CSS custom properties
const sizesWithDimensions = computed(() =>
  SIZES.map(size => ({
    ...size,
    style: {
      '--frame-height-mobile': `${size.mobileHeight}px`,
      '--frame-width-mobile': `${Math.round(size.mobileHeight * size.aspectRatio)}px`,
      '--frame-height-desktop': `${size.desktopHeight}px`,
      '--frame-width-desktop': `${Math.round(size.desktopHeight * size.aspectRatio)}px`
    }
  }))
)
</script>

<style lang="postcss">
/* Frame visual - dynamic sizing with CSS custom properties */
.frame-visual {
  width: var(--frame-width-mobile);
  height: var(--frame-height-mobile);
  box-sizing: border-box;

  @media screen(md) {
    width: var(--frame-width-desktop);
    height: var(--frame-height-desktop);
  }
}

/* Focus state for keyboard navigation */
input:focus + label {
  outline: 2px solid theme('colors.black');
  outline-offset: 2px;
}

/* Active press effect */
label:active .frame-visual {
  transform: scale(0.98);
}
</style>
