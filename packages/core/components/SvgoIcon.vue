<template>
  <component
      :is="icon"
      :class="{
        'nuxt-icon': fontControlled,
        'nuxt-icon--fill': !filled
      }"
  />
</template>

<script>
export default {
  props: {
    filled: {
      type: Boolean,
      required: false,
      default: false
    },
    fontControlled: {
      type: Boolean,
      required: false,
      default: true
    },
    icon: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.nuxt-icon {
  width: 1em;
  height: 1em;
  /*margin-bottom: 0.125em;*/
  vertical-align: middle;
}
.nuxt-icon--fill,
.nuxt-icon--fill * {
  fill: currentColor;
}
</style>
