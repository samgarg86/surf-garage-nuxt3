<script setup>
import { toRefs } from "vue";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  linkType: {
    type: String,
    required: false,
  },
});
const { to } = toRefs(props);

const scrollIntoView = (e) => {
  document.getElementById(to.value).scrollIntoView({ behavior: "smooth" });
  e.preventDefault();
};
</script>
<template>
  <a :class="linkType" :href="`#${to}`" @click="scrollIntoView">
    <slot></slot>
  </a>
</template>

<style lang="postcss">
.button {
  border: 2px solid white;
  padding: 12px 50px;
  color: var(--c-white);
  display: block;
  font-family: var(--font-avenir);
  text-transform: uppercase;
  min-width: 20rem;
  max-width: 25rem;
  font-size: 1.6rem;
}
</style>
