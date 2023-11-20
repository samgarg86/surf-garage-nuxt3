<script lang="ts" setup>
const props = defineProps({
  title: String,
  isOpen: Boolean,
  titleClass: String
})

const isExpanded = ref()

const toggleSection = () => {
  isExpanded.value = !isExpanded.value
}
const onAfterEnter = (el: Element) => {
  el.style.height = 'auto'
}
const onEnter = (el: Element) => {
  el.style.height = 'auto'
  const height = getComputedStyle(el).height
  el.style.height = '0'
  requestAnimationFrame(() => {
    el.style.height = height
  })
}
const onLeave = (el: Element) => {
  el.style.height = getComputedStyle(el).height
  requestAnimationFrame(() => {
    el.style.height = '0'
  })
}

watch(() => props.isOpen,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      isExpanded.value = newValue
    }
  }
)
onMounted(() => {
  isExpanded.value = props.isOpen
})
</script>

<template>
  <section>
    <button class="accordion-item__title y-[0.7rem] w-full flex justify-between items-center leading-none font-bold hover:outline-0"
            :class="{
              titleClass: !!titleClass,
              'text-lightYellow': !titleClass
            }"
            @click.prevent="toggleSection()"
            :aria-expanded="isExpanded">
      <span class="font-avenir text-sm uppercase">{{ title }}</span>
      <span class="font-avenir leading-none">
        {{ isExpanded ? '-' : '+'}}
      </span>
    </button>

    <Transition name="expand" @after-enter="onAfterEnter" @enter="onEnter" @leave="onLeave">
      <div class="accordion-item__content py-1" v-show="isExpanded" :aria-hidden="!isExpanded">
        <slot />
      </div>
    </Transition>
  </section>
</template>

<style lang="postcss">
.expand-enter-active,
.expand-leave-active {
  @apply overflow-hidden duration-300 ease-in-out;
  transition-property: height, opacity;
}

.expand-enter,
.expand-leave-to {
  @apply h-0 opacity-0;
}
</style>
