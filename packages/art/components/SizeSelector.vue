<template>
  <div>
    <p class="text-sm mb-0.5">{{ $t('art.select-size') }}</p>
    <div class="text-2 size-selector-grid flex flex-wrap gap-0.5 md:gap-1 font-primary">
      <div class="size-selector-item">
        <input type="radio" id="A5" value="A5" class="hidden" @change="$emit('update:modelValue', 'A5')" :checked="modelValue==='A5'"/>
        <label for="A5" class="size-selector-label">A5 | 15x20 cm</label>
      </div>

      <div class="size-selector-item">
        <input type="radio" id="A4" value="A4" class="hidden"  @change="$emit('update:modelValue', 'A4')" :checked="modelValue==='A4'"/>
        <label for="A4" class="size-selector-label" >A4 | 21x30 cm</label>
      </div>

      <div class="size-selector-item">
        <input type="radio" id="A3" value="A3" class="hidden"  @change="$emit('update:modelValue', 'A3')" :checked="modelValue==='A3'"/>
        <label for="A3" class="size-selector-label">A3 | 30x40 cm</label>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
<style lang="postcss">
.size-selector-label {
  @apply border-[1.5px] p-1 py-0.5 block text-1.8 border-grey-20 text-blackSoft text-center;
}

input:checked+.size-selector-label {
  @apply border-black text-black;
}

.size-selector-item {
  width: calc(50% - 0.5rem);

  @media screen(md) {
    width: auto;
  }
}
</style>
