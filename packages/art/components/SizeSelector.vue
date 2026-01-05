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

      <div class="size-selector-item">
        <input type="radio" id="A2" value="A2" class="hidden"  @change="$emit('update:modelValue', 'A2')" :checked="modelValue==='A2'"/>
        <label for="A2" class="size-selector-label">A2 | 40x50 cm</label>
      </div>

      <div class="size-selector-item">
        <input type="radio" id="50x70" value="50x70" class="hidden"  @change="$emit('update:modelValue', '50x70')" :checked="modelValue==='50x70'"/>
        <label for="50x70" class="size-selector-label">50x70 cm</label>
      </div>

      <div class="size-selector-item">
        <input type="radio" id="A1" value="A1" class="hidden"  @change="$emit('update:modelValue', 'A1')" :checked="modelValue==='A1'"/>
        <label for="A1" class="size-selector-label">A1 | 60x80 cm</label>
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
