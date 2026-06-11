<template>
  <div
      class="art-nav-item relative"
      @mouseenter="open"
      @mouseleave="scheduleClose"
      @focusin="open"
      @focusout="onFocusOut"
      @keydown.escape="close">
    <button
        ref="triggerEl"
        type="button"
        class="art-nav-trigger"
        :class="{ 'is-open': isOpen }"
        :aria-expanded="isOpen"
        aria-haspopup="true"
        @click="toggle">
      {{ label }}
    </button>
    <transition name="art-nav">
      <div
          v-show="isOpen"
          class="art-nav-panel"
          :class="[panelAlign === 'right' ? 'right-0' : 'left-0', panelClass]"
          @click="onPanelClick">
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  panelAlign: { type: String, default: 'left' },
  panelClass: { type: String, default: '' }
})

const isOpen = ref(false)
const triggerEl = ref(null)
let closeTimer = null

const cancelClose = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

const open = () => {
  cancelClose()
  isOpen.value = true
}

const close = () => {
  cancelClose()
  isOpen.value = false
}

const scheduleClose = () => {
  cancelClose()
  closeTimer = setTimeout(() => {
    isOpen.value = false
    closeTimer = null
  }, 150)
}

const toggle = () => {
  isOpen.value ? close() : open()
}

const onFocusOut = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    scheduleClose()
  }
}

const onPanelClick = (event) => {
  if (event.target.closest('a')) close()
}

onBeforeUnmount(cancelClose)
</script>

<style lang="postcss">
.art-nav-trigger {
  @apply relative py-1 px-0.5 hover:text-lightYellow transition-colors duration-150;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.12em;
}
.art-nav-trigger::after {
  content: '';
  @apply absolute left-0.5 right-0.5 bottom-[0.4rem] h-px bg-lightYellow scale-x-0 origin-center;
  transition: transform 0.2s ease;
}
.art-nav-trigger:hover::after,
.art-nav-trigger.is-open::after {
  @apply scale-x-100;
}

.art-nav-panel {
  @apply absolute top-full mt-1 min-w-[22rem] z-50;
  background: rgba(9, 9, 14, 0.96);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(0, 0, 0, 0.4);
  padding: 1.4rem 1.6rem;
}

.art-nav-enter-active,
.art-nav-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.art-nav-enter-from,
.art-nav-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
