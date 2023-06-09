<script setup>
defineProps({
  showLanguageName: {
    type: Boolean,
    required: false,
  },
});
// import i18n from "../../i18n.js";
// import { useRouter } from 'vue-router'
// const router = useRouter()
// const onChange = (e) => {
//   const locale = e.target.value
//   if (locale) {
//     console.log('Selected language', locale)
//     router.push({
//       path: `/${locale}`
//     })
//   }
// }

</script>
<template>
  <div>
    <!--    <select @change="onChange" v-model="i18n.global.locale.value">-->
    <!--      <option value="en">en</option>-->
    <!--      <option value="es">es</option>-->
    <!--    </select>-->
    <div class="language-switcher">
      <router-link to="/en">{{showLanguageName ? 'English' : 'EN'}}</router-link>
      <router-link to="/es">{{showLanguageName ? 'Español' : 'ES'}}</router-link>
    </div>
  </div>
</template>

<style lang="postcss">
.language-switcher {
  padding: 1rem 0;
  a {
    color: theme('colors.white');;
    text-decoration: underline;
    margin-right: 1rem;

    &.router-link-active {
      color: theme('colors.lightYellow');
    }
  }
}
</style>
