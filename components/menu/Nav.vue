<script setup>
import Logo from "@/assets/images/logo.svg?component";
import ScrollTo from "@/components/ScrollTo.vue";
defineProps({
  showLogo: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <ul>
    <li>
      <ScrollTo to="about">{{ $t("nav.about") }}</ScrollTo>
    </li>
    <li>
      <ScrollTo to="services">{{ $t("nav.services") }}</ScrollTo>
    </li>
    <li v-if="showLogo" class="site-logo">
      <Logo class="site-logo__svg" />
    </li>
    <li>
      <ScrollTo to="pricing">{{ $t("nav.pricing") }}</ScrollTo>
    </li>
    <li>
      <ScrollTo to="contact">{{ $t("nav.contact") }}</ScrollTo>
    </li>
  </ul>
</template>
