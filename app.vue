<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style lang="scss">
@import "./styles/base.scss";
#app {
  // Hack to show the margin below the last section
  overflow-y: scroll;
}
</style>
