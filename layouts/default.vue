<template>
  <div>
<!--    <MenuHamburgerMenu />-->
    <slot />
  </div>
</template>

<style lang="postcss">
html.dark {
  color-scheme: light;
  background-color: #fff;
  color: theme('colors.black');
}
</style>
